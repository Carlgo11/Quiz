const jwt = require('@tsndr/cloudflare-worker-jwt')
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "HEAD,PUT,OPTIONS",
    "Access-Control-Max-Age": "86400",
    "Access-Control-Allow-Headers": "Accept,Content-Type"
};
async function createJWT(user) {
    const secret = crypto.randomUUID()
    const token = await jwt.sign({
        user: user,
        nbf: Math.floor(Date.now() / 1000), // Not before: now
        exp: Math.floor(Date.now() / 1000) + (2 * (60 * 60)) // Expires: 2h
    }, secret)
    return {secret, token}
}

export async function onRequestPut({request, env}) {
    const {user} = await request.json();
    const userDB = env.USERS;
    if (user === null) return new Response(JSON.stringify({error: 'No user specified'}), {status: 400, headers: corsHeaders})
    if (await userDB.get(`user:${user}`)) return new Response(JSON.stringify({error: 'User already exists'}), {status: 409, headers: corsHeaders})
    const {secret, token} = await createJWT(user)
    try {
        await userDB.put(`user:${user}`, JSON.stringify({secret: secret, answers: {}}), {expirationTtl: 2 * 60 * 60})
        return new Response(JSON.stringify({token: token}), {status: 201, headers: corsHeaders})
    } catch (error) {
        console.log(error)
        return new Response(null, {status: 500, headers: corsHeaders})
    }
}

export function onRequestOptions(){
    return new Response(null, {status: 204, headers: corsHeaders})
}

export function onRequestHead(){
    return new Response(null, {status: 204, headers: corsHeaders})
}
