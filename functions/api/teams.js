const jwt = require('@tsndr/cloudflare-worker-jwt')

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
    if (user === null) return new Response(JSON.stringify({error: 'No user specified'}), {status: 400})
    if (await userDB.get(`user:${user}`)) return new Response(JSON.stringify({error: 'User already exists'}), {status: 409})
    const {secret, token} = await createJWT(user)
    try {
        await userDB.put(`user:${user}`, JSON.stringify({secret: secret, answers: {}}))
        return new Response(JSON.stringify({token: token}), {status: 201})
    } catch (error) {
        console.log(error)
        return new Response(null, {status: 500})
    }
}
