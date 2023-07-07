const form = document.querySelector('#questions')
form.addEventListener('change', function (e) {
    const data = new FormData(form);
    const questions = Object.fromEntries(data);
    console.log(questions)
    console.log(e.srcElement.id);
    console.debug(JSON.stringify(questions))
    storeAnswers(questions)
})

// Retrieve the stored form data from localStorage
function getAnswers() {
    const storedData = localStorage.getItem('answers');
    return storedData ? JSON.parse(storedData) : null;
}

function decodeCookieValue(cookieValue) {
    return decodeURIComponent(cookieValue);
}

function getTokenFromCookie() {
    const cookieString = document.cookie;
    const cookies = cookieString.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('token=')) {
            const cookieData = cookie.substring('token='.length);
            const decodedToken = decodeURIComponent(cookieData);
            return JSON.parse(decodedToken).token;
        }
    }
    return null; // Token not found
}

// Store form inputs as a JSON object in localStorage
function storeAnswers(formData) {
    localStorage.setItem('answers', JSON.stringify(formData));
}

// Submit answers to API
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const data = new FormData(form);
    const token = getTokenFromCookie();
    console.log(token);
    const res = await fetch(e.target.action, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'answers': Object.fromEntries(data)
        }), cache: 'no-store'
    })
    if (!res.ok) {
        const {error} = await res.json();
        console.error(`${res.status} ${res.statusText}: ${error}`)
        document.querySelector('.error').textContent = error
        return null;
    }

    // Remove stored Answers as they are no longer needed.
    localStorage.clear();
    // Get all form inputs
    const formInputs = form.querySelectorAll('input,button');

// Disable the form inputs
    formInputs.forEach((input) => {
        input.disabled = true;
    });

})

// On page load, populate form inputs with stored values
const storedData = getAnswers();
console.log(storedData);
const formData = new FormData(form);
if (storedData) {
    for (const inputName in storedData) {
        const inputValue = storedData[inputName];
        formData.set(inputName, inputValue);
        const input = document.querySelector(`input[name="${inputName}"][value="${inputValue}"]`);
        if (input) {
            input.checked = true;
        }
    }
}
