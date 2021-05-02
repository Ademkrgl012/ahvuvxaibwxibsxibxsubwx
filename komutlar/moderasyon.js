const Discord = require("discord.js");
exports.run = async (client, message, args) => {
  let prefix = "m!";
  let yardım = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .addField("Adem Reyzz Moderasyon Menüsü",`
🔰 **m!reklam** : Reklam Engeli Açarsınız.
🔰 **m!küfür** : Küfür Engeli Açarsınız.
🔰 **m!otorol** : Otorol Ayarlarsınız.
🔰 **m!sayaç** : Sayaç Rakamını Seçersiniz.
🔰 **m!sayaç-kanal-ayarla** : Sayaç Kanalını Seçer.
🔰 **m!mod-log** : Mod-Log Kanalı Seçersiniz.
🔰 **m!yavaş-mod** : Yavaş Mod Ayarlarsınız.
🔰 **m!sa-as** : Sa-As Mesajını Açar..
🔰 **m!sil** : Belli Miktarda Mesaj Siler.
🔰 **m!oylama** : Oylama Yaparsınız.
🔰 **m!ban** : Etiketlediğin Kişiye Ban Atar.
🔰 **m!unban** : Banlanan Kişinin Banını Açar
🔰 **m!sunucu-kur**: Basit Bir Sunucu Kurar.
🔰 **m!gç-ayarla <gç kanalı>**: Giriş Çıkış Kanalını Ayarlar
🔰 **m!giriş-çıkış-kapat**: Giriş Çıkış'ı Kapatır.
🔰 **m!komutlar**: Bottaki Komut Sayısını Gösterir.
🔰 **m!otocevap**: Yazdığınız Cümleyi Cevaplamayı Açarsanız O Cümleye Cevap Verir.
🔰 **m!mesajat**: Etiketlediğiniz Kişiye Mesaj Atar.
🔰 **m!panel**: Sunucu panelini gösterir.
🔰 **m!çekiliş**: Çekiliş Yapar.`)
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
