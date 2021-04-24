const Discord = require("discord.js");
exports.run = async (client, message, args) => {
  let prefix = "a!";
  let yardım = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .addField(
      "Adem Reyzz Eğlence Menüsü",
      `
✨ **a!fbi** : FBİ Gelir.
✨ **a!token** : Botun Tokenini Görürsünüz.
✨ **a!atam** : Dene ve Gör Reis.
✨ **a!vine** : Komik Paylaşımlar.
✨ **a!kasaaç**: Csgo Kasası Açar.
✨ **a!sor**: Bota Soru Sorduğunuzda Cevap Verir.
✨ **a!yaş-hesapla**: Yaşınızı Hesaplar.
✨ **a!zar-at**: Zar Atarsınız.
✨ **a!kutuaç**: Brawl Starsda Kutu Açarsınız(Uyarı Bu Oyun Amacçlı Yapılmıştır.)
✨ **a!cihaz**: Etiket Attığınız Kişilerin Discorda Hangi Cihazla Giriş Yaptıklarını Gösterir.
✨ **a!güzelsözler**: Size Karşı Güzel Sözler Söyler.
✨ **a!sayı-tahmin**: Ragele Bir Sayı Tutar Ve Sizde Bulmaya Çalışırsınız.
✨ **a!söyle**: Yazdığınız Şeyi Sesli Olarak Söyler.
✨ **a!g-çeviri**: Yazdığınız Kelimeyi Çeviri.
✨ **a!balıktut**: Balık Köpeğisi Tutarsınız.
✨ **a!öp [etiket]**: Etiketlediğiniz Kişiyi Öpersiniz.
✨ **a!trump**: Trumpa Mesaj Gönderirsiniz.
✨ **a!espri**: Size Espri Söyler.
✨ **a!yumruk-at**: Etiketlediğiniz Kişiye Yumruk Atar.
✨ **a!hava-durumu**: Yazdığınız şehirin hava durumunu atar.
✨ **a!atatürk-sözü**: Rasgele Atatürk Sözü Atar.
✨ **a!atasözü**: Rasgele Atasözü Atar.`)

    .addField(
      "**» Davet Linki**",
      " [Botu Davet Et](https://discord.com/oauth2/authorize?client_id=826508857463275542&scope=bot&permissions=2147483647)"
    )
    .setImage(
      "https://cdn.discordapp.com/attachments/813881349004984370/827103972581048340/standard_1.gif"
    )
    .setFooter(
      `${message.author.tag} Tarafından İstendi.`,
      message.author.avatarURL()
    )
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
  description: "Eğlence Komutları Gösterir."
};
