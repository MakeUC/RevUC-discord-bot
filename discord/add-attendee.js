const Discord = require('discord.js')
const Axios = require('axios').default

const API_TOKEN = process.env.API_TOKEN
const ADMIN_CHANNEL_ID = process.env.ADMIN_CHANNEL_ID

/**
 *
 * @param {string[]} args
 * @param {Discord.Message} message
 * @param {'sponsor' | 'mentor' | 'judge' | 'minor'} primaryCommand
 */
module.exports = async function (args, message, primaryCommand) {
  if (args.length < 2) {
    message.channel.send(
      `Invalid command format! Please specify role, email and name.`
    )
  } else {
    const email = args.shift()
    const name = args.join(` `)
    let role = primaryCommand.toUpperCase()
    let isMinor = false

    if (primaryCommand === 'minor') {
      role = `HACKER`
      isMinor = true
    }

    if (message.channel.id == ADMIN_CHANNEL_ID) {
      try {
        await Axios.post(
          `https://revolutionuc-api.herokuapp.com/api/v2/attendee`,
          { email, name, role, isMinor },
          { headers: { Authorization: `Bearer ${API_TOKEN}` } }
        )

        message.channel.send(`Created ${primaryCommand} ${name} <${email}>`)
      } catch (err) {
        console.error(err)
        if (err.response?.status === 400) {
          message.channel.send(`Attendee with email ${email} already exists!`)
        } else {
          message.channel.send(
            `Error creating attendee ${email}, please try again later or contact the Super User Dev Olpowerful (SUDO).`
          )
        }
      }
    }
  }
}
