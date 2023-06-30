import jwt from "@tsndr/cloudflare-worker-jwt";

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

/*
* Questions DB schema:
* "question:x" {
* "options": [
*   1,
*   2,
*   3,
*   "D"
* ],
* "correct": [
*   1,
*   "D"
* ]
* }
*
*/
async function getAvailableQuestions(questionDB) {
    try {
        let questions = {}
        for (const k of (await questionDB.list({prefix: 'question:', type: 'json'})).keys) {
            const question = await questionDB.get(k.name, {type: 'json'})
            questions[(k.name).replace('question:','')] = question.options
        }
        return questions
    } catch (error) {
        console.log(error)
    }
    return {};
}

export async function onRequestGet({request, env}) {
    const questionDB = env.QUESTIONS;
    const userDB = env.USERS;
    const user = await validateJWT(request, userDB)
    if (!user) return new Response(null, {status: 401})
    return new Response(JSON.stringify(await getAvailableQuestions(questionDB)))
}

export async function onRequestPut({request, env}) {
    const questionDB = env.QUESTIONS;
    // Insert test data
    const data = {
        "1": {"options": ["1", "X", "2"], "correct": "1"},
        "2": {"options": ["1", "X", "2"], "correct": "2"},
        "3": {"options": ["1", "X", "2"], "correct": "1"},
        "4": {"options": ["1", "X", "2"], "correct": "2"},
        "5": {"options": ["1", "X", "2"], "correct": "X"},
        "6": {"options": ["1", "X", "2"], "correct": "X"},
    }
    for (const [k, v] in data) {
        console.log(`${k} ${v}`);
        await questionDB.put(`question:${k}`, v)
    }

    return new Response(null, {status: 204})
}