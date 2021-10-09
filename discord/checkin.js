const Discord = require('discord.js')
const emailValidator = require('email-validator')
const Axios = require('axios').default

const ATTENDEE_API = process.env.ATTENDEE_API
const HACKER_ROLE = process.env.HACKER_ROLE
const JUDGE_ROLE = process.env.JUDGE_ROLE
const MENTOR_ROLE = process.env.MENTOR_ROLE
const SPONSOR_ROLE = process.env.SPONSOR_ROLE
const CHECKIN_CHANNEL_ID = process.env.CHECKIN_CHANNEL_ID
const MINOR_ROLE = process.env.MINOR_ROLE
const ADMIN_ROLE = process.env.ADMIN_ROLE

/**
 *
 * @param {string} email
 */
const censorEmail = (email) => {
  const ptEmail = email
  let letter = ''
  let stars = ''
  let i = 0
  while (letter != '@' && i < email.length) {
    letter = ptEmail[i]
    i += 1
    stars += '*'
  }
  let censor = ptEmail.slice(1, i - 2)
  stars = stars.substr(1, i - 3)
  return ptEmail.replace(censor, stars)
}

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max))
}

const responses_success = [
  'is checked in!',
  ', welcome to the main event!',
  'is here!',
  'welcome onboard!',
  'has arrived!',
]

const responses_404 = [
  'does not exist',
  'cannot be found',
  ', are you using the right email?',
]

const responses_403 = [
  "you're already checked in.",
  'already exists, is this a clone?',
  "you've already signed up!",
]

const responses_400 = [
  "is not verified, have you checked your email?",
  "you're not verified, check your email!",
  "isn't verified, check for the verification email!"
]

/**
 *
 * @param {Discord.Message} message
 */
module.exports = async function (message) {
  const email = message.toString()
  const discordId = message.author.tag

  const max_success = responses_success.length
  const max_404 = responses_404.length
  const max_403 = responses_403.length

  if (
    emailValidator.validate(email) &&
    message.channel.id == CHECKIN_CHANNEL_ID &&
    // message.member.roles.cache.some(role => role.id === ADMIN_ROLE) // TODO: comment this out when check-in opens
  ) {
    // send a request to api to check in the email
    try {
      const res = await Axios.post(
        `${ATTENDEE_API}/checkin`,
        { email, discordId }
      )

      const data = res.data
      const name = data.fullName.split(" ")[0]

      let roleToBeAdded

      switch (data.role) {
        case `HACKER`:
          roleToBeAdded = HACKER_ROLE
          break
        case `JUDGE`:
          roleToBeAdded = JUDGE_ROLE
          break
        case `SPONSOR`:
          roleToBeAdded = SPONSOR_ROLE
          break
        case `MENTOR`:
          roleToBeAdded = MENTOR_ROLE
          break
        default:
          throw new Error(`Invalid role`)
      }

      // check in succeeded
      const user = message.author.id

      // grant the hacker role
      const member = message.guild.members.cache.find(
        (member) => member.id === user
      )
      const Role = message.guild.roles.cache.find(
        (role) => role.id === roleToBeAdded
      )
      member.roles.add(Role)

      // if (isMinor == true) {
      //   const minorRole = message.guild.roles.cache.find(
      //     (role) => role.id == MINOR_ROLE
      //   )
      //   member.roles.add(minorRole)
      // }

      const censoredEmail = censorEmail(email)

      message.channel.send(
        `${name} <${censoredEmail}> ${
          responses_success[getRandomInt(max_success)]
        }`
      )
    } catch (err) {
      console.error(err)
      if (err.response?.status === 404) {
        message.channel.send(
          `${censorEmail(email)} ${
            responses_404[getRandomInt(max_404)]
          }, please make sure you are registered with us or contact an organizer`
        )
        // message.channel.send(
        //   'Check-in is not currently open, please wait for the hackathon day to check-in!'
        // )
      } else if (err.response?.status === 403) {
        message.channel.send(
          `${censorEmail(email)} ${responses_403[getRandomInt(max_403)]}`
        )
      } else if (err.response?.status === 400) {
        message.channel.send(
          `${censorEmail(email)} ${
            responses_400[getRandomInt(max_400)]
          }, please make sure you are verified with us or contact an organizer`
        )
      } else {
        message.channel.send(
          `Error checking in ${censorEmail(
            email
          )}, please try again later or contact an organizer`
        )
      }
    }

    message.delete({ timeout: 2000 })
  } else {
    if (!message.member.roles.cache.some(role => role.id === ADMIN_ROLE)) {
      const censored = censorEmail(email)
      message.channel.send(`${censored} is not a valid email`)
      // message.channel.send("Check-in is not currently open, please wait for the organizer's announcement that check-in is open!")
      message.delete({ timeout: 3000 })
    }
  }
}