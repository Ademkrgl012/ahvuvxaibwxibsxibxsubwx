const play = require('discordjs-ytdl')
module.exports = {
  name: "çal",
  async run (client, message, args){
    if (message.member.voice.channel){
      const connection = await message.member.voice.channel.join()
      play.play(connection, args.join(" "), '')
      }else{
        message.reply('Bir Sesli Kanala Katlmalısın')
        }
    }
  }
                
