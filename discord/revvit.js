function revvitCommand(arguments, receivedMessage){
    const intro = "Hi! I am the official bot for RevolutionUC 2021! \nI can assist you check in to the event, and keep track of your participation scores. Just say `!help` to list all the things that I can do! \nGood luck and have fun hacking!"
    receivedMessage.channel.send(intro)
}

module.exports=revvitCommand