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
