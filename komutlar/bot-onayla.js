const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require('quick.db')
exports.run = function(client, message, args) {
  let yetkiliROL = ayarlar.yetkiliROL;
  let hata1 = new Discord.MessageEmbed()
  .setDescription(`
   ・ **Hata 01**
   
   \`Bu komutu sadece\` <@&${yetkiliROL}> \`rolüne sahip olanlar kullanabilir.\`
`)
    let hata2 = new Discord.MessageEmbed()
  .setDescription(`
   ・ **Hata 02**
   
   \`Onaylanacak Botun sahibinin idsini gir.\`
`)
       let hata3 = new Discord.MessageEmbed()
  .setDescription(`
   ・ **Hata 03**
   
   \`Onaylanacak Botun idsini gir\`
`)
            let hata4 = new Discord.MessageEmbed()
  .setDescription(`
   ・ **Hata 04**
   
   \`Onaylayacağın Botun prefixini gir\`
`)
 
  let yetkili = message.author;
  let sahip = message.guild.members.cache.get(args[0]);
  let botisim = message.guild.members.cache.get(args[1]);
  let prefix = args[2];
  let onaylog = ayarlar.onayLOG
  let log = ayarlar.log;
  let rol = ayarlar.developerROL;
  let b = ayarlar.botROL;
  
  if(!message.member.roles.cache.has(yetkiliROL)) return message.channel.send(hata1);
  if(!sahip) return message.channel.send(hata2);
  if(!botisim) return message.channel.send(hata3);
  if(!prefix) return message.channel.send(hata4);
  message.delete() 
  sahip.roles.add(rol)
  
    botisim.roles.add(b)
 
  
  let embedd = new Discord.MessageEmbed()
  .setColor('#71ea00')
  .setDescription(`
    :flag_tr:  » **Tebrikler, ${botisim} adlı botun başarıyla onaylandı.** 
  :england:  » **Congratulations, your bot ${botisim} has been successfully approved.** 
    ₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋
  `)
  .setFooter('» Onaylandığı Zaman ')
  .setTimestamp()
  sahip.send(embedd);
  let embed2 = new Discord.MessageEmbed()
    .setColor("#71ea00")
    .setDescription(`
       🤖 **Bir bot onaylandı**
      
       👨‍🔧 **Sahip Bilgisi | [${sahip}] \`[ ${args[0]} ]\`**
        ₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋
      ** 🕵️‍♀️ Bot Bilgisi | [${botisim}] \`[ ${args[1]} ]\`**
      ** 👮‍♂️  Bot Prefix |\`[ ${prefix} ]\`**
    `)
  
  client.channels.cache.get(onaylog).send(embed2)
  db.add(`sıra_${message.guild.id}`,-1)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["onay", "onayla"],
  permLevel: 0
};

exports.help = {
  name: "botonayla",
  description: "Sunucuya eklenen botu onaylar.",
  usage: "botonayla <bot ismi>"
};