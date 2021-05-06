const Discord = require('discord.js');
const moment = require('moment');
const chalk = require('chalk');
const { prefix } = require('../ayarlar.json')

module.exports = client => {

console.log("Bot Hazır");

var randomMesajlar = [

    "m!yardım",
    "m!vakit",
    "m!korona",
    "Youtube: Adem Reyzz"
  ]



setInterval(function() {
    var randomMesajlar1 = randomMesajlar[Math.floor(Math.random() * (randomMesajlar.length))]
    client.user.setActivity(`${randomMesajlar1}`);

}, 2 * 2500);
 
  
client.user.setStatus("idle"),
 client.user.setStatus("dnd"),
  client.user.setStatus("online");
 /*
idle yerine yazılabilecekler
dnd 
idle
online
ofline
*/


}