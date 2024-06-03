const {ActivityType} = require("discord.js");

module.exports = {
<<<<<<< HEAD
  name: "ready",
  once: true,
  async execute(client) {
    const updatePresence = async () => {
      const userCount = client.guilds.cache.reduce(
        (acc, guild) => acc + guild.memberCount,
        0
      );
      /*
=======
    name: "ready",
    once: true,
    async execute(client) {
        const updatePresence = async () => {
            const userCount = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
            /*
>>>>>>> 0d22a1f79ce22cb5e16ec12bf9c66c9df8a71d36
            await client.user.setPresence({
              status: "online",
              activities: [
                {
                  type: ActivityType.Watching,
                  name: `over ${formattedTotalUserCount} LGBTQIA+ members`,
                },
              ],
            });
            */
<<<<<<< HEAD
      await client.user.setPresence({
        status: "online",
        activities: [
          {
            type: ActivityType.Playing,
            name: `Happy Pride Month to my ${userCount.toLocaleString()} LGBTQIA+ users!`,
          },
        ],
      });
    };

    await updatePresence();
    setInterval(updatePresence, 300_000);
  },
=======
            await client.user.setPresence({
                status: "online",
                activities: [
                    {
                        type: ActivityType.Playing,
                        name: `Happy Pride Month to my ${userCount.toLocaleString()} LGBTQIA+ users!`,
                    },
                ],
            });
        };

        await updatePresence();
        setInterval(updatePresence, 300_000);
    },
>>>>>>> 0d22a1f79ce22cb5e16ec12bf9c66c9df8a71d36
};
