const { EmbedBuilder } = require("discord.js");

module.exports = async (client, guild) => {
  const channel = client.channels.cache.get("1112590962867310602");
  const name = guild.name;
  const serverID = guild.id;
  const memberCount = guild.memberCount;
  const ownerID = guild.ownerId;

  const currentGuildCount = client.guilds.cache.size;
  let totalUserCount = 0;
  client.guilds.cache.forEach((guild) => {
    totalUserCount += guild.memberCount;
  });

  const embed = new EmbedBuilder()
    .setColor("FF00EA")
    .setTitle(`👋 New Server Joined`)
    .setFields(
      {
        name: "<:_:1112602480128299079> Server Info",
        value: `**Server Name:** **${name}** (\`${serverID}\`) \n**Server Owner:** <@${ownerID}> (\`${ownerID}\`) \n**Member Count:** \`${memberCount}\`\n**Server Creation:** <t:${parseInt(
          guild.createdTimestamp / 1000
        )}:F> (<t:${parseInt(guild.createdTimestamp / 1000)}:R>)`,
      },
      {
        name: "<:_:1112602480128299079> Bot Info",
        value: `**Total # of guild:** \`${currentGuildCount}\` \n**Total user count**: \`${totalUserCount}\``,
      }
    )
    .setTimestamp()
    .setFooter({ text: `${serverID}` });

  await channel.send({ embeds: [embed] });
};
