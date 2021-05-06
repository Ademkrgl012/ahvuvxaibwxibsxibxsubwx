const tts = require("google-tts-api");
 
exports.run = async ({ lang }, { member, channel, guild }, args) => {
    if(!member.voice.channel) return channel.send('Ses kanalında değilsiniz.');
    let connection = await member.voice.channel.join();
    let lan = lang.get(guild.id);
 
    if (!args[0]) return channel.send('Sizin için ne söyleyebilirim.');
    if (args.length == '200') return channel.send('Karakter limiti `200`\'dür.');
 
    let url = await tts(`${args}`, lan ? lan : 'tr', 1);
    connection.play(url)
        .on('finish', () => {
            channel.send(`\`${args.join(' ')}\` kelimesini söyledim.`);
            member.voice.channel.leave();
        })
        .on('error', (err) => console.error);
 
};
 exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
};
exports.help = {
    name: 'söyle'
};
 