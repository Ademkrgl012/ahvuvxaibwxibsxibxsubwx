module.exports = client => {
var oyun = [
        "thisismrare.js",
        "Developer Doğukan"
        
    ];

    setInterval(function() {

        var random = Math.floor(Math.random()*(oyun.length-0+1)+0);

        client.user.setActivity(oyun[random], "a!yardım" );
        }, 2 * 2500);
 
  client.user.setStatus("idle");