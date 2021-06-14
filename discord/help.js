const ADMIN_CHANNEL_ID = process.env.ADMIN_CHANNEL_ID

function helpCommand(args, receivedMessage) {
  const isAdminChannel = receivedMessage.channel.id == ADMIN_CHANNEL_ID

  if (args.length < 1) {
    isAdminChannel
      ? receivedMessage.channel.send(
          'specify what you need help for:\n `!makeit` \n `!help checkin` \n `!help codes` \n `!help sponsor` \n `!help mentor` \n `!help judge` \n `!help minor` \nor `!background` to know more about me! '
        )
      : receivedMessage.channel.send(
          'specify what you need help for:\n `!makeit` \n `!help checkin` \n `!help codes` \nor `!background` to know more about me! '
        )
  } else {
    const topic = args[0]
    switch (topic) {
      case 'checkin':
        console.log('checkin prompt')
        receivedMessage.channel.send(
          'Type the email you registered with out on the checkin channel to check in to MakeUC. Ex: `foo@bar.com`'
        )
        break
      case 'codes':
        receivedMessage.channel.send(
          'Use the bot command `!claim CODE` to claim your participation points'
        )
        break
      case 'sponsor':
      case 'mentor':
      case 'judge':
      case 'minor':
        if (isAdminChannel) {
          receivedMessage.channel.send(
            `Use the bot command \`!${topic} <email> <name>\` to add an attendee to the database and allow them to check in to the discord server`
          )
          break
        }
      default:
        receivedMessage.channel.send('Invalid bot command')
        throw new Error(`Invalid command`)
    }
  }
}

module.exports = helpCommand
