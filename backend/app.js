import express from 'express'
import routes from './routes/routes.js'

const app = express()

app.use(express.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5500')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    next()
})

app.use('/', routes)

app.listen(8080, () => console.log('server listen : 8080'))