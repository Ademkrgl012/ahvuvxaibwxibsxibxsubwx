const Discord = require ("discord.js");

exports.run = (client, message) => {
    if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .addField('**Komutları Özel Mesajlarda Kullanılamaz!**')
    return message.author.send(ozelmesajuyari); }
const ADEMREYZZEMBED = new Discord.MessageEmbed()

.setColor("BLACK")
.setTitle("**  » Adem Reyzz**")
.setThumbnail("https://cdn.discordapp.com/attachments/813881660717793331/828047155981320232/standard.gif")
.setImage("https://cdn.discordapp.com/attachments/813881349004984370/826793395677691924/350kb_1.gif")
.setDescription(`
**» Bağlantılar** 
**[Destek Sunucusu](https://discord.gg/uruvQjX47v)** **•** **[Botun Davet Linki](https://discord.com/oauth2/authorize?client_id=826508857463275542&scope=bot&permissions=2147483647)** **•**
Bir komut hakkında detaylı __yardım için__: 
**a!yardım**`)

.addField('**• Komutlar**',' Botun Tüm Komutları Aşağıda Bulunmaktadır.')
.addField('> m!moderasyon ',' 🔰 Moderasyon komutları')
.addField('> m!kullanıcı ',' 👥 Kullanıcı komutları')
.addField('> m!abone-yardım ',' 🔔 Ayarlamalı Abone Rol Sistemi')
.addField('> m!eğlence','  ✨ Eğlence Komutları')
return message.channel.send(ADEMREYZZEMBED)
.then; 

};
exports.conf = {
    enabled: true, 
    guildOnly: false, 
    aliases: ["yardım","help"], 
    permLevel: 0 
};
  
  exports.help = {
    name: 'yardım', 
    description: 'Botun Komut Listesini Gösterir!',
    usage: 'm!eğlence'
};