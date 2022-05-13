let user = window.localStorage.getItem('user');
let answers = JSON.parse(window.localStorage.getItem('answers')) || {};

$(document).ready(async function () {
    if (user == null) {
        let team_modal = new bootstrap.Modal($('#team-modal'))
        await team_modal.show()
    }
})

$('#team-modal').submit(() => {
    window.localStorage.setItem('user', $('#team').val())
})

$('.form-check-input').click(async function () {
    const [question, answer] = $(this).attr('id').split('-')
    answers[question] = answer
    window.localStorage.setItem('answers', JSON.stringify(answers))
})

$('#send').click(() => {
    sendAnswer().then(r => {
        $('.card,#send').hide();
        let done_modal = new bootstrap.Modal($('#done'))
        done_modal.show();
    })
})

async function sendAnswer() {
    const data = {user: user, answers: answers}
    $.ajax({
        url: 'https://quiz.carlgo11.workers.dev/',
        method: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(data)
    })
}
