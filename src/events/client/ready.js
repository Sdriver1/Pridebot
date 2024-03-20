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
      const formattedTotalUserCount = userCount.toLocaleString();
      await client.user.setPresence({
        status: "online",
        activities: [
          {
            type: ActivityType.Watching,
            name: `over ${formattedTotalUserCount} LGBTQIA+ members`,
          },
        ],
      });
    };
    updatePresence();
    setInterval(updatePresence, 300000); 
  },
};
