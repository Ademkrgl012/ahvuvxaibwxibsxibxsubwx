const Discord = require("discord.js");

exports.run = (client, message) => {

let motion = new Discord.MessageEmbed()
  

    .addField(
      "Veriler", 
      `>  Toplam sunucu: **${
        client.guilds.cache.size
      }** \n>  Toplam kullanıcı: **${client.guilds.cache
        .reduce((a, b) => a + b.memberCount, 0)
        .toLocaleString()}** \n>  Toplam kanal: **${
        client.channels.cache.size
      }**`
    ) 
    .addField(
      "Bot Geliştiricisi",
      `> Bot geliştiricisi : <@564837933912293386>`
    ) 
    .addField(
      "Sürümler",
      `>  Discord.js sürümü: **v${Discord.version}** \n>  Node.js sürümü: **${process.version}**`
    ) 
    
    .setTimestamp()
    .setColor("RANDOM");
  message.channel.send(motion);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  permLevel: 0,
  aliases: ["bot-bilgi", "i"]
};

exports.help = {
  name: "istatistik",
  description: "Türkiyenin Saatini Gösterir ",
  usage: "gç"
};