const express = require('express')
const sendQuestion = require('../discord/question')

const router = express.Router()

router.post(`/message`, async (req, res, next) => {
  const message = req.body.message
  await sendQuestion(message)
})

module.exports = router
