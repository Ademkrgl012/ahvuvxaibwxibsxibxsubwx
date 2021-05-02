const db = require('quick.db');
const Discord = require('discord.js')

exports.run = (client, message, args, func) => {
  
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  
    if(!args[0]) return message.channel.send("Doğru kullanım `a!küfür aç/kapat`")
      if(args[0] === "aç"){
    var anahtar = db.fetch(`kufur_${message.guild.id}`)
    if(anahtar === "acik") return message.channel.send("Zaten açık!!")
    db.set(`kufur_${message.guild.id}`, 'acik')
    message.channel.send(`Küfür engel sistemi açıldı !!`)
   }
    if(args[0] === "kapat") {
      var anahtar = db.fetch(`kufur_${message.guild.id}`)
      if(!anahtar) return message.channel.send("Zaten kapalıymış.")
      db.delete(`kufur_${message.guild.id}`)
      message.channel.send("Başarıyla kapatıldı")
          
     
    }
     ///fiber botlist &amp; code
 
  
  
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
};
  
  exports.help = {
    name: 'küfür',
    description: 'FİBER BOTLİST &amp; CODE',
    usage: 'küfür'
};