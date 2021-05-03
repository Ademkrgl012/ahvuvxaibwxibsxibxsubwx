const Discord = require('discord.js');
exports.run = async (client, message, args) => { 
let prefix = 'm!'
let yardım = new Discord.MessageEmbed(yardım)  
.setColor('RANDOM')
.addField("Adem Reyzz Eğlence Menüsü",`
✨ **m!fbi** : FBİ Gelir.
✨ **m!token** : Botun Tokenini Görürsünüz.
✨ **m!atam** : Dene ve Gör Reis.
✨ **m!vine** : Komik Paylaşımlar.
✨ **m!kasaaç**: Csgo Kasası Açar.
✨ **m!sor**: Bota Soru Sorduğunuzda Cevap Verir.
✨ **m!yaş-hesapla**: Yaşınızı Hesaplar.
✨ **m!zar-at**: Zar Atarsınız.
✨ **m!kutuaç**: Brawl Starsda Kutu Açarsınız(Uyarı Bu Oyun Amacçlı Yapılmıştır.)
✨ **m!cihaz**: Etiket Attığınız Kişilerin Discorda Hangi Cihazla Giriş Yaptıklarını Gösterir.
✨ **m!güzelsözler**: Size Karşı Güzel Sözler Söyler.
✨ **m!sayı-tahmin**: Ragele Bir Sayı Tutar Ve Sizde Bulmaya Çalışırsınız.
✨ **m!söyle**: Yazdığınız Şeyi Sesli Olarak Söyler.
✨ **m!g-çeviri**: Yazdığınız Kelimeyi Çeviri.
✨ **m!balıktut**: Balık Köpeğisi Tutarsınız.
✨ **m!öp [etiket]**: Etiketlediğiniz Kişiyi Öpersiniz.
✨ **m!trump**: Trumpa Mesaj Gönderirsiniz.
✨ **m!espri**: Size Espri Söyler.
✨ **m!yumruk-at**: Etiketlediğiniz Kişiye Yumruk Atar.
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
  aliases: ["eğlence"],
  permLevel: 0
};

exports.help = {
  name: "eğlence",
  category: "eğlence",
  description: ""
};