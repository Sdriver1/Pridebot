const { ActivityType } = require("discord.js");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    const updatePresence = async () => {
      const userCount = client.guilds.cache.reduce(
        (acc, guild) => acc + guild.memberCount,
        0
      );

      await client.user.setPresence({
        status: "online",
        activities: [
          {
            type: ActivityType.Watching,
            name: `over ${userCount} LGBTQIA+ members`,
          },
        ],
      });
    };

    await updatePresence();
    setInterval(updatePresence, 300_000);
  },
};
