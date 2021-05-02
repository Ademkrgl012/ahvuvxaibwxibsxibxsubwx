const Discord = require("discord.js");
const config = require("../settings/config.json");
const { noPlaying } = require("../lib/embedMessages.js");

module.exports.run = async (client, message, args) => {
  const queue = message.client.queue
  const serverQueue = queue.get(message.guild.id);
  if (!serverQueue) return noPlaying(message);
  return message.channel.send(new Discord.MessageEmbed().setColor(config.cyan).setDescription(`__**Song queue:**__\n${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}\n**Now playing:** ${serverQueue.songs[0].title}`))
}
module.exports.help = {
    name: "queue",
    aliases: []
}