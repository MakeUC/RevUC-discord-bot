const express = require('express')
const sendQuestion = require('../discord/question')

const router = express.Router()

router.post(`/message`, async (req, res, next) => {
  const text = req.body.text
  await sendQuestion(text)
})

module.exports = router
