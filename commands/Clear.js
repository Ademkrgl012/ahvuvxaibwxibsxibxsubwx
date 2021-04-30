const Discord = require("discord.js");
const config = require("../settings/config.json");
exports.run = function(client, message, args) {
  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message
      .reply("Yeterli İzininiz Yok!")
      .then(z => z.delete({ timeout: 8000 }));
  if (!args[0])
    return message
      .reply("Ne Kadar Mesaj Sileceğiniz Yazmalısın")
      .then(x => x.delete({ timeout: 8000 }));
  message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(
      new Discord.MessageEmbed()
        .setDescription("Mesajlar başarıyla silindi.")
        .setColor(config.cyan)
        .setTimestamp()
        .setFooter(`requested by ${message.author.username}`)
    );
  });
};

exports.help = {
  name: "clear",
  aliases: []
};