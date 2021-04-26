module.exports = (client, Tags, Embed, Discord) => {

client.on('guildMemberAdd', async member => {
  
  const tag = await Tags.findOne({ where: { guild_id: member.guldi.id } });
  const data = tag.get("welcome_message");
  
  if (data.enabled) {
    const channel = member.guild.channels.cache.get(data.channel_id);
    if (!channel) return;
    const text = data.message.replace('%kullanıcı%', member.displayName).replace("%toplam_üye%", member.guild.memberCount);
    
    
    
    channel.send(text);
    }
  })