const { ActivityType } = require("discord.js");
const CommandUsage = require("../../../mongo/models/usageSchema");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    let presenceIndex = 0;

    const updatePresence = async () => {
      const guildsCount = client.guilds.cache.size;
      let totalUserCount = 0;
      client.guilds.cache.forEach((guild) => {
        totalUserCount += guild.memberCount;
      });

      const usages = await CommandUsage.find({}).sort({ count: -1 });
      const totalUsage = usages.reduce((acc, cmd) => acc + cmd.count, 0);

      const presences = [
        {
          type: ActivityType.Watching,
          name: `over ${totalUserCount} LGBTQIA+ members`,
        },
        {
          type: ActivityType.Listening,
          name: `${guildsCount} servers`,
        },
        {
          type: ActivityType.Playing,
          name: `with ${totalUsage} commands`,
        },
      ];

      await client.user.setPresence({
        status: "online",
        activities: [presences[presenceIndex]],
      });

      presenceIndex = (presenceIndex + 1) % presences.length;
    };

    await updatePresence();
    setInterval(updatePresence, 15_000);
  },
};
