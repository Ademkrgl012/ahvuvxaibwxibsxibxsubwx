//READY.JS YE ATILACAK

const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
var prefix = ayarlar.prefix;
module.exports = client => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Aktif, Komutlar yüklendi!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: ${client.user.username} ismi ile giriş yapıldı!`);
  client.user.setStatus("online");
   var oyun = [
        "Destek sunucumuz saldırıya uğradı sunucumuza gelmek için g!desteksunucum yazabilirsiniz",
        "Destek sunucumuz saldırıya uğradı sunucumuza gelmek için g!desteksunucum yazabilirsiniz",
        "💪 7/24 Aktif!",  
        "💡 g!davet | Botumuzu ekleyin",
        "👨 35.000 Kullanıcı!",
        "🌍 115 Sunucuda Hizmet!",
        "g!yardım 🔥 + g!davet 🔥 + g!otorol"
    ];
    setInterval(function() {
        var random = Math.floor(Math.random()*(oyun.length-0+1)+0);
        client.user.setGame(oyun[random], "https://rapp");
        }, 2 * 2500);
}