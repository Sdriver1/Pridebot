const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stats")
    .setDescription("Get the bot's uptime"),
  async execute(interaction, client) {
    const uptime = process.uptime();
    const discordVersion = interaction.client.options.http.version;
    const time = formatUptime(uptime);
    const message = await interaction.deferReply({
      fetchReply: true,
    });

    await interaction.reply({
      embeds: [
        {
          title: `Bot and Discord Stats`,
          fields: [
            {
              name: `Bot Stats`,
              value: `**Bot Uptime:** \`${time}\` \n**Bot Ping** \`${
                message.createdTimestamp - interaction.createdTimestamp
              }\``,
            },
            {
              name: `Discord Stats`,
              value: `**API Latency**: \`${client.ws.ping}\`\n**Discord Version**: \`${discordVersion}\``,
            },
          ],
          color: parseInt("0x00ff00", 16), // changed the color value to a valid number
          footer: {
            text: "🌈Pridebot Stats at",
          },
          timestamp: 1684287789286,
        },
      ],
    });
    await interaction.editReply({
      content: message,
    });
  },
};

function formatUptime(time) {
  const days = Math.floor(time / (3600 * 24));
  const hours = Math.floor((time % (3600 * 24)) / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);

  const parts = [];
  if (days) parts.push(`${days}day(s)`);
  if (hours) parts.push(`${hours}hour(s)`);
  if (minutes) parts.push(`${minutes}minute(s)`);
  if (seconds) parts.push(`${seconds}second(s)`);

  return parts.join(" ");
}
