const Discord = require('discord.js');
exports.run = async (client, message, args) => { 
let prefix = 'm!'
let yardım = new Discord.MessageEmbed()  
.setColor('RANDOM')
.addField('MUTOT Kullanıcı Menüsü',`
👥 **m!profil** : Ppnizi Görürsünüz Veya Birini Etiketleyerek O Kişinin Ppsini Görürsünüz.
👥 **m!avatar** : Avatarınıza Bakarsınız.
👥 **m!say** : Sunucudaki Üye Sayısını Gösterir.
👥 **m!afk** : AFK Olma Komutudur.
👥 **m!yetkilerim** : Sunucudaki Yetkinize Bakarsınız.
👥 **m!ping** : Botun Pingine Bakarsınız.
👥 **m!i** : Botun İstatistiklerine Bakarsınız.
👥 **m!bug-bildir** : Botun Bugunu Bildirirsiniz.
👥 **m!davet** : Botu Davet Edersiniz.
👥 **m!rank** : Seviye Bilginizi Gösterir Veya Etiketlediğiniz Kişinin Seviyesini Gösterir.
👥 **m!instagram**: İstediğiniz Kullanıcının İnstagram Profilini Görürsünüz`)
.addField("**» Davet Linki**", " [Botu Davet](https://discord.com/oauth2/authorize?client_id=826508857463275542&scope=bot&permissions=2147483647)", )
    .setImage("https://cdn.discordapp.com/attachments/838139251862011956/838740310858268702/standard_1.gif")
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