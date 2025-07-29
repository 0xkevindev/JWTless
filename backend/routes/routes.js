import express from 'express'
import client from '../database/db.js'
const router = express.Router()

router.post('/signup', async (req, res) => {
  const { uuid, name, email, password } = req.body
  try {
    const query = `INSERT INTO users (uuid, name, email, password) VALUES ($1, $2, $3, $4)`
    const values = [uuid, name, email, password]
    await client.query(query, values)

    return res.json({ message: 'User inserted successfully' })
  } catch (err) {
    return res.status(500).json({ error: 'Database error' })
  }
})

router.post('/signin', async (req, res) => {
  const { email, password } = req.body
  try {
    const query = `SELECT uuid,email,password FROM users WHERE email = $1 AND password = $2`
    const values = [email, password]
    const dbResponse = await client.query(query, values)

    // console.log(dbResponse.rows);
    const TOKEN = dbResponse.rows[0].uuid

    if (dbResponse.rows.length > 0) {
      res.cookie('auth', TOKEN, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 60
      })

      return res.status(200).json({ message: 'Login success' })
    } else {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
  } catch (err) {
    return res.status(500).json({ error: 'Database error' })
  }
})

router.get('/home', async (req, res) => {
  const withoutParsedCookie = req.headers.cookie
  if (!withoutParsedCookie) {
    return res.status(401).json({ message: 'Unauthorized - No Cookie' })
  }
  const parsedCookie = withoutParsedCookie.split('=')

  if (parsedCookie[1].length === 36) {
    const query = `SELECT uuid FROM users WHERE uuid = $1`
    const values = [parsedCookie[1]]
    const dbResponse = await client.query(query, values);

    if (dbResponse.rows.length > 0 && dbResponse.rows[0].uuid === parsedCookie[1]) {
      return res.status(200).json({ authorized: true });
    } else {
      return res.status(401).json({ message: 'Unauthorized - Invalid UUID' });
    }
  } else {
    return res.status(401).json({ message: 'Unauthorized' })
  }
})

export default router