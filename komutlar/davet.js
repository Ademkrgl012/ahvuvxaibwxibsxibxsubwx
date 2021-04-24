const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');

exports.run = (client, message) => {
  const chrome = new Discord.MessageEmbed()
  .setTitle("Davet Linkleri Altta Belirtilmiştir")
  .setColor("GOLD")
    .addField("» **Botun Sahibi**", "<@!564837933912293386>")
    .addField("**» Destek Sunucusu**", " [Sunucumuza Katıl](https://discord.gg/uruvQjX47v)", )
    .addField("**» Davet Linki**", " [Botu Davet](https://discord.com/oauth2/authorize?client_id=826508857463275542&scope=bot&permissions=2147483647)",)
    .setImage("https://cdn.discordapp.com/attachments/813881349004984370/826793395677691924/350kb_1.gif")
  .setFooter(`${message.author.tag} Tarafından İstendi.`, message.author.avatarURL())
  message.channel.send(chrome);   //DevTR
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
};

exports.help = {
  name: 'davet',
};