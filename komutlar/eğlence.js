const Discord = require("discord.js");

let botid = ("")



exports.run = (client, message, args) => {
  const cmf = new Discord.RichmEmbed()
  .setColor("RANDOM")
  .setAuthor(`${client.user.username} Eğlence Komtları`)
  .addField(`
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
✨ **a!atasözü**: Rasgele Atasözü Atar.
✨ **a!sarıl [etiket]**: Etiketlediğin Kişiye Sarılır.
✨ **a!boğazla [etiket]**: Etiketlediğin Kişiyi Boğazlar.`)
  .addField(`