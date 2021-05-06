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
var randomdurum = [
  
]




setInterval(function() {
    var randomMesajlar1 = randomMesajlar[Math.floor(Math.random() * (randomMesajlar.length))]
    client.user.setActivity(`${randomMesajlar1}`);

}, 2 * 5000);

client.user.setStatus("dnd");

/*
idle yerine yazılabilecekler
dnd 
idle
online
ofline
*/


}