const { ChannelType } = require("discord.js");
const axios = require("axios");

const updateChannelName = async (client) => {
  try {
    const response = await axios.get("https://api.pridebot.xyz/api/stats");
    const stats = response.data;

    const guildsCount = stats.currentGuildCount;
    const usersCount = stats.totalUserCount;
    const registeredCommandsCount = stats.commandsCount;
    const totalUsage = stats.totalUsage;
    const profileAmount = stats.profileAmount;
    const votingTotal = stats.vote.votingtotal;

    const channels = [
      {
        id: "1152452882663227423",
        name: `Guilds: ${guildsCount}`,
      },
      {
        id: "1152452919719903313",
        name: `Users: ${usersCount}`,
      },
      {
        id: "1152452950132805722",
        name: `# of Commands: ${registeredCommandsCount}`,
      },
      {
        id: "1221546215976603729",
        name: `Commands used: ${totalUsage}`,
      },
      {
        id: "1246264055388438700",
        name: `Profiles: ${profileAmount}`,
      },
      {
        id: "1261162314267230248",
        name: `Bot Votes: ${votingTotal}`,
      },
    ];

    for (const entry of channels) {
      const channel = client.channels.cache.get(entry.id);
      if (channel && channel.type === ChannelType.GuildVoice) {
        await channel.setName(entry.name).catch(console.error);
      }
    }
  } catch (error) {
    console.error("Error fetching stats or updating channel names:", error);
  }
};

module.exports = updateChannelName;
