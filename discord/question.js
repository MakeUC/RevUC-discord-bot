const client = require('./client')

const QUESTIONS_CHANNEL_ID = process.env.QUESTIONS_CHANNEL_ID

/**
 *
 * @param {string} message
 */
const sendQuestion = async (message) => {
  const questionsChannel = await client.channels.fetch(QUESTIONS_CHANNEL_ID)
  return questionsChannel.send(message)
}

module.exports = sendQuestion
