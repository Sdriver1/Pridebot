const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");
const cheerio = require("cheerio");

let botStartTime; // Variable to store the bot's start time

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stats")
    .setDescription("Get Bot and Discord Stats"),
  async execute(interaction) {
    const uptime = process.uptime();
    const time = formatUptime(uptime);
    const message = await interaction.deferReply({
      fetchReply: true,
    });

    if (!botStartTime) {
      botStartTime = new Date(); // Set the bot's start time if it hasn't been set before
    }

    const discordVersion =
      interaction.client.application?.version || "Unknown Version";

    try {
      const response = await axios.get(
        "https://discordstatus.com/incidents/6xgts6fdwnr7"
      );
      const html = response.data;

      const $ = cheerio.load(html);
      const incidentTime = $(".incident-time .timestamp").text().trim();
      const incidentDescription = $(".incident-name").text().trim();
      const incidentTimestamp = formatTimestamp(incidentTime);

      interaction.editReply({
        embeds: [
          {
            title: `Bot and Discord Stats`,
            fields: [
              {
                name: `<:_:1108228682184654908> Bot Stats`,
                value: `**Bot Uptime:** \`${time}\` \n**Start Time:** \`${formatTimestamp(
                  botStartTime
                )}\` \n**Bot Ping:** \`${
                  message.createdTimestamp - interaction.createdTimestamp
                }\``,
                inline: true,
              },
              {
                name: `📊 Discord Stats`,
                value: `**API Latency:** \`${interaction.client.ws.ping}\`\n**Discord Version:** \`${discordVersion}\``,
                inline: true,
              },
              {
                name: `⚠️ Latest Discord Incident`,
                value: `**When:** \`${incidentTimestamp}\` \n**Description:** \`${incidentDescription}\``,
                inline: false,
              },
            ],
            color: 0x00ff00,
            footer: {
              text: "🌈Pridebot Stats",
            },
            timestamp: new Date(),
          },
        ],
      });
    } catch (error) {
      console.error("Failed to fetch incident data:", error);
      interaction.editReply("An error occurred while fetching incident data.");
    }
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
    const dateObj = new Date(timestamp);
    if (dateObj.toString() === "Invalid Date") {
      // Handle the specific format of the incident timestamp
      const [year, month, day, hour, minute] = timestamp.split(/[:T-]/);
      return `${year}-${padZero(month)}-${padZero(day)} ${padZero(hour)}:${padZero(minute)}`;
    }
    return dateObj.toLocaleString(); // Adjust the format of the timestamp as desired
  }
  
  function padZero(value) {
    return String(value).padStart(2, "0");
  }
  
