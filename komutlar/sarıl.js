const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, args) => {

    let kullanıcı = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!args[0]) return message.reply("lütfen bir kullanıcı etiketleyin!")
    if (kullanıcı.id === message.author.id) return message.reply("kendine mi sarılacaksın?")
    if (kullanıcı.id === client.user.id) return message.reply("bana mı yürüyorsun la?")

    if (!message.guild) {
    const nodm = new Discord.MessageEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('**Eğlence Komutları Özel Mesajlarda Kullanılamaz!**')
    return message.author.send(nodm); }
    if (message.channel.type !== 'dm') {
      const saril = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag} isimli kullanıcı ${kullanıcı.user.tag} isimli kullanıcıya sarıldı.`)
    .setColor(3447003)
    .setTimestamp()
    .setDescription('')
        .setImage(`https://thumbs.gfycat.com/LankyFewCoelacanth-size_restricted.gif`)
    return message.channel.send(saril);
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'sarıl'
};
