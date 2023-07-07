const form = document.querySelector('#register')
form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const data = new FormData(form);
    const res = await fetch(e.target.action, {
        method: 'PUT', headers: {
            'Content-Type': 'application/json', 'Accept': 'application/json',
        }, body: JSON.stringify({
            'user': data.get('username')
        }), cache: 'no-store'
    })

    if (!res.ok) {
        const {error} = await res.json();
        console.error(`${res.status} ${res.statusText}: ${error}`)
        document.querySelector('.error').textContent = error
        return null;
    }

    const {token} = await res.json();
    // Set the session cookie
    const cookieValue = JSON.stringify({token});
    const expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + (2 * 60 * 60 * 1000)); // Set expiry time to 2 hours from now

    // Format the expiry date in UTC string format
    const expiryDateString = expiryDate.toUTCString();

    document.cookie = `token=${encodeURIComponent(cookieValue)}; expires=${expiryDateString}; path=/`;

    window.location.href = '/'
});
