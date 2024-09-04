const { ActivityType } = require("discord.js");
const axios = require("axios");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    let presenceIndex = 0;

    const updatePresence = async () => {
      const response = await axios.get("https://api.pridebot.xyz/stats");
      const stats = response.data;
      const guildsCount = stats.currentGuildCount;
      const usersCount = stats.totalUserCount;
      const totalUsage = stats.totalUsage;

      const presences = [
        {
          type: ActivityType.Watching,
          name: `over ${usersCount} LGBTQIA+ members`,
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
    setInterval(updatePresence, 30_000);
  },
};
