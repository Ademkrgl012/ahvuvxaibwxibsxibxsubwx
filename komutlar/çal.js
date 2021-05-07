const play = require('discordjs-ytdl')
const { MessageEmbed } = require('discord.js')
  exports.run = async(client, message, args) => {
    if (message.member.voice.channel){
      const embed = new MessageEmbed()
      .setTitle('Şarkı Bulundu')
      .setColor('RANDOM')
      .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
      const connection = await message.member.voice.channel.join()
      play.play(connection, args.join(" "), 'AIzaSyDRvGKGjL8b-lAiSkFmv3azTchsEcrOK5w')
      let title = play.title(args.join(" "), 'AIzaSyDRvGKGjL8b-lAiSkFmv3azTchsEcrOK5w')
title.then(titlee => embed.addField('Video Başlığı: ', titlee))
let kanal = play.channel(args.join(" "), 'AIzaSyDRvGKGjL8b-lAiSkFmv3azTchsEcrOK5w')
kanal.then(titlee => embed.addField('Kanal Adı: ', titlee))
let id = play.id(args.join(" "), 'AIzaSyDRvGKGjL8b-lAiSkFmv3azTchsEcrOK5w')
id.then(titlee => embed.addField('Video Idsi: ', titlee))
setTimeout(function () {
  message.channel.send(embed)
}, 2500);
      } else {
        message.reply('Bir Kanala Katılmaısın')
        }
    };
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
  };
exports.help = {
  name: 'çal'
  };
  