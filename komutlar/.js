client.on("message", message => {

const voiceChannels = message.guild.channels.cache.filter(c => c.type === 'voice');
    let count = 0;
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
      
    if(message.content.toLowerCase() === '--say') {
        const say = new MessageEmbed()
      
        .setTitle('Sunucunun İstatistiği')
        .setColor('RED')
        .addField(`Sunucunun toplam üye sayısı :`,message.guild.memberCount)
        .addField("Çevrimiçi üye sayısı",message.guild.members.cache.filter(m => !m.user.bot && m.user.presence.status == "online").size)
        .addField("Rahatsız etmeyin üye sayısı",message.guild.members.cache.filter(m => !m.user.bot && m.user.presence.status == "dnd").size)
        .addField(`Bot sayısı :`,message.guild.members.cache.filter(m => m.user.bot).size)
        .addField(`Seslide ki üye sayısı :`,count)
        .addField("Çevrimdışı üye sayısı",message.guild.members.cache.filter(m => !m.user.bot && m.user.presence.status == "offline").size)
        .setThumbnail(message.author.avatarURL({dynamic : true}))
        .setFooter('Sunucunun istatistikleri')
        message.channel.send(say)
    }
});

Çalışması için bu kodları botunuzun ana dosyasına atmanız gerekmektedir. --say kısmını istediğiniz şeyle değiştirebilirsiniz. O kısım komutu çalıştıran kısımdır.

Örnek Resim :
bandicam 2020-12-23 23-08-20-290.jpg
Beğen Tepkiler:Rospia ve xrandson
 Beğen Alıntı CevaplaRaporla
xrandson
xrandson
Katılım
18 Kas 2020
Mesajlar
514
Tepki puanı
254
Puanları
3,460
23 Ara 2020
Yer imlerine ekle
#2
Böyle yararlı konular görünce mutlu oluyorum, eline emeğine sağlık.
 Beğen Alıntı CevaplaRaporla
avnnn
avnnn
Yazar
Katılım
16 Şub 2020
Mesajlar
638
Tepki puanı
697
Puanları
3,610
23 Ara 2020
Yer imlerine ekle
#3
Kod düzeltildi.

1608754323268.png
1608754343215.png

Konunu açarken buradan kod şablonunu ekleyebilirsin.
 Beğen Alıntı CevaplaRaporla
Atlantis
Atlantis
Katılım
6 Kas 2020
Mesajlar
52
Tepki puanı
52
Puanları
660
23 Ara 2020
Yer imlerine ekle
#4
Deucalion' Alıntı:
Böyle yararlı konular görünce mutlu oluyorum, eline emeğine sağlık.
teşekkürler , devamı yolda :D
Beğen Tepkiler:xrandson
 Beğen Alıntı CevaplaRaporla
Atlantis
Atlantis
Katılım
6 Kas 2020
Mesajlar
52
Tepki puanı
52
Puanları
660
23 Ara 2020
Yer imlerine ekle
#5
Deucalion' Alıntı:
Böyle yararlı konular görünce mutlu oluyorum, eline emeğine sağlık.
teşekkürler :D
avnnn' Alıntı:
Kod düzeltildi.

Ekli dosyayı görüntüle 3475
Ekli dosyayı görüntüle 3476

Konunu açarken buradan kod şablonunu ekleyebilirsin.
tamam denerim
Beğen Tepkiler:xrandson
 Beğen Alıntı CevaplaRaporla
gears0000
gears0000
Katılım
9 Ara 2020
Mesajlar
253
Tepki puanı
206
Puanları
1,610
23 Ara 2020
Yer imlerine ekle
#6

Eline sağlık​
Beğen Tepkiler:Atlantis
 Beğen Alıntı CevaplaRaporla
Gorkem0
Gorkem0
Katılım
17 Mar 2020
Mesajlar
451
Tepki puanı
291
Puanları
2,560
24 Ara 2020
Yer imlerine ekle
#7
Bu kod çoğu botlarda olmayan bir kod bence her botta olması gerek.
Beğen Tepkiler:Atlantis
 Beğen Alıntı CevaplaRaporla



Bu alana bir cevap yazın...

Cevap yaz
Dosya ekle
Paylaş:
Facebook 