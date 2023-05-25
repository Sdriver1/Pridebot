const {
  ActivityType
} = require("discord.js");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    const isDev = process.argv.slice(2)[0] === "dev";
    const activity = isDev
      ? {
          type: ActivityType.Playing,
          text: "with my code (Dev Work)",
          status: "dnd",
        }
      : {
          type: ActivityType.Playing,
          text: "with new /stats command",
          status: "online",
        };


    await client.user.setPresence({
      status: activity.status,
      activities: [{ type: activity.type, name: activity.text }],
    });

    console.log(
      isDev
        ? `${client.user.tag} is in development`
        : `${client.user.tag} is ready to serve LGBTQ`
    );
  },
};
