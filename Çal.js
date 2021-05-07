const play = require('discordjs-ytdl')
const { MessageEmbed } = require('discord.js')
  kod: "çal",
  exports.run = async(client, message, args) => {
    if (message.member.voice.channel){
      const embed = new MessageEmbed()
      .setTitle('Şarkı Bulundu')
      .setColor('RANDOM')
      .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
      const connection = await message.member.voice.channel.join()
      play.play(connection, args.join(" "), 'AIzaSyADEGjdpN0qGUp855hODYZrjlMvEg4JZT4')
      let title = play.title(args.join(" "), 'AIzaSyADEGjdpN0qGUp855hODYZrjlMvEg4JZT4')
title.then(titlee => embed.addField('Video Başlığı: ', titlee))
let kanal = play.channel(args.join(" "), 'AIzaSyADEGjdpN0qGUp855hODYZrjlMvEg4JZT4')
kanal.then(titlee => embed.addField('Kanal Adı: ', titlee))
let id = play.id(args.join(" "), 'AIzaSyADEGjdpN0qGUp855hODYZrjlMvEg4JZT4')
id.then(titlee => embed.addField('Video Idsi: ', titlee))
setTimeout(function () {
  message.channel.send(embed)
}, 2500);
      } else {
        message.reply('Bir Kanala Katılmaısın')
        }
    }
  