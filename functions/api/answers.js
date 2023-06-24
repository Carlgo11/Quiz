import jwt from "@tsndr/cloudflare-worker-jwt";

/*
// Get answers (and calculate the amount of correctly answered ones) for all users
async function getUserResults(userDB) {
    const _questions = await userDB.get('questions', {type: 'json'})
    if (_questions === null)
        return new Response(JSON.stringify({error: 'Correct answers not defined yet.'}), {status: 501})
    let users = {}
    for (const user of (await userDB.list({prefix: 'user:', type: 'json'})).keys) {
        users[user.name] = await userDB.get(user.name)
    }
    let correct = {}
    for (const [user, data] of Object.entries(users)) {
        const answers = JSON.parse(data)['answers'] || null
        if (answers === null) continue
        for (const [k, v] of Object.entries(answers)) {
            console.log(`Question ${k}: Answer: ${v} Correct ${_questions[k]}`);
            if (_questions[k] === v) correct[user] = correct[user] + 1 || 1
        }
    }
    return new Response(JSON.stringify(correct))

export async function onRequestGet({request, env}) {
    if (`Bearer ${env.AUTH_TOKEN}` === request.headers.get('Authorization')) return await getResults(env.USERS)
    return new Response(null, {status: 401})
}
*/

async function storeUserAnswers({user, answers}, userDB) {
    try {
        let userObject = await userDB.get(`user:${user}`, {type: "json"}) || {}
        userObject['answers'] = {...answers}
        await userDB.put(`user:${user}`, JSON.stringify(userObject))
        return true
    } catch (error) {
        console.log(error)
    }
}

function getUserAnswers(user, userDB) {
    return userDB.get(`user:${user}`, {type: "json"})
        .then(userObject => userObject.answers || null);
}

async function validateJWT(request, userDB) {
    try {
        const token = request.headers.get('Authorization').split('Bearer ')[1]
        const {user} = jwt.decode(token)
        const {secret} = await userDB.get(`user:${user}`, {type: 'json'})
        if (await jwt.verify(token, secret)) return user
    } catch (error) {
        console.log(error)
    }
    return false;
}

// Get uploaded answers by the user (currently not used by UI)
export async function onRequestGet({request, env}) {
    const userDB = env.USERS;
    const user = await validateJWT(request, userDB)
    if (!user) return new Response(null, {status: 401})
    return new Response(JSON.stringify(getUserAnswers(user, userDB)))
}

// Upload answers
export async function onRequestPost({request, env}) {
    const userDB = env.USERS;
    if (request.headers.get('Content-Type') !== 'application/json')
        return new Response(null, {status: 406, headers: {accept: 'application/json'}})
    const user = await validateJWT(request, userDB)
    if (!user) return new Response(null, {status: 401})
    const {answers} = await request.json();
    if (!answers) return new Response(JSON.stringify({error: 'Payload Missing'}), {
        status: 400,
        headers: {'content-type': 'application/json'}
    })
    if (await storeUserAnswers({user, answers}, userDB))
        return new Response(null, {status: 204})
    return new Response(null, {status: 500})
}
