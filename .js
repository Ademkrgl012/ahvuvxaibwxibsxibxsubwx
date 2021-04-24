const Discord = require("discord.js");
exports.run = async (client, message, args) => {
var kisi,yazi;
        if(!message.mentions.users.first()){
            kisi = message.author;
            yazi = "Avatarınız ; ";
        }else{
            kisi = message.mentions.users.first();
            yazi = "Avatarı ; ";
        }
            message.channel.send(new Discord.MessageEmbed()
            .setTitle(yazi)
            .setImage(kisi.displayAvatarURL()));
}
exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
}
exports.help = {
    name: 'a'
}