const Discord = require('discord.js');
exports.run = (client, message, args) => {
  if (message.author.id != "564837933912293386") return message.reply('Bunu Sadece DEVTR Sahibi Kullanabilir');
     
  if (!message.guild) {
  const ozelmesajuyari = new Discord.RichEmbed()
  .setColor(0xFF0000)
  .setTimestamp()
  .setAuthor(message.author.username, message.author.avatarURL)
  .addField('⚠ Uyarı ⚠', 'Bu  komutu özel mesajlarda kullanamazsın.');
  return message.author.sendEmbed(ozelmesajuyari); }
  let guild = message.guild;
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  if (reason.length < 1) return message.reply('Ne göndereceğimi yazmadan ne göndermemi bekliyorsun Adem Reyzz Youtube Kanalına Abone Olmamı felan mı ?.');
  if (message.mentions.users.size < 1) return message.reply('Kime Mesaj atmadan yazmadan ne göndermemi bekliyorsun Adem Reyzz Youtube Kanalına Abone Olmamı felan mı ?').catch(console.error);
  message.delete();
  message.reply('Mesajını Gönderdim. Adem Reyzz Youtube Kanalınada abone oldum ♥')
  var embed = new Discord.MessageEmbed()
  .setDescription(reason)
  return user.send(embed);
};//DevTR
 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['dm'],
  permlevel: 4
};
 
exports.help = {
  name: 'mesajat',
  description: 'Bir kullanıcıya özelden mesaj gönderir.',
  usage: 'mesajat'
};