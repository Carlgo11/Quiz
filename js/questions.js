let user = window.localStorage.getItem('user');

$(document).ready(async function () {
    if (user == null) {
        let team_modal = new bootstrap.Modal($('#team-modal'))
        await team_modal.show();
    }
})

$('#team-modal').submit(() => {
    window.localStorage.setItem('user', $('#team').val());
});

let answers = JSON.parse(window.localStorage.getItem('answers')) || {};

$('.form-check-input').click(async function () {
    const [question, answer] = $(this).attr('id').split('-');
    answers[question] = answer;
    window.localStorage.setItem('answers', JSON.stringify(answers));
    console.log(answer);
    console.log(question);
})

$('#send').click(async function () {
    await sendAnswer().then(r => {
        $('.card').hide();
        $('#send').hide();
        let done_modal = new bootstrap.Modal($('#done'))
        done_modal.show();
    });
})

async function sendAnswer() {
    const data = {user: user, answers: answers}
    $.ajax({
        url: "https://quiz.carlgo11.workers.dev/",
        method: "POST",
        contentType: 'application/json',
        dataType: "json",
        data: JSON.stringify(data)
    })
}