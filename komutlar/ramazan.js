const Discord = require("discord.js");
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
