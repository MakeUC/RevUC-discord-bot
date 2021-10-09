const Discord = require('discord.js')
const Axios = require('axios').default

const STATS_KEY = process.env.STATS_KEY
const STATS_URL = process.env.STATS_URL
const ADMIN_CHANNEL_ID = process.env.ADMIN_CHANNEL_ID

/**
 *
 * @param {string[]} args
 * @param {Discord.Message} message
 * @param {string} primaryCommand
 */
module.exports = async function (args, message, primaryCommand) {
  if(message.channel.id !== ADMIN_CHANNEL_ID) return;

  let text = args.join(` `);

  if(primaryCommand === `verify`) {
    text = `verify ${text}`;
  }

  try {
    const res = await Axios.post(
      STATS_URL,
      { user_id: message.author.id, text },
      {
        headers: {
          Authorization: `Bearer ${STATS_KEY}`,
        },
      }
    )
    
    const response = res.data;

    message.channel.send(response);
  } catch (err) {
    console.error(err);
    message.channel.send(
      err.response?.data?.message ||
      `Error fetching stats, please try again later or contact the Super User Dev Olpowerful (SUDO).`
    );
  }
}
