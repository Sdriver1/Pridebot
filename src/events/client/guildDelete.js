const { EmbedBuilder } = require("discord.js");

module.exports = async (client, guild) => {
  if (!guild.available) {
    return;
  }

  const channel = client.channels.cache.get("1112590962867310602");
  const name = guild.name || "undefined";
  const serverID = guild.id || "undefined";
  const memberCount = guild.memberCount || "undefined";
  const ownerID = guild.ownerId || "undefined";
  const currentGuildCount = client.guilds.cache.size;
  let totalUserCount = 0;

  client.guilds.cache.forEach((guild) => {
    totalUserCount += guild.memberCount;
  });

  const embed = new EmbedBuilder()
    .setColor("FF00EA")
    .setTitle(`❌ Left Server`)
    .addFields(
      {
        name: "<:_:1112602480128299079> Server Info",
        value: `**Server Name:** **${name}** (\`${serverID}\`)\n**Server Owner:** <@${ownerID}> (\`${ownerID}\`) \n**Member Count:** \`${memberCount}\` \n**Server Creation:** <t:${parseInt(
          guild.createdTimestamp / 1000
        )}:R> \n**Joined:** <t:${parseInt(
          guild.joinedTimestamp / 1000
        )}:F> (<t:${parseInt(guild.joinedTimestamp / 1000)}:R>)`,
      },
      {
        name: "<:_:1112602480128299079> Bot Info",
        value: `**Total # of guild:** \`${currentGuildCount}\` \n**Total user count**: \`${totalUserCount}\``,
      }
    )
    .setTimestamp()
    .setFooter({ text: `${serverID}` });

  if (channel) {
    await channel.send({ embeds: [embed] });
  } else {
    console.error(`Channel with ID ${channelId} not found.`);
  }
};
