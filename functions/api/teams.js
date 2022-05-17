const headers = {
  'accept': 'application/json',
  'access-control-allow-origin': '*',
  'access-control-allow-headers': 'content-type',
  'content-type': 'application/json;charset=UTF-8'
};

async function logAnswers(user, answers, env) {
  let database = await env.TEAMS.get(user, {type: "json"}) || {}
  for (const [question, answer] of Object.entries(answers)) {
    console.log(question)
    console.log(answer)
    database[question] = answer
  }
  await env.TEAMS.put(user, JSON.stringify(answers))
}

async function storeAnswers(request, env) {
  const contentType = request.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {

    const {user, answers} = await request.json()
    await logAnswers(user, answers);

    return new Response(JSON.stringify(await env.TEAMS.get(user)), {headers: headers})
  } else {
    return new Response(null, {status: 415, headers: headers})
  }
}

export async function onRequestGet({request, env}) {
  if (`Bearer ${env.AUTH_TOKEN}` === request.headers.get('Authorization'))
    return await calculateAnswers(env)
  return new Response(null, {status: 401})
}

async function calculateAnswers(env) {
  const _questions = await env.QUESTIONS.get('questions', {type: 'json'})
  const all_teams = await env.TEAMS.list({type: 'json'})
  let _teams = {}
  let correct = {}
  const _name = all_teams.keys
  for (const i of _name) {
    _teams[i.name] = await env.TEAMS.get(i.name)
  }

  for (const [team, answers] of Object.entries(_teams)) {
    for (const [k, v] of Object.entries(JSON.parse(answers))) {
      if (_questions[k] === v) {
        correct[team] = correct[team] + 1 || 1
      }
    }
  }
  return new Response(JSON.stringify(correct))
}

export async function onRequestPost({request, env}) {
  return await storeAnswers(request, env)
}
