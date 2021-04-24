const Discord = require('discord.js')

let sozler = [ 'İnsan sevgiye hükmeder; ama aşk insana hükmeder. - **İskender Pala**' , 'Bir kadın söyleyeceği çok şey olduğu halde susuyorsa, erkek artık tüm şansını kaybetmiştir. - **Pablo Neruda**' , 'Gitsem kalmalar saldırıyor, kalsam gitmeler çağırıyor! - **Kahraman Tazeoğlu**' , 'Mutluluğum belki de şundan ileri geliyor: Bende olanlara seviniyor, olmayanların üzerine de düşmüyorum. - **Lev Nikolayeviç Tolstoy**']; //İstediğiniz Kadar Arttırabilirsiniz-

exports.run = function (client, message, args) {
  message.channel.send(
    new Discord.RichEmbed()
    .setColor("GREY")
    .setTitle("Güzel Bir Söz!")
    .setDescription(sozler[Math.floor(Math.random() * sozler.length)])
    )
  }

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['güzelsözler'],
  permLevel: 0
};
exports.help = {
  name: 'güzelsözler',
  description: 'Guzel Söz Paylaşır!',
  usage: 'güzelsözler'
}
