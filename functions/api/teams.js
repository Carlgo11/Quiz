const jwt = require('@tsndr/cloudflare-worker-jwt')
const headers = {
  'accept': 'application/json',
  'access-control-allow-origin': '*',
  'access-control-allow-headers': 'content-type',
  'content-type': 'application/json;charset=UTF-8'
};

async function logAnswers({user, answers}, env) {
  let database = await env.DB.get(user, {type: "json"}) || {}
  const questions = {}
  for (const [question, answer] of Object.entries(answers)) {
    questions[question] = answer
  }
  database['answers'] = questions
  await env.DB.put(user, JSON.stringify(database))
  return true; // No resp from prev cmd?
}

async function calculateAnswers(env) {
  const _questions = env.DB.get('questions', {type: 'json'}) || null
  if (_questions === null) return new Response(JSON.stringify({error: "Correct answers not defined yet."}, {status: 501}))
  const all_teams = await env.DB.list({type: 'json'})
  let _teams = {}
  let correct = {}
  const _name = all_teams.keys
  for (const i of _name) {
    _teams[i.name] = await env.DB.get(i.name)
  }

  for (const [team, data] of Object.entries(_teams)) {
    const answers = JSON.parse(data)['answers'] || null
    if (answers === null) continue
    for (const [k, v] of Object.entries(answers)) {
      if (_questions[k] === v) correct[team] = correct[team] + 1 || 1
    }
  }
  return new Response(JSON.stringify(correct))
}

export async function onRequestGet({request, env}) {
  if (`Bearer ${env.AUTH_TOKEN}` === request.headers.get('Authorization')) return await calculateAnswers(env)
  return new Response(null, {status: 401})
}

export async function onRequestPut({request, env}) {
  const {user} = await request.json();
  if (user === null) return new Response(JSON.stringify({error: 'No user specified'}), {status: 400})
  if (await env.DB.get(user) !== null) return new Response(JSON.stringify({error: 'User already exists'}), {status: 400})
  const secret = crypto.randomUUID()
  const token = await jwt.sign({
    user: user,
    nbp: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (2 * (60 * 60))
  }, secret)
  await env.DB.put(user, JSON.stringify({secret: secret, answers: {}}))
  return new Response(JSON.stringify({user: user, token: token}))
}

export async function onRequestPost({request, env}) {
  const {user, answers} = await request.json();
  const token = request.headers.get('Authorization').split('Bearer ')[1]
  const {secret} = await env.DB.get(user, {type: 'json'}) || null
  if (await jwt.verify(token, secret))
    if (await logAnswers({user, answers}, env))
      return new Response(null, {status: 201})
  return new Response(null, {status: 401})
}
