$(document).ready(function () {


})
let user = "team-b";
$('.form-check-input').click(function (event) {
    const [question, answer] = $(this).attr('id').split('-');
    console.log(answer);
    console.log(question);
    sendAnswer(question, answer, user).then(r => console.log(r));
})

async function sendAnswer(question, answer, user) {
    const data = {user: user, answers: {[question]: answer}}
    $.ajax({
        url: "https://quiz.carlgo11.workers.dev/",
        method: "POST",
        contentType: 'application/json',
        dataType: "json",
        data: JSON.stringify(data)

    })
}