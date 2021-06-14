require('dotenv').config()
const Discord = require('discord.js')
const client = require('./client')
const help = require('./help')
const checkin = require('./checkin')
const { score, top } = require('./score')
const revvit = require('./revvit')
const background = require('./background')
const addAttendee = require('./add-attendee')
const stats = require('./stats')

const CHECKIN_CHANNEL_ID = process.env.CHECKIN_CHANNEL_ID

client.once('ready', () => {
  console.log('the bot is online!')
  client.user.setActivity('with Javascript', { type: 'PLAYING' })
})

client.on('message', async (receivedMessage) => {
  if (receivedMessage.author == client.user) {
    return
  }

  if (receivedMessage.channel.id == CHECKIN_CHANNEL_ID) {
    // run the checkin function
    await checkin(receivedMessage)
    return
  }

  if (receivedMessage.content.startsWith('/')) {
    processCommand(receivedMessage)
  }
})

/**
 *
 * @param {Discord.Message} receivedMessage
 */
function processCommand(receivedMessage) {
  // remove the leading/bot identifying character
  const fullCommand = receivedMessage.content.substr(1)

  // split the message up into pieces for each space
  const splitCommand = fullCommand.split(' ')

  // take the first string from the split
  const primaryCommand = splitCommand[0]

  // all other words are arguments/parameters for the primaryCommand
  const commandArguments = splitCommand.slice(1)

  console.log('command received: ' + primaryCommand)
  console.log('Arguments: ' + commandArguments)

  switch (primaryCommand) {
    case 'help':
      help(commandArguments, receivedMessage)
      break
    case 'claim':
      score(commandArguments, receivedMessage)
      break
    case 'top':
      top(commandArguments, receivedMessage)
      break
    case 'hi':
    case 'makeit':
      revvit(commandArguments, receivedMessage)
      break
    case 'background':
      background(commandArguments, receivedMessage)
      break
    case 'sponsor':
    case 'mentor':
    case 'judge':
    case 'minor':
      addAttendee(commandArguments, receivedMessage, primaryCommand)
      break
    case 'stats':
    case 'verify':
      stats(commandArguments, receivedMessage, primaryCommand)
      break
  }
}
