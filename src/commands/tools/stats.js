require("dotenv").config();
const os = require("os");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const CommandUsage = require("../../../mongo/models/usageSchema");
const Profile = require("../../../mongo/models/profileSchema");
const { getTotalCommits } = require("../../config/commandfunctions/commit");
const {
  getRegisteredCommandsCount,
} = require("../../config/commandfunctions/registercommand");
const commandLogging = require("../../config/logging/commandlog");
const {
  getApproximateUserInstallCount,
} = require("../../config/botfunctions/user_install");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stats")
    .setDescription("Get the bot's and discord stats"),

  async execute(interaction, client) {
    const startTimestamp = Date.now();
    await interaction.deferReply();

    const botping = Date.now() - startTimestamp;

    function getCpuUsage() {
      return new Promise((resolve) => {
        const start = process.cpuUsage();
        const startTime = Date.now();

        setTimeout(() => {
          const end = process.cpuUsage(start);
          const endTime = Date.now();
          const elapsedMs = endTime - startTime;
          const elapsedUserMs = end.user / 1000;
          const elapsedSystemMs = end.system / 1000;

          const cpuPercent =
            ((elapsedUserMs + elapsedSystemMs) /
              (elapsedMs * os.cpus().length)) *
            100;
          resolve(cpuPercent.toFixed(2));
        }, 100);
      });
    }

    try {
      const approximateUserInstallCount = await getApproximateUserInstallCount(
        client
      );

      let totalCommits = await getTotalCommits(
        "Sdriver1",
        "Pridebot",
        process.env.githubToken
      );

      let commitTens = totalCommits.toString().slice(-2, -1) || "0";
      let commitOnes = totalCommits.toString().slice(-1);

      const currentGuildCount = client.guilds.cache.size;
      let totalUserCount = 0;
      client.guilds.cache.forEach((guild) => {
        totalUserCount += guild.memberCount;
      });

      const cpuPercent = await getCpuUsage();
      const memoryUsage = `${(
        process.memoryUsage().heapUsed /
        1024 /
        1024
      ).toFixed(2)} MB`;

      const formattedTotalUserCount = totalUserCount.toLocaleString();
      const CommandsCount = (await getRegisteredCommandsCount(client)) + 2;
      const profileAmount = await Profile.countDocuments();
      const usages = await CommandUsage.find({}).sort({ count: -1 });
      const totalUsage = usages.reduce((acc, cmd) => acc + cmd.count, 0);
      const startTimeTimestamp = `<t:${client.botStartTime}:f>`;

      const ping = `**Ping**: \`${botping}ms\` \n**API Latency**: \`${client.ws.ping}ms\``;
      const up = `\n**Uptime:** \`${formatUptime(
        process.uptime()
      )}\` \n**Start Time:** ${startTimeTimestamp}`;
      const botstats = `**Servers:** \`${currentGuildCount}\` \n**Users:** \`${formattedTotalUserCount}\`\n**User Installs:** \`${approximateUserInstallCount}\``;
      const commandstats = `**Commands:** \`${CommandsCount}\` \n**Total Usage:** \`${totalUsage}\` \n**Profiles:** \`${profileAmount}\``;
      const botversion = `**Dev:** \`3.${commitTens}.${commitOnes}\` \n **Node.js:** \`${process.version}\` \n **Discord.js:** \`v14.16.1\``;
      const clientstats = `**CPU:** \`${cpuPercent}% / 100%\` \n**Memory:** \`${memoryUsage} / 6 GB\``;

      const embed = new EmbedBuilder()
        .setDescription(
          "# <:_:1108228682184654908> Pridebot Stats \n Here are some stats about Pridebot!"
        )
        .setColor(0xff00ae)
        .addFields(
          {
            name: "<:_:1195874659338555462> __Servers/Users__",
            value: botstats,
            inline: true,
          },
          {
            name: "<:_:1191202343505645690> __Ping/Latency__",
            value: ping,
            inline: true,
          },
          {
            name: "<:_:1115832874143322122> __Usage__",
            value: clientstats,
            inline: true,
          },
          {
            name: "<:_:1115831076993110067> __Command/Profile__",
            value: commandstats,
            inline: true,
          },
          {
            name: "<:_:1112602480128299079> __Versions__",
            value: botversion,
            inline: true,
          },
          {
            name: "<:_:1108417509624926228> __Uptime__",
            value: up,
            inline: true,
          }
        )
        .setTimestamp();

      await interaction.editReply({ embeds: [embed] });
      await commandLogging(client, interaction);
    } catch (error) {
      console.error("Error executing /stats command:", error);
      await interaction.editReply(
        "There was an error while executing the /stats command."
      );
    }
  },
};

function formatUptime(seconds) {
  const timeUnits = {
    day: 3600 * 24,
    hour: 3600,
    minute: 60,
    second: 1,
  };
  let result = [];
  for (const [unit, amountInSeconds] of Object.entries(timeUnits)) {
    const quantity = Math.floor(seconds / amountInSeconds);
    seconds %= amountInSeconds;
    if (quantity > 0) {
      result.push(`${quantity} ${unit}${quantity > 1 ? "s" : ""}`);
    }
  }
  return result.join(", ");
}
