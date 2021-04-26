const Discord = require("discord.js");
exports.run = async (client, message, args) => {
  let prefix = "a!";
  let yardım = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .addField("Adem Reyzz Moderasyon Menüsü",`
🔰 **a!reklam** : Reklam Engeli Açarsınız.
🔰 **a!küfür** : Küfür Engeli Açarsınız.
🔰 **a!otorol** : Otorol Ayarlarsınız.
🔰 **a!sayaç** : Sayaç Rakamını Seçersiniz.
🔰 **a!sayaç-kanal-ayarla** : Sayaç Kanalını Seçer.
🔰 **a!mod-log** : Mod-Log Kanalı Seçersiniz.
🔰 **a!yavaş-mod** : Yavaş Mod Ayarlarsınız.
🔰 **a!sa-as** : Sa-As Mesajını Açar..
🔰 **a!sil** : Belli Miktarda Mesaj Siler.
🔰 **a!oylama** : Oylama Yaparsınız.
🔰 **a!ban** : Etiketlediğin Kişiye Ban Atar.
🔰 **a!unban** : Banlanan Kişinin Banını Açar
🔰 **a!sunucu-kur**: Basit Bir Sunucu Kurar.
🔰 **a!gç-ayarla <gç kanalı>**: Giriş Çıkış Kanalını Ayarlar
🔰 **a!giriş-çıkış-kapat**: Giriş Çıkış'ı Kapatır.
🔰 **a!komutlar**: Bottaki Komut Sayısını Gösterir.
🔰 **a!otocevap**: Yazdığınız Cümleyi Cevaplamayı Açarsanız O Cümleye Cevap Verir.
🔰 **a!mesajat**: Etiketlediğiniz Kişiye Mesaj Atar.
🔰 **a!panel**: Sunucu panelini gösterir.
🔰 **a!çekiliş**: Çekiliş Yapar.`)
  .addField("**» Davet Linki**", " [Botu Davet Et](https://discord.com/oauth2/authorize?client_id=826508857463275542&scope=bot&permissions=2147483647)", )
    .setImage("https://cdn.discordapp.com/attachments/813881349004984370/827103972581048340/standard_1.gif")
    .setFooter(`${message.author.tag} Tarafından İstendi.`,message.author.avatarURL())
    .setThumbnail(client.user.avatarURL());
  message.channel.send(yardım);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["moderasyon"],
  permLevel: 0
};

exports.help = {
  name: "moderasyon",
  category: "moderasyon",
  description: "Eğlence Komutları Gösterir."
};
