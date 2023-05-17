const { SlashCommandBuilder } = require("discord.js");

let botStartTime; // Variable to store the bot's start time

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stats")
    .setDescription("Get Bot and Discord Stats"),
  async execute(interaction, client) {
    const uptime = process.uptime();
    const discordVersion = client.application?.version || "Unknown";
    const time = formatUptime(uptime);
    const message = await interaction.deferReply({
      fetchReply: true,
    });

    if (!botStartTime) {
      botStartTime = new Date(); // Set the bot's start time if it hasn't been set before
    }

    interaction.editReply({
      embeds: [
        {
          title: `Bot and Discord Stats`,
          fields: [
            {
              name: `<:_:1108228682184654908> Bot Stats`,
              value: `**Bot Uptime:** \`${time}\` \n**Start Time:** \`${formatTimestamp(botStartTime)}\` \n**Bot Ping:** \`${
                message.createdTimestamp - interaction.createdTimestamp
              }\``,
              inline: true,
            },
            {
              name: `📊 Discord Stats`,
              value: `**API Latency:** \`${client.ws.ping}\`\n**Discord Version:** \`${discordVersion}\``,
              inline: true,
            },
          ],
          color: parseInt("0x00ff00", 16),
          footer: {
            text: "🌈Pridebot Stats",
          },
          timestamp: new Date(),
        },
      ],
    });
  },
};

function formatUptime(time) {
  const days = Math.floor(time / (3600 * 24));
  const hours = Math.floor((time % (3600 * 24)) / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);

  const parts = [];
  if (days) parts.push(`${days} day(s)`);
  if (hours) parts.push(`${hours} hour(s)`);
  if (minutes) parts.push(`${minutes} minute(s)`);
  if (seconds) parts.push(`${seconds} second(s)`);

  return parts.join(" ");
}

function formatTimestamp(timestamp) {
  return timestamp.toLocaleString(); // Adjust the format of the timestamp as desired
}
