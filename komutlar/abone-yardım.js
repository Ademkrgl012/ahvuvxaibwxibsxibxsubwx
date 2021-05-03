const Discord = require("discord.js");
exports.run = async (client, message, args) => {
  let prefix = "m!";
  let yardım = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .addField("MUTOT Abone Menüsü",`
     🔔 **m!abone-y-rol**: Abone Yetkilisini Seçer.
     🔔 **m!abone-rol**: Vereceğiniz Rolü Seçer.
     🔔 **m!abone-log**: Log Mesajının Gideceği Kanalı Seçer.
     🔔 **m!abone**: Abone Rolü Verir.`)
    .addField("**» Davet Linki**", " [Botu Davet Et](https://discord.com/oauth2/authorize?client_id=826508857463275542&scope=bot&permissions=2147483647)", )
    .setImage("https://cdn.discordapp.com/attachments/838139251862011956/838740310858268702/standard_1.gif")
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