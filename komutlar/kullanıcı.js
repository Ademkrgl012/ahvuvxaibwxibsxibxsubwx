const Discord = require('discord.js');
exports.run = async (client, message, args) => { 
let prefix = 'a!'
let yardım = new Discord.MessageEmbed()  
.setColor('RANDOM')
.addField('Adem Reyzz Kullanıcı Menüsü',`
👥 **a!profil** : Ppnizi Görürsünüz Veya Birini Etiketleyerek O Kişinin Ppsini Görürsünüz.
👥 **a!avatar** : Avatarınıza Bakarsınız.
👥 **a!say** : Sunucudaki Üye Sayısını Gösterir.
👥 **a!afk** : AFK Olma Komutudur.
👥 **a!yetkilerim** : Sunucudaki Yetkinize Bakarsınız.
👥 **a!ping** : Botun Pingine Bakarsınız.
👥 **a!i** : Botun İstatistiklerine Bakarsınız.
👥 **a!bug-bildir** : Botun Bugunu Bildirirsiniz.
👥 **a!davet** : Botu Davet Edersiniz.
👥 **a!rank** : Seviye Bilginizi Gösterir Veya Etiketlediğiniz Kişinin Seviyesini Gösterir.`)
.addField("**» Davet Linki**", " [Botu Davet](https://discord.com/oauth2/authorize?client_id=826508857463275542&scope=bot&permissions=2147483647)", )
    .setImage("https://cdn.discordapp.com/attachments/813881349004984370/827103972581048340/standard_1.gif")
.setFooter(`${message.author.tag} Tarafından İstendi.`, message.author.avatarURL())
.setThumbnail(client.user.avatarURL())
 message.channel.send(yardım) 
  };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kullanıcı'],
  permLevel: 0
};

exports.help = {
  name: "kullanıcı",
  category: "kullanıcı",
    description: "Eğlence Komutları Gösterir."
};