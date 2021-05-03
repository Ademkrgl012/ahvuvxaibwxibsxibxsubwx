const Discord = require('discord.js');
const db = require('quick.db');

exports.run = (client, message, params, args) => {
     if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Kayıt kanalı ayarlamak için `Yönetici` yetkisine sahip olman gerek.')
     let logkanali = message.mentions.channels.first();
     if (!logkanali) return message.channel.send(':no_entry: Kayıt kanalı ayarlamak için bir kanal etiketlemeniz gerekli. `m!kayıtkanalı #kanal`')
     db.set(`membermodChannel_${message.guild.id}`, message.mentions.channels.first().id).then(i => {
        message.channel.send(`${process.env.basarili} Kayıt kanalı, <#${i}> olarak ayarlandı.`)   
    })         
};

exports.conf = {
enabled: true,
guildOnly: false,
aliases: [],
permLevel: 0
};

exports.help = {
name: 'log-ayarla',
description: 'neblm',
usage: 'log-ayarla'
};