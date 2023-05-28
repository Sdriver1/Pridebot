require("dotenv").config();
const { githubToken } = process.env;
const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
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
    const response = await axios.get(
      "https://discordstatus.com/api/v2/incidents.json"
    );
    const data = response.data;
    const incident = data.incidents[0];

    let DiscordApiIncident = "No incidents found";
    if (incident && incident.created_at) {
      const created_at = new Date(incident.created_at).toLocaleString(
        "en-US",
        options
      );
      const formattedDate = new Date(incident.created_at).toLocaleDateString(
        "en-US",
        { month: "long", day: "numeric", year: "numeric" }
      );
      DiscordApiIncident = `${formattedDate} - [${incident.name}](${data.page.url}/incidents/${incident.id})`;
    }

    // Retrieve GitHub commit information
    const repoOwner = "Sdriver1";
    const repoName = "Pridebot";

    const commitsResponse = await axios.get(
      `https://api.github.com/repos/${repoOwner}/${repoName}/commits`,
      {
        headers: {
          Authorization: `Bearer ${githubToken}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );
    const commitsData = commitsResponse.data;
    const commitCount = commitsData.length;
    const devcommitCount = commitsData.length-30;

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
    let clientType = "unknown";
    let statusEmote = "<:_:1111490661259165727>"; // Default emote for offline status

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
    } else if (interaction.member.presence.status === "idle") {
      if (clientType === "Mobile") {
        statusEmote = "<:_:1111031207296241765>";
      } else if (clientType === "Desktop") {
        statusEmote = "<:_:1111029962045141152>";
      } else if (clientType === "Website") {
        statusEmote = "<:_:1111030230820323348>";
      }
    } else if (interaction.member.presence.status === "online") {
      if (clientType === "Mobile") {
        statusEmote = "<:_:1111020888620539994>";
      } else if (clientType === "Desktop") {
        statusEmote = "<:_:1111021789661909052>";
      } else if (clientType === "Website") {
        statusEmote = "<:_:1111030292287852644>";
      }
    }

    const bot = `**Ping**: \`${ping}\`\n**Version:** \` 1.${commitTens}.${commitOnes}\`\n**Uptime:** \`${formatUptime(
      process.uptime()
    )} \` \n**Start Time:** \`${formatTimestamp(client.botStartTime)}\``;
    const discord = `**API Latency**: \`${client.ws.ping}\` \n**Client:** ${statusEmote} \`${clientType}\`\n**Status:** \`${interaction.member.presence.status}\``;

    const embed = new EmbedBuilder().setColor(0xff00ae).addFields(
      {
        name: "<:_:1108228682184654908> __Bot Stats__",
        value: bot,
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
      },
      {
        name: "<:_:1110925802041774151> __Latest GitHub Commit__",
        value: commitsText,
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
    // Handle the specific format of the incident timestamp
    const dateMatch = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(timestamp);
    if (dateMatch) {
      const [_, year, month, day, hour, minute] = dateMatch;
      return `${year}-${padZero(month)}-${padZero(day)} ${padZero(
        hour
      )}:${padZero(minute)}`;
    }
    return "Invalid Date";
  }
  return dateObj.toLocaleString(); // Adjust the format of the timestamp as desired
}

function padZero(value) {
  return value.toString().padStart(2, "0");
}
