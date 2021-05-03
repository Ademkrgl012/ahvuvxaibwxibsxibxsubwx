const Discord = require('discord.js');
exports.run = async (client, message, args) => { 
let prefix = 'm!'
let yardım = new Discord.MessageEmbed()  
.setColor('RANDOM')
.addField("Adem Reyzz Eğlence Menüsü",`
✨ **m!hava-durumu**: Yazdığınız şehirin hava durumunu atar.
✨ **m!atatürk-sözü**: Rasgele Atatürk Sözü Atar.
✨ **m!atasözü**: Rasgele Atasözü Atar.
✨ **m!sarıl [etiket]**: Etiketlediğin Kişiye Sarılır.
✨ **m!boğazla [etiket]**: Etiketlediğin Kişiyi Boğazlar.`)
.addField("**» Davet Linki**"," [Botu Davet Et](https://discord.com/oauth2/authorize?client_id=826508857463275542&scope=bot&permissions=2147483647)")
    .setImage("https://cdn.discordapp.com/attachments/813881349004984370/827103972581048340/standard_1.gif")
    .setFooter(`${message.author.tag} Tarafından İstendi.`,message.author.avatarURL())
    .setThumbnail(client.user.avatarURL());
  message.channel.send(yardım);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["eğlence2"],
  permLevel: 0
};

exports.help = {
  name: "eğlence2",
  category: "eğlence2",
  description: ""
};