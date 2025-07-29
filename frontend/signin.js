const inputEmail = document.getElementById('inputEmail')
const inputPassword = document.getElementById('inputPassword')
const btn = document.getElementById('btn')

btn.addEventListener('click', async () => {
    const userData = {
        email: inputEmail.value,
        password: inputPassword.value
    }
    try {
        const res = await fetch('http://localhost:8080/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
            credentials: "include"
        })
        const data = await res.json()
        if (res.status === 200) {
            window.location.href = '/homepage.html'
        } else {
            alert('Login failed, please sign up')
            window.location.href = '/signup.html'
        }
    } catch (err) {
        console.log(err.message);
    }
})