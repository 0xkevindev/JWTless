import dotenv from 'dotenv';
dotenv.config()

import pg from 'pg'
const { Client } = pg

const client = new Client({
    database: process.env.DATABASE,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    port: Number(process.env.PORT),
    user: process.env.DB_USER
   
})

client.connect()
    .then(() => console.log('connected'))
    .catch(err => console.log(err.message))

export default client