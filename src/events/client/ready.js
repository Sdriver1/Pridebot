const {
  ActivityType,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
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
          type: ActivityType.Watching,
          text: "over new commands /stats",
          status: "online",
        };

    const joinButton = new ButtonBuilder()
      .setStyle(ButtonStyle.Link)
      .setLabel("Join the 🌈 The LGBTQ Community 🌈")
      .setURL("https://discord.gg/pridemonth");

    const row = new ActionRowBuilder()
      .addComponents(joinButton);

    await client.user.setPresence({
      status: activity.status,
      activities: [{ type: activity.type, name: activity.text }],
      buttons: [row],
    });

    console.log(
      isDev
        ? `${client.user.tag} is in development`
        : `${client.user.tag} is ready to serve discord.gg/pridemonth`
    );
  },
};
