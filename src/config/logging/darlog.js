const { EmbedBuilder } = require("discord.js");

const darlogging = async (client, meterType, userName, meter, userId) => {
  const channelId = "1286437229920780371";
  const channel = client.channels.cache.get(channelId);

  let specialMessage = "";
  let embedColor = 0xff00ae;

  if (meter > 500 || meter < -500) {
    specialMessage = `<@691506668781174824> WE HAVE A WIN!`;
    embedColor = 0xffd700;
  }

  const embed = new EmbedBuilder()
    .setTitle(`${meterType} Meter Result`)
    .setDescription(
      `**User:** <@${userId}> (${userName})\n**Meter:** ${meter}%`
    )
    .setColor(embedColor)
    .setTimestamp();

  if (channel) {
    if (specialMessage) {
      await channel.send(specialMessage);
    }
    await channel.send({ embeds: [embed] });
  } else {
    console.error(`Channel with ID ${channelId} not found.`);
  }
};

module.exports = darlogging
