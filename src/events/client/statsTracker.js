const { ChannelType } = require("discord.js");
const axios = require("axios");
const CommandUsage = require("../../../mongo/models/usageSchema");
const Profiles = require("../../../mongo/models/profileSchema");
const Voting = require("../../../mongo/models/votingSchema");

const {
  getRegisteredCommandsCount,
} = require("../../config/commandfunctions/registercommand");

const updateChannelName = async (client) => {
  let channels = [];
  try {
    const response = await axios.get("https://api.pridebot.xyz/stats", {
      timeout: 5000,
    });
    const stats = response.data;

    const guildsCount = stats.currentGuildCount;
    const usersCount = stats.totalUserCount;
    const registeredCommandsCount = stats.commandsCount;
    const totalUsage = stats.totalUsage;
    const profileAmount = stats.profileAmount;
    const votingTotal = stats.vote.votingtotal;

    channels = [
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
    console.error(
      "Stats - Failed to fetch stats from the API, falling back to manual calculation.",
      error.message
    );

    const guildsCount = client.guilds.cache.size;
    let usersCount = 0;
    client.guilds.cache.forEach((guild) => {
      usersCount += guild.memberCount;
    });

    const usages = await CommandUsage.find({}).sort({ count: -1 });
    const totalUsage = usages.reduce((acc, cmd) => acc + cmd.count, 0);

    const profileAmount = await Profiles.countDocuments();

    const voting = await Voting.findOne();
    const votingtotal = voting.votingAmount.OverallTotal;

    channels = [
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
        name: `# of Commands: ${getRegisteredCommandsCount}`,
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
        name: `Bot Votes: ${votingtotal}`,
      },
    ];
  }
};

module.exports = updateChannelName;
