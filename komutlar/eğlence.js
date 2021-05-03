const Discord = require("discord.js");
exports.run = async (client, message, args) => {
  let prefix = "m!";
  let yardım = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .addField("MUTOT Moderasyon Menüsü",`
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
✨ **m!yumruk-at**: Etiketlediğiniz Kişiye Yumruk Atar.`)
    .addField("**» Davet Linki**", " [Botu Davet Et](https://discord.com/oauth2/authorize?client_id=826508857463275542&scope=bot&permissions=2147483647)", )
    .setImage("https://cdn.discordapp.com/attachments/838139251862011956/838740310858268702/standard_1.gif")
    .setFooter(`Sayfa 2 m!eğlence2`)
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
  category: "",
  description: "Eğlence Komutları Gösterir."
};