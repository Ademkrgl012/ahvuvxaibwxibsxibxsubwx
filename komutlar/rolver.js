
const Discord = require("discord.js");
exports.run = async (client, message, args) => {

    let ardademruser = message.mentions.users.first()

    if(!ardademruser) return message.reply('bir kullanıcı etiketlemelisin.')

    message.guild.member(ardademruser).roles.add(message.guild.roles.cache.find(role=>role.id=="825799088745480192").id);
message.channel.send('Rolü verildi.')



}
exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
}
exports.help = {
    name: 'rol-ver'
}
