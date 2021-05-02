const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
const http = require("http");
const db = require("quick.db");
const moment = require("moment");
const express = require("express");
const ayarlar = require("./ayarlar.json");
const request = require("node-superfetch");
const Canvas = require("canvas");
const { GOOGLE_API_KEY } = require("./ayarlar.json");
client.login(process.env.token);
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
const log = message => {
  console.log(` ${message}`);
};
require("./util/eventLoader.js")(client);

client.on("message", async msg => {
  if (msg.author.bot) return undefined;
  if (!msg.content.startsWith(prefix)) return undefined;

  const args = msg.content.split(" ");
  const searchString = args.slice(1).join(" ");
  const url = args[1] ? args[1].replace(/<(.+)>/g, "$1") : "";
  const serverQueue = queue.get(msg.guild.id);
  let command = msg.content.toLowerCase().split(" ")[0];
  command = command.slice(prefix.length);
  if (command === "oynat") {
    const voiceChannel = msg.member.voice.channel;
    if (!voiceChannel)
      return msg.channel.send(
        new Discord.MessageEmbed()
          .setColor("RED")
          .setDescription(
            ":warning: | İlk olarak sesli bir kanala giriş yapmanız gerek."
          )
      );
    const permissions = voiceChannel.permissionsFor(msg.client.user);
    if (!permissions.has("CONNECT")) {
      return msg.channel.send(
        new Discord.MessageEmbed()
          .setColor("RED")
          .setTitle(
            ":warning: | İlk olarak sesli bir kanala giriş yapmanız gerek."
          )
      );
    }
    if (!permissions.has("SPEAK")) {
      return msg.channel.send(
        new Discord.MessageEmbed()
          .setColor("RED")
          .setTitle(
            ":warning: | Şarkı başlatılamıyor. Lütfen mikrofonumu açınız."
          )
      );
    }

    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
      const playlist = await youtube.getPlaylist(url);
      const videos = await playlist.getVideos();
      for (const video of Object.values(videos)) {
        const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
        await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
      }
      return msg.channel
        .send(new Discord.MessageEmbed())
        .setTitle(
          `**? | Oynatma Listesi: **${playlist.title}** Kuyruğa Eklendi!**`
        );
    } else {
      try {
        var video = await youtube.getVideo(url);
      } catch (error) {
        try {
          var videos = await youtube.searchVideos(searchString, 10);
          let index = 0;

          msg.channel.send(
            new Discord.MessageEmbed()
              .setTitle("XiR`S | Şarkı Seçimi")
              .setAuthor(`${msg.author.tag}`, msg.author.avatarURL())
              .setThumbnail(
                "https://i.postimg.cc/W1b1LW13/youtube-kids-new-logo.png"
              )
              .setDescription(
                `${videos
                  .map(video2 => `**${++index} -** ${video2.title}`)
                  .join("\n")}`
              )
              .setFooter(
                "Lütfen 1-10 arasında bir rakam seçiniz 10 saniye içinde liste iptal edilecektir."
              )
              .setColor("RED")
          );
          msg.delete(5000);

          try {
            var response = await msg.channel.awaitMessages(
              msg2 => msg2.content > 0 && msg2.content < 11,
              {
                maxMatches: 1,
                time: 10000,
                errors: ["time"]
              }
            );
          } catch (err) {
            console.error(err);
            return msg.channel.send(
              new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription(
                  ":warning: | **Şarkı Değeri Belirtmediğiniz İçin Seçim İptal Edilmiştir**."
                )
            );
          }
          const videoIndex = parseInt(response.first().content);
          var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
        } catch (err) {
          console.error(err);
          return msg.channel.send(
            new Discord.MessageEmbed()
              .setColor("RED")
              .setDescription(":( | **Aradım Fakat Hiç Bir Sonuç Çıkmadı**")
          );
        }
      }
      return handleVideo(video, msg, voiceChannel);
    }
  } else if (command === "geç") {
    if (!msg.member.voice.channel)
      if (!msg.member.voice.channel)
        return msg.channel.send(
          new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription(
              ":x: | **Lütfen öncelikle sesli bir kanala katılınız**."
            )
        );
    if (!serverQueue)
      return msg.channel.send(
        new Discord.MessageEmbed()
          .setColor("RED")
          .setTitle(":x: | **Hiç Bir Müzik Çalmamakta**")
      );
    serverQueue.connection.dispatcher.end("**Müziği Geçildi!**");
    return undefined;
  } else if (command === "durdur") {
    if (!msg.member.voice.channel)
      if (!msg.member.voice.channel)
        return msg.channel.send(
          new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription(
              "**:warning: | Lütfen öncelikle sesli bir kanala katılınız.**"
            )
        );
    if (!serverQueue)
      return msg.channel.send(
        new Discord.MessageEmbed()
          .setColor("RED")
          .setTitle(":warning: **| Hiç Bir Müzik Çalmamakta**")
      );
    msg.channel.send(
      `:stop_button: **${serverQueue.songs[0].title}** Adlı Müzik Durduruldu`
    );
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end("**Müzik Bitti**");
    return undefined;
  } else if (command === "ses") {
    if (!msg.member.voice.channel)
      if (!msg.member.voice.channel)
        return msg.channel.send(
          new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription(
              ":warning: **| Lütfen öncelikle sesli bir kanala katılınız.**"
            )
        );
    if (!serverQueue)
      return msg.channel.send(
        new Discord.MessageEmbed()
          .setColor("RED")
          .setTitle(":warning:| **Hiç Bir Müzik Çalmamakta**")
      );
    if (!serverQueue)
      return msg.channel.send(
        new Discord.MessageEmbed()
          .setColor("RED")
          .setTitle(":warning:| **Hiç Bir Müzik Çalmamakta**")
      );
    if (!args[1])
      return msg.channel.send(
        new Discord.MessageEmbed()
          .setTitle(`:warning: Şuanki Ses Seviyesi: **${serverQueue.volume}**`)
          .setColor("BLUE")
      );
    serverQueue.volume = args[1];
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
    return msg.channel.send(
      new Discord.MessageEmbed()
        .setTitle(`:hammer:  Ses Seviyesi Ayarlanıyor: **${args[1]}**`)
        .setColor("GREEN")
    );
  } else if (command === "çalan") {
    if (!serverQueue)
      return msg.channel.send(
        new Discord.MessageEmbed()
          .setTitle(":warning: | **Çalan Müzik Bulunmamakta**")
          .setColor("RED")
      );
    return msg.channel.send(
      new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle("XiR`S | Çalan")
        .addField(
          "Başlık",
          `[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})`,
          true
        )
        .addField(
          "Süre",
          `${serverQueue.songs[0].durationm}:${serverQueue.songs[0].durations}`,
          true
        )
    );
  } else if (command === "kuyruk") {
    let index = 0;
    if (!serverQueue)
      return msg.channel.send(
        new Discord.MessageEmbed()
          .setTitle(":warning: | **Sırada Müzik Bulunmamakta**")
          .setColor("RED")
      );
    return msg.channel
      .send(
        new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setTitle("XiR`S | Şarkı Kuyruğu")
          .setDescription(
            `${serverQueue.songs
              .map(song => `**${++index} -** ${song.title}`)
              .join("\n")}`
          )
      )
      .addField("Şu anda çalınan: " + `${serverQueue.songs[0].title}`);
  } else if (command === "duraklat") {
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause();
      return msg.channel.send(
        new Discord.MessageEmbed()
          .setTitle("**:pause_button: Müzik Senin İçin Durduruldu!**")
          .setColor("GREEN")
      );
    }
    return msg.channel.send(":warning: | **Çalan Müzik Bulunmamakta**");
  } else if (command === "devam") {
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      return msg.channel.send(
        new Discord.MessageEmbed()
          .setTitle("**:arrow_forward: Müzik Senin İçin Devam Etmekte!**")
          .setColor("GREEN")
      );
    }
    return msg.channel.send(
      new Discord.MessageEmbed()
        .setTitle(":warning: ** | Çalan Müzik Bulunmamakta.**")
        .setColor("RED")
    );
  }

  return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
  const serverQueue = queue.get(msg.guild.id);
  const song = {
    id: video.id,
    title: video.title,
    url: `https://www.youtube.com/watch?v=${video.id}`,
    durationh: video.duration.hours,
    durationm: video.duration.minutes,
    durations: video.duration.seconds,
    zg: video.raw.snippet.channelId,
    best: video.channel.title,
    views: video.raw.views
  };
  if (!serverQueue) {
    const queueConstruct = {
      textChannel: msg.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };
    queue.set(msg.guild.id, queueConstruct);

    queueConstruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueConstruct.connection = connection;
      play(msg.guild, queueConstruct.songs[0]);
    } catch (error) {
      console.error(
        `:warning: **Şarkı Sisteminde Problem Var Hata Nedeni: ${error}**`
      );
      queue.delete(msg.guild.id);
      return msg.channel.send(
        new Discord.MessageEmbed()
          .setTitle(
            `:warning: **Şarkı Sisteminde Problem Var Hata Nedeni: ${error}**`
          )
          .setColor("RED")
      );
    }
  } else {
    serverQueue.songs.push(song);
    console.log(serverQueue.songs);
    if (playlist) return undefined;
    return msg.channel.send(
      new Discord.MessageEmbed()
        .setTitle(
          `:arrow_heading_up:  **${song.title}** Adlı Müzik Kuyruğa Eklendi!`
        )
        .setColor("GREEN")
    );
  }
  return undefined;
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);

  if (!song) {
    serverQueue.voice.channel.leave();
    queue.delete(guild.id);
    return;
  }
  console.log(serverQueue.songs);

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on("end", reason => {
      if (reason === " :x:  | **Yayın Akış Hızı Yeterli Değil.**")
        console.log("Müzik Bitti.");
      else console.log(reason);
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

  serverQueue.textChannel.send(
    new Discord.MessageEmbed()
      .setTitle("**XiR`S | :microphone: Müzik Başladı**")
      .setThumbnail(`https://i.ytimg.com/vi/${song.id}/default.jpg`)
      .addField("\nBaşlık", `[${song.title}](${song.url})`, true)
      .addField("\nSes Seviyesi", `${serverQueue.volume}%`, true)
      .addField("Süre", `${song.durationm}:${song.durations}`, true)
      .addField("Video ID", `${song.id}`, true)
      .addField("Kanal ID", `${song.zg}`, true)
      .addField("Kanal İsmi", `${song.best}`, true)
      .addField("Video Linki", `${song.url}`, true)
      .setImage(`https://i.ytimg.com/vi/${song.id}/hqdefault.jpg`)
      .setColor("RED")
  );
}

//-------------Bot Eklenince Bir Kmmmla Mesaj Gönderme Komutu ---------------\\

const emmmmbed = new Discord.MessageEmbed()
  .setThumbnail()
  .setImage(
    "https://cdn.discordapp.com/attachments/813881349004984370/826793395677691924/350kb_1.gif"
  )
  .addField(
    `Adem Reyzz | Teşekkürler`,
    `**Selamlar, Ben Adem Reyzz (Adem Reyzz Bot'un Geliştiricisi) Öncelikle Botumuzu Eklediğiniz ve Bize Destek Olduğunuz İçin Sizlere Teşekkürlerimi Sunarım**`
  )
  .addField(
    `Adem Reyzz | Prefix`,
    `**Adem Reyzz Botun Prefixi(ön eki) = \`a!\`\n\n Değiştirebilmek için \`a!prefix\` Yazabilirsiniz.**`
  )
  .addField(
    `Adem Reyzz | Nasıl Kullanılır?`,
    `**Adem Reyzz botun tüm özelliklerinden yararlanabilmek için sadece \`a!yardım\` yazmanız yeterlidir.**`
  )
  .addField(
    `Adem Reyzz | Linkler`,
    `**Sohbet Kanalına y!davet Yazmanız Yeterlidir**`
  )
  .setFooter(`Adem Reyzz | Gelişmiş Türkçe Bot | 2021`)
  .setTimestamp();

client.on("guildCreate", guild => {
  let defaultChannel = "";
  guild.channels.cache.forEach(channel => {
    if (channel.type == "text" && defaultChannel == "") {
      if (channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
        defaultChannel = channel;
      }
    }
  });

  defaultChannel.send(emmmmbed);
});

//----------------------------------------------------------------\\

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

client.on("guildMemberRemove", async member => {
  const channel = db.fetch(`sayaçKanal_${member.guild.id}`);
  if (db.has(`sayacsayı_${member.guild.id}`) == false) return;
  if (db.has(`sayaçKanal_${member.guild.id}`) == false) return;

  member.guild.channels.cache
    .get(channel)
    .send(
      `📤 **${member.user.tag}** Sunucudan ayrıldı! \`${db.fetch(
        `sayacsayı_${member.guild.id}`
      )}\` üye olmamıza son \`${db.fetch(`sayacsayı_${member.guild.id}`) -
        member.guild.memberCount}\` üye kaldı!`
    );
});
client.on("guildMemberAdd", async member => {
  const channel = db.fetch(`sayaçKanal_${member.guild.id}`);
  if (db.has(`sayacsayı_${member.guild.id}`) == false) return;
  if (db.has(`sayaçKanal_${member.guild.id}`) == false) return;

  member.guild.channels.cache
    .get(channel)
    .send(
      `📥 **${member.user.tag}** Sunucuya Katıldı! \`${db.fetch(
        `sayacsayı_${member.guild.id}`
      )}\` üye olmamıza son \`${db.fetch(`sayacsayı_${member.guild.id}`) -
        member.guild.memberCount}\` üye kaldı!`
    );
});

///////////////////////////////////SA-AS

client.on("message", async msg => {
  const i = await db.fetch(`ssaass_${msg.guild.id}`);
  if (i == "acik") {
    if (
      msg.content.toLowerCase() == "sa" ||
      msg.content.toLowerCase() == "s.a" ||
      msg.content.toLowerCase() == "selamun aleyküm" ||
      msg.content.toLowerCase() == "sea" ||
      msg.content.toLowerCase() == "selam"
    ) {
      try {
        return msg.reply("**Aleyküm Selam Hoşgeldin** 👻");
      } catch (err) {
        console.log(err);
      }
    }
  } else if (i == "kapali") {
  }
  if (!i) return;
});

//////////////afk

const { DiscordAPIError } = require("discord.js");

client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (message.content.includes(`afk`)) return;

  if (await db.fetch(`afk_${message.author.id}`)) {
    db.delete(`afk_${message.author.id}`);
    db.delete(`afk_süre_${message.author.id}`);

    const embed = new Discord.MessageEmbed()

      .setColor("GREEN")
      .setAuthor(message.author.username, message.author.avatarURL)
      .setDescription(`${message.author.username} Artık \`AFK\` Değilsin.`);

    message.channel.send(embed);
  }

  var USER = message.mentions.users.first();
  if (!USER) return;
  var REASON = await db.fetch(`afk_${USER.id}`);

  if (REASON) {
    let süre = await db.fetch(`afk_süre_${USER.id}`);

    const afk = new Discord.MessageEmbed()

      .setColor("GOLD")
      .setDescription(
        `**BU KULLANICI AFK**\n\n**Afk Olan Kullanıcı :** \`${USER.tag}\`\n\n**Sebep :** \`${REASON}\``
      );

    message.channel.send(afk);
  }
});

/////////////////////////////////

client.on("guildDelete", guild => {
  let Crewembed = new Discord.MessageEmbed()

    .setColor("RED")
    .setTitle(" ATILDIM !")
    .addField("Sunucu Adı:", guild.name)
    .addField("Sunucu sahibi", guild.owner)
    .addField("Sunucudaki Kişi Sayısı:", guild.memberCount);

  client.channels.cache.get("LOGKANALİD").send(Crewembed);
});

client.on("guildCreate", guild => {
  let Crewembed = new Discord.MessageEmbed()

    .setColor("GREEN")
    .setTitle("EKLENDİM !")
    .addField("Sunucu Adı:", guild.name)
    .addField("Sunucu sahibi", guild.owner)
    .addField("Sunucudaki Kişi Sayısı:", guild.memberCount);

  client.channels.cache.get("LOGKANALİD").send(Crewembed);
});

///////////////////////////////////REKLAMENLGEL

client.on("message", msg => {
  if (!db.has(`reklam_${msg.guild.id}`)) return;
  const reklam = [
    ".com",
    ".net",
    ".xyz",
    ".tk",
    ".pw",
    ".io",
    ".me",
    ".gg",
    "www.",
    "https://",
    "http://",
    ".gl",
    ".org",
    ".com.tr",
    ".biz",
    "net",
    ".rf.gd",
    ".az",
    ".party",
    "discord.gg"
  ];
  if (reklam.some(word => msg.content.includes(word))) {
    try {
      if (!msg.member.hasPermission("BAN_MEMBERS")) {
        msg.delete();
        return msg
          .reply(
            "**Bu Sunucuda** `Reklam Engelle`** Aktif Reklam Yapmana İzin Vermem !**"
          )
          .then(msg => msg.delete(4000));

        msg.delete(4000);
      }
    } catch (err) {
      console.log(err);
    }
  }
});

/////////////////küfür
client.on("message", async msg => {
  var anahtar = await db.fetch(`kufur_${msg.guild.id}`);
  if (anahtar === "acik") {
    const küfürler = [
      "oç",
      "piç",
      "amk",
      "amq",
      "lan",
      "mal",
      "salak",
      "gerizekalı",
      "sik",
      "siktir",
      "sg",
      "am",
      "orospu",
      "yarrak", //////FİBER BOTLİST &amp; CODE
      "aptal"
    ]; //aklıma bu kdr geldi başka küfür ekleyebilirsiniz siz "küfür", bu şekilde alt alta ekleyebilirsinz

    if (küfürler.some(küfür => msg.content.toLowerCase().includes(küfür))) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete().then(msg.reply("Küfür etmek yasak ibnenin öz evladı"));
      }
    }
  }
  if (!anahtar) return;
});
//////////////////////////MODLOG///////////////////
client.on("messageDelete", async message => {
  if (message.author.bot || message.channel.type == "dm") return;

  let log = message.guild.channels.cache.get(
    await db.fetch(`log_${message.guild.id}`)
  );

  if (!log) return;

  const embed = new Discord.MessageEmbed()

    .setTitle(message.author.username + " | Mesaj Silindi")

    .addField("Kullanıcı: ", message.author)

    .addField("Kanal: ", message.channel)

    .addField("Mesaj: ", "" + message.content + "");

  log.send(embed);
});

client.on("messageUpdate", async (oldMessage, newMessage) => {
  let modlog = await db.fetch(`log_${oldMessage.guild.id}`);

  if (!modlog) return;

  let embed = new Discord.MessageEmbed()

    .setAuthor(oldMessage.author.username, oldMessage.author.avatarURL())

    .addField("**Eylem**", "Mesaj Düzenleme")

    .addField(
      "**Mesajın sahibi**",
      `<@${oldMessage.author.id}> === **${oldMessage.author.id}**`
    )

    .addField("**Eski Mesajı**", `${oldMessage.content}`)

    .addField("**Yeni Mesajı**", `${newMessage.content}`)

    .setTimestamp()

    .setColor("RANDOM")

    .setFooter(
      `Sunucu: ${oldMessage.guild.name} - ${oldMessage.guild.id}`,
      oldMessage.guild.iconURL()
    )

    .setThumbnail(oldMessage.guild.iconURL);

  client.channels.cache.get(modlog).send(embed);
});

client.on("channelCreate", async channel => {
  let modlog = await db.fetch(`log_${channel.guild.id}`);

  if (!modlog) return;

  const entry = await channel.guild
    .fetchAuditLogs({ type: "CHANNEL_CREATE" })
    .then(audit => audit.entries.first());

  let kanal;

  if (channel.type === "text") kanal = `<#${channel.id}>`;

  if (channel.type === "voice") kanal = `\`${channel.name}\``;

  let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem**", "Kanal Oluşturma")

    .addField("**Kanalı Oluşturan Kişi**", `<@${entry.executor.id}>`)

    .addField("**Oluşturduğu Kanal**", `${kanal}`)

    .setTimestamp()

    .setColor("RANDOM")

    .setFooter(
      `Sunucu: ${channel.guild.name} - ${channel.guild.id}`,
      channel.guild.iconURL()
    )

    .setThumbnail(channel.guild.iconUR);

  client.channels.cache.get(modlog).send(embed);
});

client.on("channelDelete", async channel => {
  let modlog = await db.fetch(`log_${channel.guild.id}`);

  if (!modlog) return;

  const entry = await channel.guild
    .fetchAuditLogs({ type: "CHANNEL_DELETE" })
    .then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem**", "Kanal Silme")

    .addField("**Kanalı Silen Kişi**", `<@${entry.executor.id}>`)

    .addField("**Silinen Kanal**", `\`${channel.name}\``)

    .setTimestamp()

    .setColor("RANDOM")

    .setFooter(
      `Sunucu: ${channel.guild.name} - ${channel.guild.id}`,
      channel.guild.iconURL()
    )

    .setThumbnail(channel.guild.iconURL);

  client.channels.cache.get(modlog).send(embed);
});

client.on("roleCreate", async role => {
  let modlog = await db.fetch(`log_${role.guild.id}`);

  if (!modlog) return;

  const entry = await role.guild
    .fetchAuditLogs({ type: "ROLE_CREATE" })
    .then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem**", "Rol Oluşturma")

    .addField("**Rolü oluşturan kişi**", `<@${entry.executor.id}>`)

    .addField("**Oluşturulan rol**", `\`${role.name}\` **=** \`${role.id}\``)

    .setTimestamp()

    .setFooter(
      `Sunucu: ${role.guild.name} - ${role.guild.id}`,
      role.guild.iconURL
    )

    .setColor("RANDOM")

    .setThumbnail(role.guild.iconURL);

  client.channels.cache.get(modlog).send(embed);
});

client.on("roleDelete", async role => {
  let modlog = await db.fetch(`log_${role.guild.id}`);

  if (!modlog) return;

  const entry = await role.guild
    .fetchAuditLogs({ type: "ROLE_DELETE" })
    .then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem**", "Rol Silme")

    .addField("**Rolü silen kişi**", `<@${entry.executor.id}>`)

    .addField("**Silinen rol**", `\`${role.name}\` **=** \`${role.id}\``)

    .setTimestamp()

    .setFooter(
      `Sunucu: ${role.guild.name} - ${role.guild.id}`,
      role.guild.iconURL
    )

    .setColor("RANDOM")

    .setThumbnail(role.guild.iconURL);

  client.channels.cache.get(modlog).send(embed);
});

client.on("emojiCreate", async emoji => {
  let modlog = await db.fetch(`log_${emoji.guild.id}`);

  if (!modlog) return;

  const entry = await emoji.guild
    .fetchAuditLogs({ type: "EMOJI_CREATE" })
    .then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem**", "Emoji Oluşturma")

    .addField("**Emojiyi oluşturan kişi**", `<@${entry.executor.id}>`)

    .addField("**Oluşturulan emoji**", `${emoji} - İsmi: \`${emoji.name}\``)

    .setTimestamp()

    .setColor("RANDOM")

    .setFooter(
      `Sunucu: ${emoji.guild.name} - ${emoji.guild.id}`,
      emoji.guild.iconURL
    )

    .setThumbnail(emoji.guild.iconURL);

  client.channels.cache.get(modlog).send(embed);
});

client.on("emojiDelete", async emoji => {
  let modlog = await db.fetch(`log_${emoji.guild.id}`);

  if (!modlog) return;

  const entry = await emoji.guild
    .fetchAuditLogs({ type: "EMOJI_DELETE" })
    .then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem**", "Emoji Silme")

    .addField("**Emojiyi silen kişi**", `<@${entry.executor.id}>`)

    .addField("**Silinen emoji**", `${emoji}`)

    .setTimestamp()

    .setFooter(
      `Sunucu: ${emoji.guild.name} - ${emoji.guild.id}`,
      emoji.guild.iconURL
    )

    .setColor("RANDOM")

    .setThumbnail(emoji.guild.iconURL);

  client.channels.cache.get(modlog).send(embed);
});

client.on("emojiUpdate", async (oldEmoji, newEmoji) => {
  let modlog = await db.fetch(`log_${oldEmoji.guild.id}`);

  if (!modlog) return;

  const entry = await oldEmoji.guild
    .fetchAuditLogs({ type: "EMOJI_UPDATE" })
    .then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem**", "Emoji Güncelleme")

    .addField("**Emojiyi güncelleyen kişi**", `<@${entry.executor.id}>`)

    .addField(
      "**Güncellenmeden önceki emoji**",
      `${oldEmoji} - İsmi: \`${oldEmoji.name}\``
    )

    .addField(
      "**Güncellendikten sonraki emoji**",
      `${newEmoji} - İsmi: \`${newEmoji.name}\``
    )

    .setTimestamp()

    .setColor("RANDOM")

    .setFooter(
      `Sunucu: ${oldEmoji.guild.name} - ${oldEmoji.guild.id}`,
      oldEmoji.guild.iconURL
    )

    .setThumbnail(oldEmoji.guild.iconURL);

  client.channels.cache.get(modlog).send(embed);
});

client.on("guildBanAdd", async (guild, user) => {
  let modlog = await db.fetch(`log_${guild.id}`);

  if (!modlog) return;

  const entry = await guild
    .fetchAuditLogs({ type: "MEMBER_BAN_ADD" })
    .then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem**", "Yasaklama")

    .addField("**Kullanıcıyı yasaklayan yetkili**", `<@${entry.executor.id}>`)

    .addField("**Yasaklanan kullanıcı**", `**${user.tag}** - ${user.id}`)

    .addField("**Yasaklanma sebebi**", `${entry.reason}`)

    .setTimestamp()

    .setColor("RANDOM")

    .setFooter(`Sunucu: ${guild.name} - ${guild.id}`, guild.iconURL)

    .setThumbnail(guild.iconURL);

  client.channels.cache.get(modlog).send(embed);
});

client.on("guildBanRemove", async (guild, user) => {
  let modlog = await db.fetch(`log_${guild.id}`);

  if (!modlog) return;

  const entry = await guild
    .fetchAuditLogs({ type: "MEMBER_BAN_REMOVE" })
    .then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem**", "Yasak kaldırma")

    .addField("**Yasağı kaldıran yetkili**", `<@${entry.executor.id}>`)

    .addField("**Yasağı kaldırılan kullanıcı**", `**${user.tag}** - ${user.id}`)

    .setTimestamp()

    .setColor("RANDOM")

    .setFooter(`Sunucu: ${guild.name} - ${guild.id}`, guild.iconURL)

    .setThumbnail(guild.iconURL);

  client.channels.cache.get(modlog).send(embed);
});

//////////////////////////////MODLOG///////////////////////////

//////////////////////////////OTOROL

client.on("guildMemberAdd", member => {
  let rol = db.fetch(`autoRole_${member.guild.id}`);
  if (!rol) return;
  let kanal = db.fetch(`autoRoleChannel_${member.guild.id}`);
  if (!kanal) return;

  member.roles.add(member.guild.roles.cache.get(rol));
  let embed = new Discord.MessageEmbed()
    .setDescription(
      "**Sunucuya yeni katılan** **" +
        member.user.username +
        "** **Kullanıcısına** <@&" +
        rol +
        "> **Rolü verildi**"
    )
    .setColor("RANDOM"); //.setFooter(`<@member.id>`)
  member.guild.channels.cache.get(kanal).send(embed);
});

//////////////////////////////////////////////////

client.on("ready", async () => {
  let botVoiceChannel = client.channels.cache.get("SES KANAL İD");
  console.log("Bot Ses Kanalına bağlandı!");
  if (botVoiceChannel)
    botVoiceChannel
      .join()
      .catch(err => console.error("Bot ses kanalına bağlanamadı!"));
});
///////////////////Fake Katıl
client.on("message", async message => {
  if (message.content === "fakekatıl") {
    // Buraya ne yazarsanız yazdığınız şeye göre çalışır
    client.emit(
      "guildMemberAdd",
      message.member || (await message.guild.fetchMember(message.author))
    );
  }
});
/////////////////////////////////Fake Ayrıl
client.on("message", async message => {
  if (message.content === "fakeayrıl") {
    // Buraya ne yazarsanız yazdığınız şeye göre çalışır
    client.emit(
      "guildMemberRemove",
      message.member || (await message.guild.fetchMember(message.author))
    );
  }
});

/////////////////////////////////Oto-Cevap////////////////
client.on("message", async message => {
  if (message.author.bot) return;
  let yazılar = db.fetch(`${message.guild.id}.otocevap.yazılar`);
  let cevaplar = db.fetch(`${message.guild.id}.otocevap.cevaplar`);
  var efe = "";
  let sunucuadı = message.guild.name;
  let üyesayı = message.guild.members.cache.size;
  for (
    var i = 0;
    i <
    (db.fetch(`${message.guild.id}.otocevap.yazılar`)
      ? db.fetch(`${message.guild.id}.otocevap.yazılar`).length
      : 0);
    i++
  ) {
    if (message.content.toLowerCase() == yazılar[i].toLowerCase()) {
      efe += `${cevaplar[i]
        .replace("{sunucuadı}", `${sunucuadı}`)
        .replace("{üyesayı}", `${üyesayı}`)}`;
      message.channel.send(`${efe}`);
    }
  }
});
///////////////////////////////Resimli Giriş-Çıkış///////////////////
//client.on("guildMemberRemove", async member => {
//let resimkanal = JSON.parse(fs.readFileSync("./ayarlar/gç.json", "utf8"));
//const canvaskanal = member.guild.channels.cache.get(resimkanal[member.guild.id].resim);

//if (db.has(`gçkanal_${member.guild.id}`) === false) return;
// var canvaskanal = member.guild.channels.cache.get(
// db.fetch(`gçkanal_${member.guild.id}`)
// );
//if (!canvaskanal) return;

//const Canvas = require("canvas"),
//Image = Canvas.Image,
// Font = Canvas.Font,
// path = require("path");

//var randomMsg = ["Sunucudan Ayrıldı."];
// var randomMsg_integer =
// randomMsg[Math.floor(Math.random() * randomMsg.length)];

//let msj = await db.fetch(`cikisM_${member.guild.id}`);
//if (!msj) msj = `{uye}, ${randomMsg_integer}`;

// const canvas = Canvas.createCanvas(640, 360);
///const ctx = canvas.getContext("2d");

//const background = await Canvas.loadImage(
//"https://i.hizliresim.com/Wrn1XW.jpg"
//);
//ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

//ctx.strokeStyle = "#74037b";
//ctx.strokeRect(0, 0, canvas.width, canvas.height);

//ctx.fillStyle = `#D3D3D3`;
//ctx.font = `37px "Warsaw"`;
//ctx.textAlign = "center";
//ctx.fillText(`${member.user.username}`, 300, 342);

//let avatarURL = member.user.displayAvatarURL({
// format: "png",
// dynamic: true,
// size: 1024
//});
// const { body } = await request.get(avatarURL);
//const avatar = await Canvas.loadImage(body);

//ctx.beginPath();
//ctx.lineWidth = 4;
//ctx.fill();
// ctx.lineWidth = 4;
//ctx.arc(250 + 55, 55 + 55, 55, 0, 2 * Math.PI, false);
//ctx.clip();
//ctx.drawImage(avatar, 250, 55, 110, 110);

//const attachment = new Discord.MessageAttachment(
//canvas.toBuffer(),
// "ro-BOT-güle-güle.png"
// );

//canvaskanal.send(attachment);
// canvaskanal.send(
// msj.replace("{uye}", member).replace("{sunucu}", member.guild.name)
//);
//if (member.user.bot)
//return canvaskanal.send(`🤖 Bu bir bot, ${member.user.tag}`);
//});

//client.on("guildMemberAdd", async member => {
//if (db.has(`gçkanal_${member.guild.id}`) === false) return;
// var canvaskanal = member.guild.channels.cache.get(
// db.fetch(`gçkanal_${member.guild.id}`)
//);

//if (!canvaskanal || canvaskanal === undefined) return;
// const request = require("node-superfetch");
// const Canvas = require("canvas"),
// Image = Canvas.Image,
// Font = Canvas.Font,
//path = require("path");

//var randomMsg = ["Sunucuya Katıldı."];
//var randomMsg_integer =
//randomMsg[Math.floor(Math.random() * randomMsg.length)];

//let paket = await db.fetch(`pakets_${member.id}`);
// let msj = await db.fetch(`cikisM_${member.guild.id}`);
//if (!msj) msj = `{uye}, ${randomMsg_integer}`;

// const canvas = Canvas.createCanvas(640, 360);
//const ctx = canvas.getContext("2d");

//const background = await Canvas.loadImage(
//"https://i.hizliresim.com/UyVZ4f.jpg"
//);
//ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

// ctx.strokeStyle = "#74037b";
//ctx.strokeRect(0, 0, canvas.width, canvas.height);

//ctx.fillStyle = `#D3D3D3`;
// ctx.font = `37px "Warsaw"`;
// ctx.textAlign = "center";
//ctx.fillText(`${member.user.username}`, 300, 342);

// let avatarURL = member.user.displayAvatarURL({
//format: "png",
// dynamic: true,
//size: 1024
//});
//const { body } = await request.get(avatarURL);
//const avatar = await Canvas.loadImage(body);

//ctx.beginPath();
//ctx.lineWidth = 4;
//ctx.fill();
//ctx.lineWidth = 4;
//ctx.arc(250 + 55, 55 + 55, 55, 0, 2 * Math.PI, false);
// ctx.clip();
//ctx.drawImage(avatar, 250, 55, 110, 110);

//const attachment = new Discord.MessageAttachment(
//canvas.toBuffer(),
//"ro-BOT-hosgeldin.png"
//);

//canvaskanal.send(attachment);
//canvaskanal.send(
// msj.replace("{uye}", member).replace("{sunucu}", member.guild.name)
//);
//if (member.user.bot)
//return canvaskanal.send(`🤖 Bu bir bot, ${member.user.tag}`);
//});
///////////////////////////////Gelişmiş Hoşgeldin///////////////////////
client.on(`guildMemberAdd`, async member => {
  var maze = new Discord.RichEmbed()
    .setColor("GREEN")
    .setTitle(":inbox_tray: Sunucuya yeni bir üye katıldı!")
    .setThumbnail(member.user.avatarURL)
    .setDescription(
      "Hoşgeldin " +
        member +
        " sunucuya hoşgeldin, seninle beraber " +
        member.guild.memberCount +
        " kişiye ulaştık."
    )
    .addField(`:id: Üye ID:`, `${member.id}`, true)
    .addField(`:octagonal_sign: Üye Adı`, `${member}`, true);
  client.channels.get("729096516853301288").send(maze); //Maze yaptı çalanı lucifer yakar, sağlığınız zarar görebilir ^^
});
///////////////////////////////DM Hoşgeldin Mesajı//////////////////////////////
client.on(`guildMemberAdd`, async member => {
  const e = new Discord.RichEmbed()
    .setColor(`RANDOM`)
    .setImage(`https://media.giphy.com/media/A06UFEx8jxEwU/giphy.gif`)
    .addField(
      `Sunucumuza Hoşgeldiniz Şeref Verdiniz Sizleri Buda Görmek Bizi Çok Mutlu Etti Geldiğiniz İçin Teşekkürler❤`,
      `Mesaj`
    )
    .setFooter(`footer mesajı`);
  member.send(e);
});
///////////////////////////////Biri Bir Kanal Silerse Onun Rollerini Alır////////////////////////
client.on("channelDelete", async function(channel) {
  if (channel.guild.id !== "sunucu id") return;
  let logs = await channel.guild.fetchAuditLogs({ type: "CHANNEL_DELETE" });
  if (logs.entries.first().executor.bot) return;
  channel.guild
    .member(logs.entries.first().executor)
    .roles.filter(role => role.name !== "@everyone")
    .array()
    .forEach(role => {
      channel.guild
        .member(logs.entries.first().executor)
        .removeRole(channel.guild.roles.get("alıncak rol 1"));
      channel.guild
        .member(logs.entries.first().executor)
        .removeRole(channel.guild.roles.get("alıncak rol 2"));
    });
  const sChannel = channel.guild.channels.find(c => c.id === "log kanal id");
  const cıks = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(
      `${channel.name} adlı Kanal silindi Silen kişinin yetkilerini  çekiyom moruk çıkssss :tiks:`
    )
    .setFooter("Developer By Mecion");
  sChannel.send(cıks);

  channel.guild.owner.send(
    ` **${channel.name}** adlı Kanal silindi Silen  kişinin yetkilerini aldım:tiks:`
  );
});

///////////////////////////////Seviye Öğrenme////////////////
client.cooldown = new Discord.Collection();
client.config = {
  cooldown: 1 * 1000
};
client.db = require("quick.db");
client.on("message", async message => {
  if (!message.guild || message.author.bot) return;
  // XP
  exp(message);
  function exp(message) {
    if (
      !client.cooldown.has(`${message.author.id}`) ||
      Date.now() - client.cooldown.get(`${message.author.id}`) >
        client.config.cooldown
    ) {
      let exp = client.db.add(`exp_${message.author.id}`, 1);
      let level = Math.floor(0.3 * Math.sqrt(exp));
      let lvl =
        client.db.get(`level_${message.author.id}`) ||
        client.db.set(`level_${message.author.id}`, 1);
      if (level > lvl) {
        let newLevel = client.db.set(`level_${message.author.id}`, level);
        message.channel.send(
          `:tada: ${message.author.toString()}, Level atladın yeni levelin ${newLevel}!`
        );
      }
      client.cooldown.set(`${message.author.id}`, Date.now());
    }
  }
});
//////////////////////////////giriş-çıkış
//client.login("guildMemberAdd", member => {
// let guild = member.guild;
// let joinRole = guild.roles.find("name", "Üye"); // 'Üye' yazılan yeri otomatik rol vereceği rolü yapabilirsiniz.//Otorol Komudu :)
//member.sendMessage("Sunucuya Hoşgeldin Kardeşim."); //Sunucuya Yeni Biri Geldiğinde Mesaj Atar istediğini yaz.
// member.addRole(joinRole);

//const channel = member.guild.channels.find("name", "giriş-çıkış"); // 'gelen-giden' log ismidir. değiştirebilirsiniz. belirttiğiniz isme giriş çıkış gösterecektir.
//if (!channel) return;
//const embed = new Discord.RichEmbed()
//.setColor("0x00cc44")
//.setAuthor(client.user.username, client.user.avatarURL)
//.setThumbnail(member.user.avatarURL)
//.setTitle(`:inbox_tray: ${member.user.username} Sunucuya katıldı.`)
//.setTimestamp();
//channel.sendEmbed(embed);
//});

//client.login("guildMemberRemove", member => {
// const channel = member.guild.channels.find("name", "giriş-çıkış"); // 'gelen-giden' log ismidir. değiştirebilirsiniz. belirttiğiniz isme giriş çıkış gösterecektir.
//if (!channel) return;
//const embed = new Discord.RichEmbed()
//.setColor("0xff1a1a")
//.setAuthor(client.user.username, client.user.avatarURL)
//.setThumbnail(member.user.avatarURL)
// .setTitle(
// `:outbox_tray: ${member.user.username} Sunucudan ayrıldı buna üzüldüm :(`
//)
// .setTimestamp();
//channel.sendEmbed(embed);
//});
//////////////////////////////Afk Komutu
client.on("message", async message => {
  // chimp'∞B#1008
  if (message.channel.type === "dm") return;
  if (
    (await db.fetch(`afk.${message.author.id}.${message.guild.id}`)) ==
    undefined
  )
    return;
  const ms = require("ms");

  if (message.content.length > 2) {
    const sebepp = await db.fetch(
      `sebep.${message.author.id}.${message.guild.id}`
    );
    const sp = await db.fetch(`giriş.${message.author.id}.${message.guild.id}`);
    const asd = await db.fetch(
      `display.${message.author.id}.${message.guild.id}`
    );

    let atılmaay = moment(Date.now() + 10800000).format("MM");
    let atılmagün = moment(Date.now() + 10800000).format("DD");
    let atılmasaat = moment(Date.now() + 10800000).format("HH:mm:ss");
    let atılma = `\`${atılmagün} ${atılmaay
      .replace(/01/, "Ocak")
      .replace(/02/, "Şubat")
      .replace(/03/, "Mart")
      .replace(/04/, "Nisan")
      .replace(/05/, "Mayıs")
      .replace(/06/, "Haziran")
      .replace(/07/, "Temmuz")
      .replace(/08/, "Ağustos")
      .replace(/09/, "Eylül")
      .replace(/10/, "Ekim")
      .replace(/11/, "Kasım")
      .replace(/12/, "Aralık")} ${atılmasaat}\``;

    message.guild.members.get(message.author.id).setNickname(asd);
    message.channel.send(
      new Discord.RichEmbed()
        .setTitle(`${message.author.username}, hoşgeldin!`)
        .setColor("GREEN")
        .setDescription(`Afk modundan başarıyla çıkış yaptın.`)
        .addField("Giriş sebebin:", sebepp)
        .addField("AFK olma zamanın:", sp)
        .addField("Çıkış zamanın:", atılma)
    );
    db.delete(`afk.${message.author.id}.${message.guild.id}`);
    db.delete(`sebep.${message.author.id}.${message.guild.id}`);
    db.delete(`giriş.${message.author.id}.${message.guild.id}`);
    db.delete(`display.${message.author.id}.${message.guild.id}`);
  }
}); // codare ♥
//////////////////////////////giri scikis
//client.on("guildMemberRemove", async member => {
//let resimkanal = JSON.parse(fs.readFileSync("./ayarlar/gç.json", "utf8"));
//const canvaskanal = member.guild.channels.get(resimkanal[member.guild.id].resim);

// if (db.has(`gçkanal_${member.guild.id}`) === false) return;
// var canvaskanal = member.guild.channels.get(
//db.fetch(`gçkanal_${member.guild.id}`)
//);
//if (!canvaskanal) return;

//const request = require("node-superfetch");
//const Canvas = require("canvas"),
//Image = Canvas.Image,
//Font = Canvas.Font,
// path = require("path");

//var randomMsg = ["Sunucudan Ayrıldı."];
//var randomMsg_integer =
// randomMsg[Math.floor(Math.random() * randomMsg.length)];

//let msj = await db.fetch(`cikisM_${member.guild.id}`);
// if (!msj) msj = `{uye}, ${randomMsg_integer}`;

//const canvas = Canvas.createCanvas(640, 360);
// const ctx = canvas.getContext("2d");

//const background = await Canvas.loadImage(
// "https://i.hizliresim.com/Wrn1XW.jpg"
//);
//ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

//ctx.strokeStyle = "#74037b";
// ctx.strokeRect(0, 0, canvas.width, canvas.height);

//ctx.fillStyle = `#D3D3D3`;
// ctx.font = `37px "Warsaw"`;
//ctx.textAlign = "center";
//ctx.fillText(`${member.user.username}`, 300, 342);

// let avatarURL = member.user.avatarURL || member.user.defaultAvatarURL;
//const { body } = await request.get(avatarURL);
// const avatar = await Canvas.loadImage(body);

//ctx.beginPath();
//ctx.lineWidth = 4;
//ctx.fill();
//ctx.lineWidth = 4;
// ctx.arc(250 + 55, 55 + 55, 55, 0, 2 * Math.PI, false);
//ctx.clip();
//ctx.drawImage(avatar, 250, 55, 110, 110);

//const attachment = new Discord.Attachment(
// canvas.toBuffer(),
//"ro-BOT-güle-güle.png"
// );

//canvaskanal.send(attachment);
// canvaskanal.send(
// msj.replace("{uye}", member).replace("{sunucu}", member.guild.name)
//);
//if (member.user.bot)
// return canvaskanal.send(`🤖 Bu bir bot, ${member.user.tag}`);
//});

//client.on("guildMemberAdd", async member => {
// if (db.has(`gçkanal_${member.guild.id}`) === false) return;
//var canvaskanal = member.guild.channels.get(
// db.fetch(`gçkanal_${member.guild.id}`)
//);

//if (!canvaskanal || canvaskanal === undefined) return;
//const request = require("node-superfetch");
//const Canvas = require("canvas"),
//Image = Canvas.Image,
//Font = Canvas.Font,
//path = require("path");

// var randomMsg = ["Sunucuya Katıldı."];
//var randomMsg_integer =
//randomMsg[Math.floor(Math.random() * randomMsg.length)];

//let paket = await db.fetch(`pakets_${member.id}`);
//let msj = await db.fetch(`cikisM_${member.guild.id}`);
//if (!msj) msj = `{uye}, ${randomMsg_integer}`;

//const canvas = Canvas.createCanvas(640, 360);
//const ctx = canvas.getContext("2d");

//const background = await Canvas.loadImage(
// "https://i.hizliresim.com/UyVZ4f.jpg"
//);
//ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

//ctx.strokeStyle = "#74037b";
// ctx.strokeRect(0, 0, canvas.width, canvas.height);

// ctx.fillStyle = `#D3D3D3`;
//ctx.font = `37px "Warsaw"`;
//ctx.textAlign = "center";
//ctx.fillText(`${member.user.username}`, 300, 342);

//let avatarURL = member.user.avatarURL || member.user.defaultAvatarURL;
//const { body } = await request.get(avatarURL);
//const avatar = await Canvas.loadImage(body);

//ctx.beginPath();
//ctx.lineWidth = 4;
//ctx.fill();
//ctx.lineWidth = 4;
//ctx.arc(250 + 55, 55 + 55, 55, 0, 2 * Math.PI, false);
//ctx.clip();
//ctx.drawImage(avatar, 250, 55, 110, 110);

// const attachment = new Discord.Attachment(
//canvas.toBuffer(),
//"ro-BOT-hosgeldin.png"
//);

//canvaskanal.send(attachment);
// canvaskanal.send(
// msj.replace("{uye}", member).replace("{sunucu}", member.guild.name)
//);
//if (member.user.bot)
//return canvaskanal.send(`🤖 Bu bir bot, ${member.user.tag}`);
//});
//////////////////////////////
/////client.on("guildMemberAdd", async member => {
///moment.locale("tr");
///let tarih = moment(member.user.createdAt.getTime()).format("LLL");
////let gün = moment
////.duration(new Date().getTime() - member.user.createdAt.getTime())
///.format("D");
////let resim = new Discord.Attachment(
////"https://cdn.discordapp.com/attachments/713874856143355935/714443923338297364/giphy.gif"
////);
/// let kişi = member.guild.memberCount;
//// let kayıtcırol = "813875678100455425"; //Yetkili rolünüz ID'sini girin.
//// let kanal = client.channels.get("830023039160025128"); //Kanalınızın ID'sini girin.
///// kanal.send(
///`Merhaba <@${member.user.id}> hanedanımıza **hoşgeldin!**\n\nSeninle beraber **${kişi}** kişiyiz.\n\nTagımızı alarak bize destek olabilirsin\n\nHesap kuruluş tarihi; **${tarih}** [**${gün}** gün önce]\n\n${kayıtcırol} sizinle ilgilenecektir.`,
/// resim
/// );
//});

/////////////////////////////
client.on("message", msg => {
  var dm = client.channels.cache.get("830510584159141971"); //mesajın geleceği kanal idsi//
  if (msg.channel.type === "dm") {
    if (msg.author.id === client.user.id) return;
    const botdm = new Discord.MessageEmbed()
      .setTitle(`${client.user.username} Dm`)
      .setTimestamp()
      .setColor("BLUE")
      .setThumbnail(`${msg.author.avatarURL()}`)
      .addField(":boy: Gönderen ", msg.author.tag)
      .addField(":id:  Gönderen ID :", msg.author.id)
      .addField(":globe_with_meridians: Gönderilen Mesaj", msg.content);

    dm.send(botdm);
  }
  if (msg.channel.bot) return;
});
///////////////
////////////////////Sunucu Sayaç
client.on("guildCreate", guild => {
  let ademreyzz_sayi = "100"; //Sayılmasını istediğiniz sunucu sayacı.
  let ademreyzz = "830023039160025128"; //Kanal ID
  var ademreyzz1 = `${ademreyzz_sayi - client.guilds.size}`; //Elleme skerim
  client.channels
    .get(ademreyzz)
    .send(
      `${guild.name} adlı sunucuya eklendim! \`${ademreyzz_sayi}\` sunucu olmamıza \`${ademreyzz1}\` sunucu kaldı!`
    );
});

////////////////////
//////////////gelismis sunucu kur
client.on("message", async message => {
  const ms = require("ms");
  const args = message.content
    .slice(ayarlar.prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();
  let u = message.mentions.users.first() || message.author;
  if (command === ".sunucu-kur") {
    if (
      message.guild.channels.cache.find(
        channel => channel.name === "Bot Kullanımı"
      )
    )
      return message.channel.send(" Bot Paneli Zaten Ayarlanmış.");
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        " Bu Kodu `Yönetici` Yetkisi Olan Kişi Kullanabilir."
      );
    message.channel.send(
      `Bot Bilgi Kanallarının kurulumu başlatılsın mı? başlatılacak ise **evet** yazınız.`
    );
    message.channel
      .awaitMessages(response => response.content === "evet", {
        max: 1,
        time: 10000,
        errors: ["time"]
      })
      .then(collected => {
        message.guild.channels.create("|▬▬|ÖNEMLİ KANALLAR|▬▬|", "category", [
          {
            id: message.guild.id,
            deny: ["SEND_MESSAGES"]
          }
        ]);

        message.guild.channels
          .create("「:page_with_curl:」kurallar", "text", [
            {
              id: message.guild.id,
              deny: ["SEND_MESSAGES"]
            }
          ])
          .then(channel =>
            channel.setParent(
              message.guild.channels.cache.find(
                channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|"
              )
            )
          );
        message.guild.channels
          .create("「:door:」gelen-giden", "text", [
            {
              id: message.guild.id,
              deny: ["SEND_MESSAGES"]
            }
          ])
          .then(channel =>
            channel.setParent(
              message.guild.channels.cache.find(
                channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|"
              )
            )
          );
        message.guild.channels
          .create("「:white_check_mark:」sayaç", "text", [
            {
              id: message.guild.id,
              deny: ["SEND_MESSAGES"]
            }
          ])
          .then(channel =>
            channel.setParent(
              message.guild.channels.cache.find(
                channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|"
              )
            )
          );
        message.guild.channels
          .create("「:floppy_disk:」log-kanalı", "text", [
            {
              id: message.guild.id,
              deny: ["SEND_MESSAGES"]
            }
          ])
          .then(channel =>
            channel.setParent(
              message.guild.channels.cache.find(
                channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|"
              )
            )
          );
        message.guild.channels
          .create("「:loudspeaker:」duyuru-odası", "text", [
            {
              id: message.guild.id,
              deny: ["SEND_MESSAGES"]
            }
          ])
          .then(channel =>
            channel.setParent(
              message.guild.channels.cache.find(
                channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|"
              )
            )
          );
      })
      .then(collected => {
        message.guild.channels.create("|▬▬|GENEL KANALLAR|▬▬|", "category", [
          {
            id: message.guild.id
          }
        ]);
        message.guild.channels
          .create(`「:bulb:」şikayet-ve-öneri`, "text")
          .then(channel =>
            channel.setParent(
              message.guild.channels.cache.find(
                channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|"
              )
            )
          );
        message.guild.channels
          .create(`「👥」pre-arama-odası`, "text")
          .then(channel =>
            channel.setParent(
              message.guild.channels.cache.find(
                channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|"
              )
            )
          );
        message.guild.channels
          .create(`「📷」görsel-içerik`, "text")
          .then(channel =>
            channel.setParent(
              message.guild.channels.cache.find(
                channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|"
              )
            )
          );
        message.guild.channels
          .create(`「🤖」bot-komutları`, "text")
          .then(channel =>
            channel.setParent(
              message.guild.channels.cache.find(
                channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|"
              )
            )
          );
        message.guild.channels
          .create(`「💬」sohbet`, "text")
          .then(channel =>
            channel.setParent(
              message.guild.channels.cache.find(
                channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|"
              )
            )
          );

        message.guild.channels
          .create(`🏆》Kurucu Odası`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.cache.find(
                channel => channel.name === "|▬▬|SES KANALLARI|▬▬|"
              )
            )
          )
          .then(c => {
            let role = message.guild.roles.cache.find("name", "@everyone");
            let role2 = message.guild.roles.cache.find("name", "Kurucu");

            c.createOverwrite(role, {
              CONNECT: false
            });
            c.createOverwrite(role2, {
              CONNECT: true
            });
          });
        message.guild.channels
          .create(`「:bulb:」şikayet-ve-öneri`, "text")
          .then(channel =>
            channel.setParent(
              message.guild.channels.cache.find(
                channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|"
              )
            )
          );
        message.guild.channels
          .create(`「👥」pre-arama-odası`, "text")
          .then(channel =>
            channel.setParent(
              message.guild.channels.cache.find(
                channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|"
              )
            )
          );
        message.guild.channels
          .create(`「📷」görsel-içerik`, "text")
          .then(channel =>
            channel.setParent(
              message.guild.channels.cache.find(
                channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|"
              )
            )
          );
        message.guild.channels
          .create(`「🤖」bot-komutları`, "text")
          .then(channel =>
            channel.setParent(
              message.guild.channels.cache.find(
                channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|"
              )
            )
          );
        message.guild.channels
          .create(`「💬」sohbet`, "text")
          .then(channel =>
            channel.setParent(
              message.guild.channels.cache.find(
                channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|"
              )
            )
          );

        message.guild.channels
          .create(`🏆》Kurucu Odası`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.cache.find(
                channel => channel.name === "|▬▬|SES KANALLARI|▬▬|"
              )
            )
          )
          .then(c => {
            let role = message.guild.roles.cache.find("name", "@everyone");
            let role2 = message.guild.roles.cache.find("name", "Kurucu");

            c.createOverwrite(role, {
              CONNECT: false
            });
            c.createOverwrite(role2, {
              CONNECT: true
            });
          });
        message.guild.channels.create(
          "|鈻柆|SES KANALLARI|鈻柆|",
          "category",
          [
            {
              id: message.guild.id
            }
          ]
        );

        message.guild.channels
          .create(`馃弳銆媃枚netici Odas谋`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.cache.find(
                channel => channel.name === "|鈻柆|SES KANALLARI|鈻柆|"
              )
            )
          )
          .then(c => {
            let role = message.guild.roles.cache.find("name", "@everyone");
            let role2 = message.guild.roles.cache.find("name", "Kurucu");
            let role3 = message.guild.roles.cache.find("name", "Y枚netici");
            c.createOverwrite(role, {
              CONNECT: false
            });
            c.createOverwrite(role2, {
              CONNECT: true
            });
            c.createOverwrite(role3, {
              CONNECT: true
            });
          });

        message.guild.channels
          .create(`馃挰銆婼ohbet Odas谋`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.cache.find(
                channel => channel.name === "|鈻柆|SES KANALLARI|鈻柆|"
              )
            )
          )
          .then(c => {
            let role = message.guild.roles.cache.find("name", "@everyone");
            c.createOverwrite(role, {
              CONNECT: true
            });
          });

        message.guild.channels.create(
          "|鈻柆|OYUN ODALARI|鈻柆|",
          "category",
          [
            {
              id: message.guild.id
            }
          ]
        );
        message.guild.channels
          .create(`:video_game:��LOL`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.cache.find(
                channel => channel.name === "|�7�6�7�6|OYUN ODALARI|�7�6�7�6|"
              )
            )
          );
        message.guild.channels
          .create(`�9�2��ZULA`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.cache.find(
                channel => channel.name === "|�7�6�7�6|OYUN ODALARI|�7�6�7�6|"
              )
            )
          );
        message.guild.channels
          .create(`�9�2��COUNTER STR�0�2KE`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.cache.find(
                channel => channel.name === "|�7�6�7�6|OYUN ODALARI|�7�6�7�6|"
              )
            )
          );
        message.guild.channels
          .create(`�9�2��PUBG`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.cache.find(
                channel => channel.name === "|�7�6�7�6|OYUN ODALARI|�7�6�7�6|"
              )
            )
          );
        message.guild.channels
          .create(`�9�2��FORTN�0�2TE`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.cache.find(
                channel => channel.name === "|�7�6�7�6|OYUN ODALARI|�7�6�7�6|"
              )
            )
          );
        message.guild.channels
          .create(`�9�2��M�0�2NECRAFT`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.cache.find(
                channel => channel.name === "|�7�6�7�6|OYUN ODALARI|�7�6�7�6|"
              )
            )
          );
        message.guild.channels
          .create(`�9�2��ROBLOX`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.cache.find(
                channel => channel.name === "|�7�6�7�6|OYUN ODALARI|�7�6�7�6|"
              )
            )
          );
        message.guild.channels
          .create(`�9�2��WOLFTEAM`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.cache.find(
                channel => channel.name === "|�7�6�7�6|OYUN ODALARI|�7�6�7�6|"
              )
            )
          );
        message.guild.roles.create({
          name: "Kurucu",
          color: "RED",
          permissions: ["ADMINISTRATOR"]
        });

        message.guild.roles.create({
          name: "Y�0�2netici",
          color: "BLUE",
          permissions: [
            "MANAGE_GUILD",
            "MANAGE_ROLES",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
            "MANAGE_MESSAGES",
            "MANAGE_NICKNAMES",
            "KICK_MEMBERS"
          ]
        });

        message.guild.roles.create({
          name: "Moderat�0�2r",
          color: "GREEN",
          permissions: [
            "MANAGE_GUILD",
            "MANAGE_ROLES",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
            "MANAGE_MESSAGES",
            "MANAGE_NICKNAMES"
          ]
        });

        message.guild.roles.create({
          name: "V.I.P",
          color: "00ffff"
        });

        message.guild.roles.create({
          name: "�0�5ye",
          color: "WHITE"
        });

        message.guild.roles.create({
          name: "Bot",
          color: "ORANGE"
        });

        message.channel.send("Gerekli Odalar Kuruldu!");
      });
  }
});

///////////////kız arkadaşyapma
client.on("message", msg => {
  let kelime = msg.content.toLowerCase();
  if (
    kelime === "kız arkadaşım yok" ||
    kelime === "yanlızım" ||
    kelime === "karı kız" ||
    kelime === "kız lazım" ||
    kelime === "manita lazım" ||
    kelime === "sevgili arıyorum" ||
    kelime === "karı karı karı"
  ) {
    msg.reply(
      `**Hey Yıkık Çocuk !**, https://cdn.discordapp.com/attachments/653255820955615239/806876440234688523/ezgif.com-gif-maker_10.gif`
    );
  }
});

////////////////
client.on("guildMemberRemove", async member => {
  //let resimkanal = JSON.parse(fs.readFileSync("./ayarlar/gç.json", "utf8"));
  //const canvaskanal = member.guild.channels.cache.get(resimkanal[member.guild.id].resim);

  if (db.has(`gçkanal_${member.guild.id}`) === false) return;
  var canvaskanal = member.guild.channels.cache.get(
    db.fetch(`gçkanal_${member.guild.id}`)
  );
  if (!canvaskanal) return;

  const request = require("node-superfetch");
  const Canvas = require("canvas"),
    Image = Canvas.Image,
    Font = Canvas.Font,
    path = require("path");

  var randomMsg = [""];
  var randomMsg_integer =
    randomMsg[Math.floor(Math.random() * randomMsg.length)];

  let msj = await db.fetch(`cikisM_${member.guild.id}`);
  if (!msj) msj = ``;

  const canvas = Canvas.createCanvas(640, 360);
  const ctx = canvas.getContext("2d");

  const background = await Canvas.loadImage(
    "https://cdn.discordapp.com/attachments/813881989778112562/836824107744100352/PicsArt_04-28-07.39.44.jpg"
  );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#74037b";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = `#ffffff`;
  ctx.font = `37px "Warsaw"`;
  ctx.textAlign = "center";
  ctx.fillText(`${member.user.username}`, 300, 342);

  let avatarURL = member.user.displayAvatarURL({
    format: "png",
    dynamic: true,
    size: 1024
  });
  const { body } = await request.get(avatarURL);
  const avatar = await Canvas.loadImage(body);

  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.arc(310, 175, 100, 0, Math.PI * 2, true);
  ctx.clip();
  ctx.drawImage(avatar, 210, 75, 200, 200);

  const attachment = new Discord.MessageAttachment(
    canvas.toBuffer(),
    "ro-BOT-güle-güle.png"
  );

  canvaskanal.send(attachment);
  if (member.user.bot)
    return canvaskanal.send(`Bir Bot Sunucudan Ayrıldı, ${member.user.tag}`);
});

client.on("guildMemberAdd", async member => {
  if (db.has(`gçkanal_${member.guild.id}`) === false) return;
  var canvaskanal = member.guild.channels.cache.get(
    db.fetch(`gçkanal_${member.guild.id}`)
  );

  if (!canvaskanal || canvaskanal === undefined) return;
  const request = require("node-superfetch");
  const Canvas = require("canvas"),
    Image = Canvas.Image,
    Font = Canvas.Font,
    path = require("path");

  var randomMsg = [""];
  var randomMsg_integer =
    randomMsg[Math.floor(Math.random() * randomMsg.length)];

  let paket = await db.fetch(`pakets_${member.id}`);
  let msj = await db.fetch(`cikisM_${member.guild.id}`);
  if (!msj) msj = ``;

  const canvas = Canvas.createCanvas(640, 360);
  const ctx = canvas.getContext("2d");

  const background = await Canvas.loadImage(
    "https://cdn.discordapp.com/attachments/813881989778112562/836824107340660776/PicsArt_04-28-07.39.20.jpg"
  );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#74037b";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = `#ffffff`;
  ctx.font = `37px "Warsaw"`;
  ctx.textAlign = "center";
  ctx.fillText(`${member.user.username}`, 310, 320);

  let avatarURL = member.user.displayAvatarURL({
    format: "png",
    dynamic: true,
    size: 1024
  });
  const { body } = await request.get(avatarURL);
  const avatar = await Canvas.loadImage(body);

  ctx.beginPath();
  ctx.lineWidth = 0;
  ctx.fill();
  ctx.lineWidth = 0;
  ctx.arc(310, 175, 100, 0, Math.PI * 2, true);
  ctx.clip();
  ctx.drawImage(avatar, 210, 75, 200, 200);

  const attachment = new Discord.MessageAttachment(
    canvas.toBuffer(),
    "Adem-Reyzz-Bot-hosgeldin.png"
  );

  canvaskanal.send(attachment);
  if (member.user.bot)
    return canvaskanal.send(`Sunucuya Bir Bot Girdi ${member.user.tag}`);
});
////////////
client.on("guildMemberRemove", async member => {
  //let resimkanal = JSON.parse(fs.readFileSync("./ayarlar/gç.json", "utf8"));
  //const canvaskanal = member.guild.channels.get(resimkanal[member.guild.id].resim);

  if (db.has(`gçkanal_${member.guild.id}`) === false) return;
  var canvaskanal = member.guild.channels.get(
    db.fetch(`gçkanal_${member.guild.id}`)
  );
  if (!canvaskanal) return;

  const request = require("node-superfetch");
  const Canvas = require("canvas"),
    Image = Canvas.Image,
    Font = Canvas.Font,
    path = require("path");

  var randomMsg = [""];
  var randomMsg_integer =
    randomMsg[Math.floor(Math.random() * randomMsg.length)];

  let msj = await db.fetch(`cikisM_${member.guild.id}`);
  if (!msj) msj = `{uye}, ${randomMsg_integer}`;

  const canvas = Canvas.createCanvas(640, 360);
  const ctx = canvas.getContext("2d");

  const background = await Canvas.loadImage(
    "https://cdn.discordapp.com/attachments/813881989778112562/836756865521942558/PicsArt_04-28-03.12.23.jpg"
  );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#74037b";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = `#D3D3D3`;
  ctx.font = `37px "Warsaw"`;
  ctx.textAlign = "center";
  ctx.fillText(`${member.user.username}`, 300, 342);

  let avatarURL = member.user.displayAvatarURL({
    format: "png",
    dynamic: true,
    size: 1024
  });
  const { body } = await request.get(avatarURL);
  const avatar = await Canvas.loadImage(body);

  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.arc(250 + 55, 55 + 55, 55, 0, 2 * Math.PI, false);
  ctx.clip();
  ctx.drawImage(avatar, 250, 55, 110, 110);

  const attachment = new Discord.Attachment(
    canvas.toBuffer(),
    "ro-BOT-güle-güle.png"
  );

  canvaskanal.sendFileFilesCodeEmbedMessage(attachment);
  canvaskanal.sendFileFilesCodeEmbedMessage(
    msj.replace("{uye}", member).replace("{sunucu}", member.guild.name)
  );
  if (member.user.bot)
    return canvaskanal.sendFileFilesCodeEmbedMessage(
      `🤖 Bu bir bot, ${member.user.tag}`
    );
});

client.on("guildMemberAdd", async member => {
  if (db.has(`gçkanal_${member.guild.id}`) === false) return;
  var canvaskanal = member.guild.channels.get(
    db.fetch(`gçkanal_${member.guild.id}`)
  );

  if (!canvaskanal || canvaskanal === undefined) return;
  const request = require("node-superfetch");
  const Canvas = require("canvas"),
    Image = Canvas.Image,
    Font = Canvas.Font,
    path = require("path");

  var randomMsg = [""];
  var randomMsg_integer =
    randomMsg[Math.floor(Math.random() * randomMsg.length)];

  let paket = await db.fetch(`pakets_${member.id}`);
  let msj = await db.fetch(`cikisM_${member.guild.id}`);
  if (!msj) msj = `{uye}, ${randomMsg_integer}`;

  const canvas = Canvas.createCanvas(640, 360);
  const ctx = canvas.getContext("2d");

  const background = await Canvas.loadImage(
    "https://cdn.discordapp.com/attachments/813881989778112562/836756865101856778/PicsArt_04-28-03.08.48.jpg"
  );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#74037b";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = `#ffffff`;
  ctx.font = `37px "Warsaw"`;
  ctx.textAlign = "center";
  ctx.fillText(`${member.user.username}`, 300, 342);

  let avatarURL = member.user.displayAvatarURL({
    format: "png",
    dynamic: true,
    size: 1024
  });
  const { body } = await request.get(avatarURL);
  const avatar = await Canvas.loadImage(body);

  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.arc(250 + 55, 55 + 55, 55, 0, 2 * Math.PI, false);
  ctx.clip();
  ctx.drawImage(avatar, 250, 55, 110, 110);

  const attachment = new Discord.Attachment(
    canvas.toBuffer(),
    "https://cdn.discordapp.com/attachments/813881989778112562/836756865101856778/PicsArt_04-28-03.08.48.jpg"
  );

  canvaskanal.sendFileFilesCodeEmbedMessage(attachment);
  canvaskanal.sendFileFilesCodeEmbedMessage(
    msj.replace("{uye}", member).replace("{sunucu}", member.guild.name)
  );
  if (member.user.bot)
    return canvaskanal.sendFileFilesCodeEmbedMessage(
      `🤖 Bu bir bot, ${member.user.tag}`
    );
});
//////////
client.on("message", async message => {
  let gold = db.fetch(`gold_${message.author.id}`);
  if (gold === "gold") {
    if (message.content.toLowerCase() === "sa") {
      return message.channel.send(
        "**O Bir Premium üye.Aleyküm selam Hoşgeldin.**"
      );
    } else {
      return;
    }
  }
});
///////////Mute
client.on("roleDelete", async role => {
  const data = await require("quick.db").fetch(
    `carl-mute-role.${role.guild.id}`
  );
  if (data && data === role.id)
    require("quick.db").delete(`carl-mute-role.${role.guild.id}`);
});
///////muzik
const YouTube = require("simple-youtube-api");
const youtube = new YouTube("AIzaSyBNv7r7njLNxLGTEglWVKent2hc_RkEMR0");
const queue = new Map();

client.on("message", async msg => {
  if (msg.author.bot) return undefined;

  const args = msg.content.split(" ");
  const searchString = args.slice(1).join(" ");
  const url = args[1] ? args[1].replace(/<(.+)>/g, "$1") : "";
  const serverQueue = queue.get(msg.guild.id);
  let command = msg.content.toLowerCase().split(" ")[0];

  if (command === "a!çal") {
    const voiceChannel = msg.member.voiceChannel;
    if (!voiceChannel)
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setColor("RANDOM")
          .setDescription("❎ | Lütfen Seli Bir Kanala Giriş Yapınız!")
      );
    const permissions = voiceChannel.permissionsFor(msg.client.user);
    if (!permissions.has("CONNECT")) {
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setColor("RANDOM")
          .setTitle("❎ | Lütfen Seli Bir Kanala Giriş Yapınız!")
      );
    }
    if (!permissions.has("SPEAK")) {
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setColor("RANDOM")
          .setTitle("❎ | Şarkıyı Çalamıyorum Bu Kanalda Konuşma Yetkim Yok!")
      );
    }

    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
      const playlist = await youtube.getPlaylist(url);
      const videos = await playlist.getVideos();
      for (const video of Object.values(videos)) {
        const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
        await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
      }
      return msg.channel
        .sendEmbed(new Discord.RichEmbed())
        .setTitle(`✅** | **${playlist.title}** Adlı Şarkı Kuyruğa Eklendi!**`);
    } else {
      try {
        var video = await youtube.getVideo(url);
      } catch (error) {
        try {
          var videos = await youtube.searchVideos(searchString, 10);
          let index = 0;

          msg.channel.sendEmbed(
            new Discord.RichEmbed()
              .setTitle("Şarkı Seçimi")
              .setDescription(
                `${videos
                  .map(video2 => `**${++index} -** ${video2.title}`)
                  .join("\n")}`
              )
              .setFooter(
                "Lütfen 1-10 Arasında Bir Rakam Seçiniz 10 Saniye İçinde Liste İptal Edilecektir!"
              )
              .setFooter("Örnek Kullanım 1")
              .setColor("0x36393E")
          );
          msg.delete(5000);
          try {
            var response = await msg.channel.awaitMessages(
              msg2 => msg2.content > 0 && msg2.content < 11,
              {
                maxMatches: 1,
                time: 10000,
                errors: ["time"]
              }
            );
          } catch (err) {
            console.error(err);
            return msg.channel.sendEmbed(
              new Discord.RichEmbed()
                .setColor("0x36393E")
                .setDescription(
                  "❎ | **10 Saniye İçinde Şarkı Seçmediğiniz İçin seçim İptal Edilmiştir!**."
                )
            );
          }
          const videoIndex = parseInt(response.first().content);
          var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
        } catch (err) {
          console.error(err);
          return msg.channel.sendEmbed(
            new Discord.RichEmbed()
              .setColor("0x36393E")
              .setDescription("❎ | YouTubede Böyle Bir Şarkı Yok !**")
          );
        }
      }
      return handleVideo(video, msg, voiceChannel);
    }
  } else if (command === "a!gir") {
    return new Promise((resolve, reject) => {
      const voiceChannel = msg.member.voiceChannel;
      if (!voiceChannel || voiceChannel.type !== "voice")
        return msg.reply("Kanalda Kimse Olmadığından Çıkıyorum!");
      voiceChannel
        .join()
        .then(connection => resolve(connection))
        .catch(err => reject(err));
    });
  } else if (command === "a!geç") {
    if (!msg.member.voiceChannel)
      if (!msg.member.voiceChannel)
        return msg.channel.sendEmbed(
          new Discord.RichEmbed()
            .setColor("RANDOM")
            .setDescription("❎ | Lütfen Seli Bir Kanala Giriş Yapınız!")
        );
    if (!serverQueue)
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setColor("RANDOM")
          .setTitle("❎ **Şu An Zaten Şarkı Çalmıyorum!")
      );
    serverQueue.connection.dispatcher.end("**Sıradaki Şarkıya Geçildi!**");
    return undefined;
  } else if (command === "a!durdur") {
    if (!msg.member.voiceChannel)
      if (!msg.member.voiceChannel)
        return msg.channel.sendEmbed(
          new Discord.RichEmbed()
            .setColor("RANDOM")
            .setDescription("❎ | Lütfen Seli Bir Kanala Giriş Yapınız!")
        );
    if (!serverQueue)
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setColor("RANDOM")
          .setTitle("❎ | Şu An Zaten Şarkı Çalmıyorum!")
      );
    msg.channel.send(
      `:stop_button: **${serverQueue.songs[0].title}** Adlı Şarkı Durduruldu`
    );
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end("**Şarkı Bitti**");
    return undefined;
  } else if (command === "a!ses") {
    if (!msg.member.voiceChannel)
      if (!msg.member.voiceChannel)
        return msg.channel.sendEmbed(
          new Discord.RichEmbed()
            .setColor("RANDOM")
            .setDescription("❎ | Lütfen Seli Bir Kanala Giriş Yapınız!")
        );
    if (!serverQueue)
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setColor("RANDOM")
          .setTitle("❎ | Çalmayan Müziğin Sesine Bakamam")
      );
    if (!args[1])
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setTitle(
            `:loud_sound: Şuanki Ses Seviyesi: **${serverQueue.volume}**`
          )
          .setColor("RANDOM")
      );
    serverQueue.volume = args[1];
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
    return msg.channel.sendEmbed(
      new Discord.RichEmbed()
        .setTitle(`:loud_sound: Ses Seviyesi Ayarlanıyor: **${args[1]}**`)
        .setColor("RANDOM")
    );
  } else if (command === "a!çalan") {
    if (!serverQueue)
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setTitle("❎ | Şu An Şarkı Çalınmıyor!")
          .setColor("RANDOM")
      );
    return msg.channel.sendEmbed(
      new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle("Çalan")
        .addField(
          "Başlık",
          `[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})`,
          true
        )
        .addField(
          "Süre",
          `${serverQueue.songs[0].durationm}:${serverQueue.songs[0].durations}`,
          true
        )
    );
  } else if (command === "a!sıra") {
    let index = 0;
    if (!serverQueue)
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setTitle("❎ | **Şarkı Kuyruğunda Şarkı Bulunmamakta**")
          .setColor("RANDOM")
      );
    return msg.channel
      .sendEmbed(
        new Discord.RichEmbed()
          .setColor("RANDOM")
          .setTitle("Şarkı Kuyruğu")
          .setDescription(
            `${serverQueue.songs
              .map(song => `**${++index} -** ${song.title}`)
              .join("\n")}`
          )
      )
      .addField("Şu Anda Çalınan: " + `${serverQueue.songs[0].title}`);
  } else if (command === "a!duraklat") {
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause();
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setTitle("**:pause_button: Şarkı Durduruldu!**")
          .setColor("RANDOM")
      );
    }
    return msg.channel.send("❎ | **Şarkı Çalmıyor Şu An**");
  } else if (command === "a!devam") {
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setTitle("**:arrow_forward: Şarkı Devam Ediyor!**")
          .setColor("RANDOM")
      );
    }
    return msg.channel.sendEmbed(
      new Discord.RichEmbed()
        .setTitle("**❎ | Şu An Şarkı Çalınmıyor!**")
        .setColor("RANDOM")
    );
  }

  return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
  const serverQueue = queue.get(msg.guild.id);
  console.log(video);
  const song = {
    id: video.id,
    title: video.title,
    url: `https://www.youtube.com/watch?v=${video.id}`,
    durationh: video.duration.hours,
    durationm: video.duration.minutes,
    durations: video.duration.seconds,
    views: video.views
  };
  if (!serverQueue) {
    const queueConstruct = {
      textChannel: msg.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };
    queue.set(msg.guild.id, queueConstruct);

    queueConstruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueConstruct.connection = connection;
      play(msg.guild, queueConstruct.songs[0]);
    } catch (error) {
      console.error(
        `❎ | **Şarkı Sisteminde Problem Var Hata Nedeni: ${error}**`
      );
      queue.delete(msg.guild.id);
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setTitle(
            `❎ | **Şarkı Sisteminde Problem Var Hata Nedeni: ${error}**`
          )
          .setColor("RANDOM")
      );
    }
  } else {
    serverQueue.songs.push(song);
    console.log(serverQueue.songs);
    if (playlist) return undefined;
    return msg.channel.sendEmbed(
      new Discord.RichEmbed()
        .setTitle(`✅ | **${song.title}** Adlı Şarkı Kuyruğa Eklendi!`)
        .setColor("RANDOM")
    );
  }
  return undefined;
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);

  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }
  console.log(serverQueue.songs);

  const dispatcher = serverQueue.connection
    .playStream(ytdl(song.url))
    .on("end", reason => {
      if (reason === "❎ | **Yayın Akış Hızı Yeterli Değil.**")
        console.log("Şarkı Bitti.");
      else console.log(reason);
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

  serverQueue.textChannel.sendEmbed(
    new Discord.RichEmbed()
      .setTitle("**🎙 Şarkı Başladı**", `https://i.hizliresim.com/RDm4EZ.png`)
      .setThumbnail(
        `https://i.ytimg.com/vi/${song.id}/default.jpg?width=80&height=60`
      )
      .addField("\nBaşlık", `[${song.title}](${song.url})`, true)
      .addField("\nSes Seviyesi", `${serverQueue.volume}%`, true)
      .addField("Süre", `${song.durationm}:${song.durations}`, true)
      .setColor("RANDOM")
  );
}
