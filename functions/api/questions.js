export async function onRequestGet({env}) {
  const data = JSON.parse(await env.DB.get('questions') || null)
  if (data === null) return new Response(JSON.stringify({error: 'No questions defined.'}), {status: 501})
  let questions = {};
  for (const [q, a] of Object.entries(data)) {
    questions[q]= a.map((b) => b.replace('*', ''));
  }
  return new Response(JSON.stringify(questions), {
    headers: {
      'content-type': 'application/json;charset=UTF-8'
    }
  });
}
