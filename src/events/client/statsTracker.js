const { ChannelType } = require("discord.js");
const CommandUsage = require("../../../mongo/models/usageSchema");
const Profile = require("../../../mongo/models/profileSchema");
const Voting = require("../../../mongo/models/votingSchema");

async function getRegisteredCommandsCount(client) {
  if (!client.application) {
    console.error("Client application is not ready.");
    return 0;
  }
  const commands = await client.application.commands.fetch();
  return commands.size;
}

const updateChannelName = async (client) => {
  const guildsCount = client.guilds.cache.size;
  const usersCount = client.guilds.cache.reduce(
    (acc, guild) => acc + guild.memberCount,
    0
  );
  const registeredCommandsCount =
    (await getRegisteredCommandsCount(client)) + 2;

  const allUsages = await CommandUsage.find({}).sort({ count: -1 });
  const totalUsage = allUsages.reduce((acc, cmd) => acc + cmd.count, 0);
  
  const profileAmount = await Profile.countDocuments();

  const voting = await Voting.findOne();
  const votingtotal = voting.votingAmount.OverallTotal;

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
      name: `Bot Votes: ${votingtotal}`,
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
