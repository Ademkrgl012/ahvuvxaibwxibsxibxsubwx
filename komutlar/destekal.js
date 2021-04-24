const Discord = require('discord.js');
const client = new Discord.Client();
var ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {
  const codare = args.slice(0).join(' ');
  if (codare.length < 1) return message.channel.send('`Talep Açma Sebebinizi Belirtiniz.`')
    message.channel.send('`Destek Talebi Başarıyla Gönderildi,Yetkililerin Size Ulaşmasını BekLeyiniz.`');


    var Hook = new Discord.WebhookClient("ID", "WEBHOOK TOKEN")

    let embed = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setThumbnail(message.author.avatarURL())
    .setTitle(`Destek Talebi!`)
    .setDescription(`
      **Talep Eden: **`+message.author.tag+`
      **Talep Sebebi: **\``+codare+`\`
      `)
    .setFooter(`Destek`)
    .setTimestamp()
    Hook.send(embed)

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['destekal'],
    permLevel: 0,  
  };
  
  exports.help = {
    name: 'destek-al',
    description: 'Talebinizi belirterek destek alabilirsiniz.',
    usage: 'destek-al ',
   
  };