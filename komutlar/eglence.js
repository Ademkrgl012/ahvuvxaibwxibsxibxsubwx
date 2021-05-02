const Discord = require('discord.js');
exports.run = async (client, message, args) => { 
let prefix = 'm!'
let yardım = new Discord.MessageEmbed(yardım)  
.setColor('RANDOM')
.addTitle('Adem Reyzz Eğlence Menüsü')
.addField('✨ **m!fbi** : FBİ Gelir.')
.addField('✨ **m!token** : Botun Tokenini Görürsünüz.')
.addField('✨ **m!atam** : Dene ve Gör Reis.')
.addField('✨ **m!vine** : Komik Paylaşımlar.')
.addField('✨ **m!kasaaç**: Csgo Kasası Açar.')
.addField('✨ **m!sor**: Bota Soru Sorduğunuzda Cevap Verir.')
.addField('✨ **m!yaş-hesapla**: Yaşınızı Hesaplar.')
.addField('✨ **m!zar-at**: Zar Atarsınız.')
.addField('✨ **m!kutuaç**: Brawl Starsda Kutu Açarsınız(Uyarı Bu Oyun Amacçlı Yapılmıştır.)')
.addField('✨ **m!cihaz**: Etiket Attığınız Kişilerin Discorda Hangi Cihazla Giriş Yaptıklarını Gösterir.')
.addField('✨ **m!güzelsözler**: Size Karşı Güzel Sözler Söyler.')
.adsField('✨ **m!sayı-tahmin**: Ragele Bir Sayı Tutar Ve Sizde Bulmaya Çalışırsınız.')
.addField('✨ **m!söyle**: Yazdığınız Şeyi Sesli Olarak Söyler.')
.addField('✨ **m!g-çeviri**: Yazdığınız Kelimeyi Çeviri.')
.addField('✨ **m!balıktut**: Balık Köpeğisi Tutarsınız.')
.addField('✨ **m!öp [etiket]**: Etiketlediğiniz Kişiyi Öpersiniz.')
.addField('✨ **m!trump**: Trumpa Mesaj Gönderirsiniz.')
.addField('✨ **m!espri**: Size Espri Söyler.')
.addField('✨ **m!yumruk-at**: Etiketlediğiniz Kişiye Yumruk Atar.')
.addField('✨ **m!hava-durumu**: Yazdığınız şehirin hava durumunu atar.')
.addField('✨ **m!atatürk-sözü**: Rasgele Atatürk Sözü Atar.')
.addField('✨ **m!atasözü**: Rasgele Atasözü Atar.')
.addField('✨ **m!sarıl [etiket]**: Etiketlediğin Kişiye Sarılır.')
.addField('✨ **!boğazla [etiket]**: Etiketlediğin Kişiyi Boğazlar.')
    .addField("**» Davet Linki**"," [Botu Davet Et](https://discord.com/oauth2/authorize?client_id=826508857463275542&scope=bot&permissions=2147483647)")
    .setImage("https://cdn.discordapp.com/attachments/813881349004984370/827103972581048340/standard_1.gif")
    .setFooter(`${message.author.tag} Tarafından İstendi.`,message.author.avatarURL())
    .setThumbnail(client.user.avatarURL());
  message.channel.send(yardım);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["eğlence"],
  permLevel: 0
};

exports.help = {
  name: "eğlence",
  category: "eğlence",
  description: ""
};