const inputName = document.getElementById('inputName')
const inputEmail = document.getElementById('inputEmail')
const inputPassword = document.getElementById('inputPassword')
const btn = document.getElementById('btn')

btn.addEventListener('click', async () => {
    if (!inputName.value && !inputEmail.value && !inputPassword.value) {
        alert('empty form not allowed')
    } else {
        const userData = {
            uuid: crypto.randomUUID(),
            name: inputName.value,
            email: inputEmail.value,
            password: inputPassword.value
        }
        try {
            const res = await fetch('http://localhost:8080/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            })
            const data = await res.json()
            if (res.status === 200) {
                window.location.href = '/signin.html'
            }
        } catch (err) {
            console.log(err.message);
        }
    }

})