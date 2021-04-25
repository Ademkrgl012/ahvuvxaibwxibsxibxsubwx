const Discord = require("discord.js");
const moment = require("moment");
const os = require('os');
require("moment-duration-format");
exports.run = async (bot, message, args) => {
   const ademreyzzzaman = moment.duration(bot.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
   const ademreyzzistatistikler = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setFooter('Plasmic Code', bot.user.avatarURL)
  .addField("BOTUNUZUN ADI **İstatistikleri**", "Sunucunuz İçin En İyisi")
  .addField("**Botun Geliştiricisi**",  " <@564837933912293386>")
  .addField("**Bellek kullanımı**", (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + ' MB', true)  
  .addField("**Çalışma süresi**", ademreyzzzaman)
  .addField("**Kullanıcılar**" , bot.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString(), true)
  .addField("**Sunucular**", bot.guilds.size.toLocaleString(), true)
  .addField("**Kanallar**", bot.channels.size.toLocaleString(), true)
  .addField("**Discord.JS sürüm**", "v"+Discord.version, true)
  .addField("**Ping**", bot.ping+" ms", true)
  .addField("**CPU**", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
  .addField("**Bit**", `\`${os.arch()}\``, true)
  .addField("**Destek Sunucusu**", "", )
 return message.channel.send(ademreyzzistatistikler);
  };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [ 'i', 'istatistik'],
  permLevel: 0
};

exports.help = {
  name: "istatistik",
  description: "Bot i",
  usage: "istatistik"
};
