require("dotenv").config();
const { githubToken } = process.env;
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stats")
    .setDescription("Get the bot's and discord stats"),

  async execute(interaction, client) {
    const message = await interaction.deferReply({ fetchReply: true });

    const ping = message.createdTimestamp - interaction.createdTimestamp;

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
    const devcommitCount = commitsData.length - 45;

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
    let clientType = "offline";
    let statusEmote = "<:_:1111490661259165727>";

    if (interaction.member?.presence?.clientStatus) {
      if (interaction.member.presence.clientStatus.mobile) {
        clientType = "Mobile";
      } else if (interaction.member.presence.clientStatus.desktop) {
        clientType = "Desktop";
      } else if (interaction.member.presence.clientStatus.web) {
        clientType = "Website";
      }
    }

    if (interaction.member?.presence?.status === "dnd") {
      if (clientType === "Mobile") {
        statusEmote = "<:_:1111031153604956250>";
      } else if (clientType === "Desktop") {
        statusEmote = "<:_:1111029093497045063>";
      } else if (clientType === "Website") {
        statusEmote = "<:_:1111030162646118440>";
      }
    } else if (interaction.member?.presence?.status === "idle") {
      if (clientType === "Mobile") {
        statusEmote = "<:_:1111031207296241765>";
      } else if (clientType === "Desktop") {
        statusEmote = "<:_:1111029962045141152>";
      } else if (clientType === "Website") {
        statusEmote = "<:_:1111030230820323348>";
      }
    } else if (interaction?.member.presence?.status === "online") {
      if (clientType === "Mobile") {
        statusEmote = "<:_:1111020888620539994>";
      } else if (clientType === "Desktop") {
        statusEmote = "<:_:1111021789661909052>";
      } else if (clientType === "Website") {
        statusEmote = "<:_:1111030292287852644>";
      }
    }

    const currentGuildCount = client.guilds.cache.size;
    let totalUserCount = 0;
    client.guilds.cache.forEach((guild) => {
      totalUserCount += guild.memberCount;
    });

    const formattedTotalUserCount = totalUserCount.toLocaleString();
    //--------------------------------------------------------------------------------

    const startTimeTimestamp = `<t:${client.botStartTime}:f>`;

    const bot = `**Ping**: \`${ping}\`\n**Version:** \`1.${commitTens}.${commitOnes}\`\n**Uptime:** \`${formatUptime(
      process.uptime()
    )} \` \n**Start Time:** ${startTimeTimestamp}`;
    const discord = `**API Latency**: \`${
      client.ws.ping
    }\` \n**Client:** ${statusEmote} \`${clientType}\`\n**Status:** \`${
      interaction.member?.presence?.status || "offline"
    }\``;
    const userstats = `**Total guilds:** \`${currentGuildCount}\` \n**Total users:** \`${formattedTotalUserCount}\``;

    const embed = new EmbedBuilder().setColor(0xff00ae).addFields(
      {
        name: "<:_:1108228682184654908> __Bot Stats__",
        value: bot,
        inline: true,
      },
      {
        name: "<:_:1113295174701940776> __Guild/User Stats__",
        value: userstats,
        inline: true,
      },
      {
        name: "<:_:1108417509624926228> __Discord Stats__",
        value: discord,
        inline: true,
      },
      {
        name: "<:_:1108421476148859010> __Latest Discord API Incident__",
        value: DiscordApiIncident,
        inline: false,
      }
    );

    await interaction.editReply({ embeds: [embed] });
  },
};

function formatUptime(time) {
  const days = Math.floor(time / (3600 * 24));
  const hours = Math.floor((time % (3600 * 24)) / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);

  const parts = [];
  if (days) parts.push(`${days} day(s)`);
  if (hours) parts.push(`${hours} hour(s)`);
  if (minutes) parts.push(`${minutes} minute(s)`);
  if (seconds) parts.push(`${seconds} second(s)`);

  return parts.join(" ");
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
