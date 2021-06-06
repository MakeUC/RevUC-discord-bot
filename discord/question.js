const client = require('./client')

const QUESTIONS_CHANNEL_ID = process.env.QUESTIONS_CHANNEL_ID

/**
 *
 * @param {string} text
 */
const sendQuestion = async (text) => {
  const questionsChannel = await client.channels.fetch(QUESTIONS_CHANNEL_ID)
  return questionsChannel.send(text)
}

module.exports = sendQuestion
