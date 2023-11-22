const { Client, ChannelType } = require("discord.js");

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
  const registeredCommandsCount = await getRegisteredCommandsCount(client); 

  const newChannelName1 = `Guilds: ${guildsCount}`;
  const newChannelName2 = `Users: ${usersCount}`;
  const newChannelName3 = `# of Commands: ${registeredCommandsCount}`;
  const channelId1 = "1152452882663227423";
  const channelId2 = "1152452919719903313";
  const channelId3 = "1152452950132805722";
  const channel1 = client.channels.cache.get(channelId1);
  const channel2 = client.channels.cache.get(channelId2);
  const channel3 = client.channels.cache.get(channelId3);

  if (channel1 && channel1.type === ChannelType.GuildVoice) { 
    channel1.setName(newChannelName1).catch(console.error);
  }
  if (channel2 && channel2.type === ChannelType.GuildVoice) { 
    channel2.setName(newChannelName2).catch(console.error);
  }
  if (channel3 && channel3.type === ChannelType.GuildVoice) { 
    channel3.setName(newChannelName3).catch(console.error);
  }
};

module.exports = updateChannelName;
