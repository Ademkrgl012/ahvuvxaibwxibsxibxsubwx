const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (client, message, args) => { 
    
        const voicechannel = message.member.voice.channel;
        if (!voicechannel) return message.channel.send(new Discord.MessageEmbed().setColor('#00fff8').setDescription(`${message.author} öncelikle sesli bir kanala girmen gerekiyor.`))
        let kullanici = message.mentions.users.first() || message.author
        const connection = await message.member.voice.channel.join()
        message.channel.send(new Discord.MessageEmbed().setColor('#00fff8').setDescription(`${message.author} ses kayıt işlemi başladı.`))
        const receiver = connection.receiver.createStream(kullanici, {
          mode: "pcm",
          end: "silence"   
        });
        const writer = receiver.pipe(fs.createWriteStream(`./ardademr-${message.author.id}.pcm`));

        writer.on("finish", () => {
            message.member.voice.channel.leave();
            message.channel.send(new Discord.MessageEmbed().setColor('#00fff8').setDescription(` ${message.author} ses kayıt işlemi sonlandırıldı.`))
        });
      } 

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: "başlat"
};
