const { ActivityType } = require("discord.js");
const axios = require("axios");
const CommandUsage = require("../../../mongo/models/usageSchema");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    let presenceIndex = 0;

    const updatePresence = async () => {
      let presences = [];
      try {
        const response = await axios.get("https://api.pridebot.xyz/stats", {
          timeout: 5000,
        });
        const stats = response.data;
        const guildsCount = stats.currentGuildCount;
        const usersCount = stats.totalUserCount;
        const totalUsage = stats.totalUsage;

        presences = [
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
      } catch (error) {
        console.error(
          "Failed to fetch stats from the API, falling back to manual calculation.",
          error.message
        );

        const guildsCount = client.guilds.cache.size;
        let totalUserCount = 0;
        client.guilds.cache.forEach((guild) => {
          totalUserCount += guild.memberCount;
        });

        const usages = await CommandUsage.find({}).sort({ count: -1 });
        const totalUsage = usages.reduce((acc, cmd) => acc + cmd.count, 0);

        presences = [
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
      }

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
