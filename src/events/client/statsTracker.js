const { ChannelType } = require("discord.js");
const CommandUsage = require("../../../mongo/models/usageSchema");
const Profiles = require("../../../mongo/models/profileSchema");
const Voting = require("../../../mongo/models/votingSchema");

const {
  getRegisteredCommandsCount,
} = require("../../config/commandfunctions/registercommand");

const updateChannelName = async (client) => {
  const guildsCount = client.guilds.cache.size;
  let usersCount = 0;
  client.guilds.cache.forEach((guild) => {
    usersCount += guild.memberCount;
  });

  const usages = await CommandUsage.find({}).sort({ count: -1 });
  const totalUsage = usages.reduce((acc, cmd) => acc + cmd.count, 0);

  const profileAmount = await Profiles.countDocuments();

  const voting = await Voting.findOne();
  const votingTotal = voting.votingAmount.OverallTotal;

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
      name: `Bot Votes: ${votingTotal}`,
    },
  ];

  for (const entry of channels) {
    const channel = client.channels.cache.get(entry.id);
    if (channel && channel.type === ChannelType.GuildVoice) {
      await channel.setName(entry.name).catch(console.error);
    }
  }
};

module.exports = updateChannelName;
