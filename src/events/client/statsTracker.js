const { Client, ChannelType } = require("discord.js");
const CommandUsage = require("../../../mongo/models/usageSchema");

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
  const registeredCommandsCount = await getRegisteredCommandsCount(client) + 2;

  const usages = await CommandUsage.find({}).sort({ count: -1 });
  const totalUsage = usages.reduce((acc, cmd) => acc + cmd.count, 0);

  const newChannelName1 = `Guilds: ${guildsCount}`;
  const newChannelName2 = `Users: ${usersCount}`;
  const newChannelName3 = `# of Commands: ${registeredCommandsCount}`;
  const newChannelName4 = `Commands used: ${totalUsage}`;
  const channelId1 = "1152452882663227423";
  const channelId2 = "1152452919719903313";
  const channelId3 = "1152452950132805722";
  const channelID4 = "1221546215976603729";
  const channel1 = client.channels.cache.get(channelId1);
  const channel2 = client.channels.cache.get(channelId2);
  const channel3 = client.channels.cache.get(channelId3);
  const channel4 = client.channels.cache.get(channelID4);

  if (channel1 && channel1.type === ChannelType.GuildVoice) {
    await channel1.setName(newChannelName1).catch(console.error);
  }
  if (channel2 && channel2.type === ChannelType.GuildVoice) {
    await channel2.setName(newChannelName2).catch(console.error);
  }
  if (channel3 && channel3.type === ChannelType.GuildVoice) {
    await channel3.setName(newChannelName3).catch(console.error);
  }
  if (channel4 && channel4.type === ChannelType.GuildVoice) {
    await channel4.setName(newChannelName4).catch(console.error);
  }
};

module.exports = updateChannelName;
