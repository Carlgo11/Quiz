const {response} = require('express');
exports.index = function (req, res) {
    if (req.session.token == null)
        res.redirect('/register');
    else res.redirect('/questions');
};
exports.register_get = function (req, res) {
    res.render('index');
};
// Register user with server
exports.register_post = async function (req, res) {
    const {username} = req.body
    let data = null;
    try {
        console.log('sending teams fetch')
        const response = await fetch('https://quiz-7ff.pages.dev/api/teams', { //TODO: Replace URI with .env var
            method: 'PUT',
            body: JSON.stringify({user: username}),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        const json = await response.json();
        const {token} = json;
        console.log(`token: ${token}`)
        if (json.error)
            return res.send(await response.status, JSON.stringify(json.error))
        if (token == null)
            return res.send(500, JSON.stringify({'error': 'No token received'}))
        req.session.token = token
        res.redirect('questions')
    } catch (e) {
        console.log(error);
        return res.sendStatus(500)
    }
}

// Fetch and present questions
exports.questions = async function (req, res) {
    const token = req.session.token;
    if (token == null) return res.redirect('/');
    console.log(`token ${token}`);
    try {
        const _questions = await fetch('https://quiz-7ff.pages.dev/api/questions', { //TODO: Replace URI with .env var
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const questions = await _questions.json();
        console.log(`questions: ${JSON.stringify(questions)}`)
        if (questions === null)
            return res.send(500, JSON.stringify({error: 'No questions received'}))
        const questions_str = JSON.stringify({questions: questions})
        res.render('questions', {questions})
    } catch (error) {
        console.log(error);
        return res.sendStatus(500)

    }
};