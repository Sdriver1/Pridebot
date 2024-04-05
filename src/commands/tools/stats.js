require("dotenv").config();
const { githubToken, apikey } = process.env;
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { calculatePing } = require("../../events/client/ping");
const axios = require("axios");
const Nodeactyl = require("nodeactyl");
const chalk = require("chalk");
const CommandUsage = require("../../../mongo/models/usageSchema");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stats")
    .setDescription("Get the bot's and discord stats"),

  async execute(interaction, client) {
    await interaction.deferReply();
    const botping = await calculatePing(interaction);

    const estDate = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    });
    console.log(
      chalk.white.bold(
        `-------------------------- \n/stats \nServer: ${interaction.guild.name} (${interaction.guild.id}) \nUser: ${interaction.user.tag} (${interaction.user.id}) \nTime: ${estDate} (EST) \n--------------------------`
      )
    );
    try {
      const options = {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };

      const response = await axios
        .get("https://discordstatus.com/api/v2/incidents.json")
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
      const data = response.data;

      function isSameDay(d1, d2) {
        return (
          d1.getUTCFullYear() === d2.getUTCFullYear() &&
          d1.getUTCMonth() === d2.getUTCMonth() &&
          d1.getUTCDate() === d2.getUTCDate()
        );
      }

      const today = new Date();
      const todaysIncidents = data.incidents.filter((incident) =>
        isSameDay(new Date(incident.created_at), today)
      );

      let DiscordApiIncident = "No incidents found";

      if (todaysIncidents.length) {
        DiscordApiIncident = todaysIncidents
          .map((incident) => {
            const formattedDate = new Date(
              incident.created_at
            ).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            });
            return `${formattedDate} - [${incident.name}](${data.page.url}/incidents/${incident.id})`;
          })
          .join("\n");
      } else if (data.incidents.length) {
        const latestIncident = data.incidents[0];
        const formattedDate = new Date(
          latestIncident.created_at
        ).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });
        DiscordApiIncident = `${formattedDate} - [${latestIncident.name}](${data.page.url}/incidents/${latestIncident.id})`;
      }
      //-----------------------------------------------------------------------------
      const repoOwner = "Sdriver1";
      const repoName = "Pridebot";

      const commitsResponse = await axios.get(
        `https://api.github.com/repos/${repoOwner}/${repoName}/commits?per_page=100`,
        {
          headers: {
            Authorization: `Bearer ${githubToken}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );
      const commitsData = commitsResponse.data;
      const commitCount = commitsData.length;
      const devcommitCount = commitsData.length - 62;

      let commitTens = "0";
      let commitOnes = "0";

      let commitsText = `**Commit Count:** ${commitCount}\n`;

      if (commitCount > 0) {
        const latestCommit = commitsData[0];
        const latestCommitDate = new Date(
          latestCommit.commit.author.date
        ).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });
        const latestCommitLink = latestCommit.html_url;
        const latestCommitTitle = latestCommit.commit.message;
        const commitCountStr = devcommitCount.toString();
        commitTens = commitCountStr.length > 1 ? commitCountStr[0] : "0";
        commitOnes =
          commitCountStr.length > 0
            ? commitCountStr[commitCountStr.length - 1]
            : "0";

        commitsText += `${latestCommitDate} - [${latestCommitTitle}](${latestCommitLink})`;
      }
      //---------------------------------------------------------------------------------------------------
      const currentGuildCount = client.guilds.cache.size;
      let totalUserCount = 0;
      client.guilds.cache.forEach((guild) => {
        totalUserCount += guild.memberCount;
      });

      const formattedTotalUserCount = totalUserCount.toLocaleString();
      //--------------------------------------------------------------------------------

      async function getRegisteredCommandsCount(client) {
        if (!client.application) {
          console.error("Client application is not ready.");
          return 0;
        }
        const commands = await client.application.commands.fetch();
        return commands.size;
      }

      const CommandsCount = (await getRegisteredCommandsCount(client)) + 2;

      //--------------------------------------------------------------------------------

      const Client = new Nodeactyl.NodeactylClient(
        "https://panel.sneakyhost.xyz/",
        apikey
      );

      let serviceMem = "Unavailable";
      let serviceCPU = "Unavailable";
      let serviceDk = "Unavailable";

      try {
        const serverStats = await Client.getServerUsages("2e12ab3b");

        const memoryMB = serverStats.resources.memory_bytes / 1024 / 1024;
        const cpuPercentage = serverStats.resources.cpu_absolute;
        const diskMB = serverStats.resources.disk_bytes / 1024 / 1024;

        serviceMem = `**RAM:** \`${memoryMB.toFixed(2)} MiB / 700 MiB\``;
        serviceCPU = `**CPU:** \`${cpuPercentage.toFixed(2)}%\``;
        serviceDk = `**Disk:** \`${diskMB.toFixed(2)} MiB / 1.22 GiB\``;
      } catch (error) {
        console.error("Error fetching server stats:", error);
      }

      //--------------------------------------------------------------------------------

      const usages = await CommandUsage.find({}).sort({ count: -1 });
      const totalUsage = usages.reduce((acc, cmd) => acc + cmd.count, 0);

      //--------------------------------------------------------------------------------

      const startTimeTimestamp = `<t:${client.botStartTime}:f>`;

      const ping = `**Ping**: \`${botping}ms\` \n**API Latency**: \`${client.ws.ping}\``;

      const up = `\n**Uptime:** \`${formatUptime(
        process.uptime()
      )} \` \n**Start Time:** ${startTimeTimestamp}`;

      const botstats = `**Version:** \`2.${commitTens}.${commitOnes}\` \n**Guilds:** \`${currentGuildCount}\` \n**Users:** \`${formattedTotalUserCount}\` \n**Commands:** \`${CommandsCount}\` \n**Commands Used:** \`${totalUsage}\``;

      const servicestats = `${serviceMem} \n${serviceCPU} \n${serviceDk}`;

      try {
        const embed = new EmbedBuilder().setColor(0xff00ae).addFields(
          {
            name: "<:_:1108228682184654908> __Bot Stats__",
            value: botstats,
            inline: true,
          },
          {
            name: "<:_:1108417509624926228> __Bot Uptime__",
            value: up,
            inline: true,
          },
          {
            name: "<:_:1191202343505645690> __Bot Ping__",
            value: ping,
            inline: true,
          },
          {
            name: "<:_:1193823319246524486> __Bot Usage__",
            value: servicestats,
            inline: true,
          },
          {
            name: "<:_:1108421476148859010> __Latest Discord API Incident__",
            value: DiscordApiIncident,
            inline: true,
          }
        );

        await interaction.editReply({ embeds: [embed] });
      } catch (error) {
        console.error("Error sending edit reply:", error);
        if (error.code !== "InteractionAlreadyReplied") {
          await interaction.followUp({
            content: "There was an error processing your request.",
            ephemeral: true,
          });
        }
      }
    } catch (error) {
      console.error("Error deferring reply:", error);
    }
  },
};

function formatUptime(time) {
  const timeUnits = {
    day: 3600 * 24,
    hour: 3600,
    minute: 60,
    second: 1,
  };
  return Object.entries(timeUnits)
    .reduce((acc, [unit, unitSeconds]) => {
      const amount = Math.floor(time / unitSeconds);
      time -= amount * unitSeconds;
      return amount ? [...acc, `${amount} ${unit}(s)`] : acc;
    }, [])
    .join(" ");
}

function formatTimestamp(timestamp) {
  const dateObj = new Date(timestamp);
  if (isNaN(dateObj)) {
    const dateMatch = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(timestamp);
    if (dateMatch) {
      const [_, year, month, day, hour, minute] = dateMatch;
      return `${year}-${padZero(month)}-${padZero(day)} ${padZero(
        hour
      )}:${padZero(minute)}`;
    }
    return "Invalid Date";
  }
  return dateObj.toLocaleString();
}

function padZero(value) {
  return value.toString().padStart(2, "0");
}
