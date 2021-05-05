const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require('quick.db')
exports.run = function(client, message, args) {
let botID = args[0];
  let prefix = args[1];
  let basvuru = ayarlar.basvurulog;
  let eklekanal = ayarlar.kanal;
  let log = ayarlar.log;
  let uye = message.author
  let sıra = db.fetch(`sıra_${message.guild.id}`)
  let emb = new Discord.MessageEmbed()
  .setDescription(`Sadece 1 bot ekleyebilirsin.
You can add only one bot.`)
//if(db.has(`botsayi_${message.author.id}`)) return message.author.send(emb)
  if (message.channel.id !== eklekanal)
    return message.channel
      .send(`Bu komutu sadece <#${eklekanal}> kanalında kullanabilirsin.`)
      .then(msg => msg.delete({timeout : '3000'}));
  if (message.channel.id == eklekanal) {
if(!botID) return message.channel.send(`Lütfen eksik kısımları doldurun.\n**Doğru Kullanım**; \`\`${ayarlar.prefix}botekle <bot-id> <bot-prefix>\`\``).then(a => a.delete(5000))
if(!prefix) return message.channel.send(`Lütfen eksik kısımları doldurun.\n**Doğru Kullanım**; \`\`${ayarlar.prefix}botekle <bot-id> <bot-prefix>\`\``).then(a => a.delete(5000))


   
        let embed2 = new Discord.MessageEmbed()
    .setColor('#fff76b')
    .setDescription(`
    **🤖 Bir bot başvurusu gönderildi**
    **・** ${message.author} **adlı kullanıcının botu** [<@!${botID}>] **sıraya eklendi**
    
    🤷‍♂️ **Sahip Bilgi |${message.author} \`[ ${message.author.id} ]\`**
   ₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋
   **🎓 Bot Bilgi | <@!${botID}> \`[${botID}]\`**
   **🙌 Bot Öneki | \`[ ${prefix} ]\`**
    
  **[0 Perm Ekle](https://discordapp.com/oauth2/authorize?client_id=${botID}&scope=bot&permissions=0) | ` + ` [8 Perm Ekle](https://discordapp.com/oauth2/authorize?client_id=${botID}&scope=bot&permissions=8)**`)
    
    client.channels.cache.get(log).send(embed2)
     let emba = new Discord.MessageEmbed()
     .setColor('#fff76b')
    .setDescription(`
    **Botunuz başarıyla sıraya eklendi,en yakın zamanda test edilecektir** 
    `)
    message.author.send(emba)
    db.set(`sahip_${message.author.id}`, botID)
    db.add(`sıra_${message.guild.id}`,1)
    db.add(`botsayi_${message.author.id}`,1)

  }
    


     

  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ekle"],
  permLevel: 0
};

exports.help = {
  name: "botekle",
  description: "Sunucuya bot eklemenizi sağlar.",
  usage: "botekle <botid> <prefix>"
};