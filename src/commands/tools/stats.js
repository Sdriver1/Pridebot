const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stats")
    .setDescription("Get the bot's stats"),
  
  async execute(interaction, client) {
    const message = await interaction.deferReply({ fetchReply: true });

    const ping = message.createdTimestamp - interaction.createdTimestamp;
    const discVer = interaction.client.application?.version || 'Unknown Version';
    
    const bot = `**Uptime:** \`${formatUptime(process.uptime())} \` \n**Start Time:** \`${formatTimestamp(client.botStartTime)}\` \n**Ping**: \`${ping}\`\n **Version:** \`In Development\``;
    const discord = `**API Latency**: \`${client.ws.ping}\` \n**Discord Version:** \`${discVer}\``;
    
    const options = { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    const response = await axios.get('https://discordstatus.com/api/v2/incidents.json');
    const data = response.data;
    const incident = data.incidents[0];
    
    let DiscordApiIncident = 'No incidents found';
    if (incident && incident.created_at) {
      const created_at = new Date(incident.created_at).toLocaleString('en-US', options);
      const formattedDate = new Date(incident.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
      DiscordApiIncident = `${formattedDate} - [${incident.name}](${data.page.url}/incidents/${incident.id})`;
    }
    
    var embed = new EmbedBuilder()
      .setColor(0x5865F2)
      .addFields(
        { name: '<:_:1108228682184654908> __Bot Stats__', value: bot, inline: true },
        { name: '<:_:1108417509624926228> __Discord Stats__', value: discord, inline: true },
        { name: '<:_:1108421476148859010> __Latest Discord API Incident__', value: DiscordApiIncident, inline: false },
      );
        
    await interaction.editReply({ embeds: [embed] });
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

  return parts.join(' ');
}

function formatTimestamp(timestamp) {
  const dateObj = new Date(timestamp);
  if (isNaN(dateObj)) {
    // Handle the specific format of the incident timestamp
    const dateMatch = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(timestamp);
    if (dateMatch) {
      const [_, year, month, day, hour, minute] = dateMatch;
      return `${year}-${padZero(month)}-${padZero(day)} ${padZero(hour)}:${padZero(minute)}`;
    }
    return "Invalid Date";
  }
  return dateObj.toLocaleString(); // Adjust the format of the timestamp as desired
}

function padZero(value) {
  return value.toString().padStart(2, '0');
  }