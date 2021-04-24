const Discord = require("discord.js");
exports.run = async (client, message, args) => {
  let prefix = "a!";
  let yardım = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .addField("Adem Reyzz Moderasyon Menüsü",`
     🔔 **a!abone-y-rol**: Abone Yetkilisini Seçer.
     🔔 **a!abone-rol**: Vereceğiniz Rolü Seçer.
     🔔 **a!abone-log**: Log Mesajının Gideceği Kanalı Seçer.
     🔔 **a!abone**: Abone Rolü Verir.`)
    .addField("**» Davet Linki**", " [Botu Davet Et](https://discord.com/oauth2/authorize?client_id=826508857463275542&scope=bot&permissions=2147483647)", )
    .setImage("https://cdn.discordapp.com/attachments/813881349004984370/827103972581048340/standard_1.gif")
    .setFooter(`${message.author.tag} Tarafından İstendi.`,message.author.avatarURL())
    .setThumbnail(client.user.avatarURL());
  message.channel.send(yardım);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["abone-yardım"],
  permLevel: 0
};

exports.help = {
  name: "abone-yardım",
  category: "abone-yardım",
  description: "Eğlence Komutları Gösterir."
};