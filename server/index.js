const express = require('express')
const cors = require('cors')
const auth = require('./auth')
const router = require('./routes')

const PORT = process.env.PORT

const app = express()

app.use(express.json())
app.use(cors({ origin: `*` }))

app.get(`/ping`, async (req, res, next) => {
  res.send(`pong`)
})

app.use(auth)
app.use(router)

app.listen(PORT, () => {
  console.log(`HTTP server running on port ${PORT}`)
})
