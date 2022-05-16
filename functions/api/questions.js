export async function onRequestGet({env}) {
  const data = await env.QUESTIONS.get('questions')
  const keys = Object.keys(JSON.parse(data))

  return new Response(JSON.stringify(keys), {
    headers:
      {
        'access-control-allow-origin': '*',
        'access-control-allow-headers': 'content-type',
        'content-type': 'application/json;charset=UTF-8'
      }
  });
}
