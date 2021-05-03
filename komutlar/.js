const Discord = require("discord.js");
exports.run = async (client, message, args) => {
  let prefix = "m!";
  let yardım = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .addField("Adem Reyzz  Menüsü",`
    .setColor('RANDOM')
.addField('✨ **a!fbi** : FBİ Gelir.
.addField('✨ **a!token** : Botun Tokenini Görürsünüz.')
.addField('✨ **a!atam** : Dene ve Gör Reis.')
.addField('✨ **a!vine** : Komik Paylaşımlar.')
.addField('✨ **a!kasaaç**: Csgo Kasası Açar.')
.addField('✨ **a!sor**: Bota Soru Sorduğunuzda Cevap Verir.')
.addField('✨ **a!yaş-hesapla**: Yaşınızı Hesaplar.')
.addField('✨ **a!zar-at**: Zar Atarsınız.')
.addField('✨ **a!kutuaç**: Brawl Starsda Kutu Açarsınız(Uyarı Bu Oyun Amacçlı Yapılmıştır.)')
.addField('✨ **a!cihaz**: Etiket Attığınız Kişilerin Discorda Hangi Cihazla Giriş Yaptıklarını Gösterir.')
.addField('✨ **a!güzelsözler**: Size Karşı Güzel Sözler Söyler.')
.adsField('✨ **a!sayı-tahmin**: Ragele Bir Sayı Tutar Ve Sizde Bulmaya Çalışırsınız.')
.addField('✨ **a!söyle**: Yazdığınız Şeyi Sesli Olarak Söyler.')
.addField('✨ **a!g-çeviri**: Yazdığınız Kelimeyi Çeviri.')
.addField('✨ **a!balıktut**: Balık Köpeğisi Tutarsınız.')
.addField('✨ **a!öp [etiket]**: Etiketlediğiniz Kişiyi Öpersiniz.')
.addField('✨ **a!trump**: Trumpa Mesaj Gönderirsiniz.')
.addField('✨ **a!espri**: Size Espri Söyler.')
.addField('✨**a!yumruk-at**: Etiketlediğiniz Kişiye Yumruk Atar.')
.addField('✨ **a!hava-durumu**: Yazdığınız şehirin hava durumunu atar.')
.addField('✨ **a!atatürk-sözü**: Rasgele Atatürk Sözü Atar.')
.addField('✨ **a!atasözü**: Rasgele Atasözü Atar.')
.addField('✨ **a!sarıl [etiket]**: Etiketlediğin Kişiye Sarılır.')
.addField('✨ **a!boğazla [etiket]**: Etiketlediğin Kişiyi Boğazlar.
sayaç** : Sayaç Rakamını Seçersiniz.
🔰   .addField("**» Davet Linki**", " [Botu Davet Et](https://discord.com/oauth2/authorize?client_id=826508857463275542&scope=bot&permissions=2147483647)", )
    .setImage("https://cdn.discordapp.com/attachments/813881349004984370/827103972581048340/standard_1.gif")
    .setFooter(`${message.author.tag} Tarafından İstendi.`,message.author.avatarURL())
    .setThumbnail(client.user.avatarURL());
  message.channel.send(yardım);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [""],
  permLevel: 0
};

exports.help = {
  name: "eğlence",
  category: "eğlence",
  description: "Eğlence Komutları Gösterir."
};