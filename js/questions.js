let user = window.localStorage.getItem('user');
let answers = JSON.parse(window.localStorage.getItem('answers')) || {};

$(document).ready(async function () {
  if (user == null) await (new bootstrap.Modal($('#team-modal'))).show()
  if (window.localStorage.getItem('disabled')) {
    $('.answer').attr('disabled', true);
    $('#send').hide();
  }
  if (answers) {
    for (const [k, v] of Object.entries(answers)) {
      $(`#${k}-${v}`).attr("checked", true)
    }
  }
})

$('#t-submit').click(async () => {
  const username = $('#team').val();
  await requestUser(username)
})

$('.form-check-input').click(async function () {
  const [question, answer] = $(this).attr('id').split('-')
  answers[question] = answer
  window.localStorage.setItem('answers', JSON.stringify(answers))
})

$('#send').click(() => {
  sendAnswer().then(r => {
    window.localStorage.setItem('disabled', true)
    $('.answer').attr('disabled', true);
    $('#send').hide();
  })
})

async function requestUser(username) {
  const data = {user: username};
  $.ajax({
    url: '/api/teams',
    method: 'PUT',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify(data)
  }).done(function ({user, token}) {
    window.localStorage.setItem('user', user)
    window.localStorage.setItem('token', token)
    window.location.reload()
  })
}

async function sendAnswer() {
  const data = {user: user, answers: answers}
  $.ajax({
    url: 'api/teams',
    method: 'POST',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify(data),
    headers: {
      Authorization: 'Bearer ' + window.localStorage.getItem('token')
    }
  })
}
