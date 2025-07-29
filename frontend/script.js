const output = document.getElementById('output')
const res = await fetch('http://localhost:8080/home', {
    credentials: 'include'
})
const data = await res.json()
if (res.status === 200) {
    console.log({ message: 'user auth' });
    output.innerText = 'Auth'
} else {
    window.location.href = '/signin.html'
}