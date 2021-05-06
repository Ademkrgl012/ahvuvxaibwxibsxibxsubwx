exports.run = async ({ lang }, { channel, guild }) => {
 
    let langs = ['Türkçe', 'İngilizce', 'İspanyolca', 'Almanca', 'Rusça'];
 
    let Index;
 
    try {
        channel.send(`__İstediğiniz Dil Sırasını Belirtiniz:__ \n\n${langs.map(l => `${l}\n`).join('')}`);
        let fl = (m) => m.content > 0 && m.content <= 6;
        let res = await channel.awaitMessages(fl, {
            max: 1,
            time: 10000,
            errors: ['time'],
        });
        Index = parseInt(res.first().content);
    } catch (err) {
        return channel.send('Herhangi bir seçim yapılmadığı için seçim iptal edildi.');
    };
 
    switch (Index) {
        case 1:
            lang.set(guild.id, 'tr');
            channel.send(`Dil \`${langs[Index - 1]}\` olarak belirlendi.`);
            break;
        case 2:
            lang.set(guild.id, 'en');
            channel.send(`Dil \`${langs[Index - 1]}\` olarak belirlendi.`);
            break;
        case 3:
            lang.set(guild.id, 'es');
            channel.send(`Dil \`${langs[Index - 1]}\` olarak belirlendi.`);
            break;
        case 4:
            lang.set(guild.id, 'nl');
            channel.send(`Dil \`${langs[Index - 1]}\` olarak belirlendi.`);
            break;
 
        case 5:
            lang.set(guild.id, 'ru');
            channel.send(`Dil \`${langs[Index - 1]}\` olarak belirlendi.`);
            break;
 
        default:
            break;
    }
 
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};
 
exports.help = {
    name: 'söyle-dili',
};