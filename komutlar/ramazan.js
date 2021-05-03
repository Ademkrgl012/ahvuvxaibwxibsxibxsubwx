const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    if (!message.guild) return message.author.send('Bu Komutu Sadece Sunucularda Kulanabilirsiniz!');

 
    const say = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayColor)
    .setTitle(message.guild.name)
        .addField("🌐 Sunucudaki üye sayısı", message.guild.memberCount)
        .addField("🟢 Çevrimiçi üye sayısı", message.guild.members.cache.filter(m => m.user.presence.status !== "offline").size)
        .addField("🔘 Çevrimdışı üye sayısı", message.guild.members.cache.filter(m => m.user.presence.status == "offline").size)
        .addField("🤖 Sunucudaki Bot Sayısı", message.guild.members.cache.filter(m => m.user.bot).size)
        .addField(`🍭 **__Boost Sayısı__**`,`»  **${message.guild.premiumSubscriptionCount}**`)

    message.channel.send(say);

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['say'],
    permLevel: 0
};

exports.help = {
    name: 'gelişmiş-say',
    description: 'Say',
 }const Discord = require("discord.js");
var http = require("https");
const {
    JsonDatabase
} = require("wio.db");

const db = new JsonDatabase("myDatabase");

exports.run = async (client, message, args) => {
        var yazi = args[0];
        if (!yazi) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setTitle("Bir şehir girin."));
        var yazi = yazi.toUpperCase()
        var options = {
          "method": "GET",
          "hostname": "api.collectapi.com",
          "port": null,
          "path": "/pray/all?data.city=" + yazi.toUpperCase(),
          "headers": {
            "content-type": "application/json",
            "authorization": "apikey 0uQpICpHMdPOYdvARiwaSO:3LJFjzgGx7BC1qnJzUfmN5"
          }
        };
    
        try {
    
          var req = http.request(options, function(res) {
            var chunks = [];
    
            res.on("data", function(chunk) {
              chunks.push(chunk);
            });
    
            res.on("end", function() {
              var body = Buffer.concat(chunks);
              let json = JSON.parse(body);
message.channel.send(new Discord.MessageEmbed()
.setDescription(`${yazi}\nSahur: ${json.result[0].saat}\nİftar: ${json.result[4].saat}`)
.setColor('RED')
.setFooter(`Adem Reyzz Bot Hayırlı Ramazanlar Diler.`)
              );
              });
              });
              }catch(err){
              return message.channel.send(`Yanlış şehir ismi girdiniz.`);
        }
    
        req.end();
    
    
    
      } 

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: "vakit"
};
