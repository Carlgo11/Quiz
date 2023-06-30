const form = document.querySelector('#questions')
form.addEventListener('change', function (e) {
    const data = new FormData(form);
    const questions = Object.fromEntries(data);
    console.log(questions)
    console.log(e.srcElement.id);
})
