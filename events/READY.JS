const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
var prefix = ayarlar.prefix;
module.exports = client => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Aktif, Komutlar yüklendi!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: ${client.user.username} ismi ile giriş yapıldı!`);
  client.user.setStatus("idle");
   var oyun = [
        "Destek sunucumuz saldırıya uğradı sunucumuza gelmek için g!desteksunucum yazabilirsiniz",
        "Destek sunucumuz saldırıya uğradı sunucumuza gelmek için g!desteksunucum yazabilirsiniz",
        "💪 7/24 Aktif!",  
        "💡 a!davet | Botumuzu ekleyin",
        "👨 2500 Kullanıcı!",
        "🌍 10 Sunucuda Hizmet!",
        "a!yardım 🔥 + a!davet 🔥 + a!otorol"
    ];
    setInterval(function() {
        var random = Math.floor(Math.random()*(oyun.length-0+1)+0);
        client.user.setGame(oyun[random], "https://rapp");
        }, 2 * 2500);
}