const express = require("express");
const cors = require("cors");
const { EmbedBuilder, ChannelType } = require("discord.js");
const CommandUsage = require("../mongo/models/usageSchema.js");
const ProfileData = require("../mongo/models/profileSchema.js");
const { botlistauth } = process.env;
require("dotenv").config();

const { getTotalCommits } = require("./config/commandfunctions/commit.js");
const {
  getRegisteredCommandsCount,
} = require("./config/commandfunctions/registercommand.js");

module.exports = (client) => {
  const app = express();
  const port = 2610;

  app.listen(port, () => {
    console.log(`API is running on port ${port}`);
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  app.get("/api/stats", cors(), async (req, res) => {
    const currentGuildCount = client.guilds.cache.size;

    let totalUserCount = 0;
    client.guilds.cache.forEach((guild) => {
      totalUserCount += guild.memberCount;
    });

    try {
      const usages = await CommandUsage.find({}).sort({ count: -1 });
      const totalUsage = usages.reduce((acc, cmd) => acc + cmd.count, 0);

      const commandsCount = (await getRegisteredCommandsCount(client)) + 2;

      const botuptime = client.botStartTime;

      res.json({
        totalUserCount,
        currentGuildCount,
        totalUsage,
        commandsCount,
        botuptime,
      });
    } catch (error) {
      console.error("Failed to get API stats:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  app.get("/api/profiles/:userId", cors(), async (req, res) => {
    try {
      const profile = await ProfileData.findOne({ userId: req.params.userId });

      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }

      return res.json(profile);
    } catch (error) {
      console.error("Failed to retrieve profile:", error);
      return res.status(500).send("Internal Server Error");
    }
  });

  app.post("/wumpus-votes", async (req, res) => {
    let wumpususer = req.body.userId;
    let wumpusbot = req.body.botId;
    const voteCooldownHours = 12;
    const voteCooldownSeconds = voteCooldownHours * 3600;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const voteAvailableTimestamp = currentTimestamp + voteCooldownSeconds;

    client.users
      .fetch(wumpususer)
      .then(async (user) => {
        const userAvatarURL = user.displayAvatarURL();

        const embed = new EmbedBuilder()
          .setDescription(
            `**Thank you <@${wumpususer}> for voting for <@${wumpusbot}> on [Wumpus.Store](https://wumpus.store/bot/${wumpusbot}/vote) <:_:1198663251580440697>** \nYou can vote again <t:${voteAvailableTimestamp}:R>.`
          )
          .setColor("#FF00EA")
          .setThumbnail(userAvatarURL)
          .setTimestamp();

        try {
          const channel = await client.channels.fetch("1224815141921624186");
          if (!channel || channel.type !== ChannelType.GuildText) {
            return res
              .status(400)
              .send("Channel not found or is not a text channel");
          }

          await channel.send({ embeds: [embed] });
          res.status(200).send("Success!");
        } catch (error) {
          console.error("Error sending message to Discord:", error);
          res.status(500).send("Internal Server Error");
        }
      })
      .catch((error) => {
        console.error("Error fetching user from Discord:", error);
        res.status(500).send("Internal Server Error");
      });
  });

  app.post("/topgg-votes", async (req, res) => {
    let topgguserid = req.body.user;
    let topggbotid = req.body.bot;
    const voteCooldownHours = 12;
    const voteCooldownSeconds = voteCooldownHours * 3600;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const voteAvailableTimestamp = currentTimestamp + voteCooldownSeconds;

    client.users
      .fetch(topgguserid)
      .then(async (user) => {
        const userAvatarURL = user.displayAvatarURL();

        const embed = new EmbedBuilder()
          .setDescription(
            `**Thank you <@${topgguserid}> for voting for <@${topggbotid}> on [Top.gg](https://top.gg/bot/${topggbotid}/vote) <:_:1195866944482590731>** \nYou can vote again in <t:${voteAvailableTimestamp}:R>`
          )
          .setColor("#FF00EA")
          .setThumbnail(userAvatarURL)
          .setTimestamp();

        try {
          const channel = await client.channels.fetch("1224815141921624186");
          if (!channel || channel.type !== ChannelType.GuildText) {
            return res
              .status(400)
              .send("Channel not found or is not a text channel");
          }

          await channel.send({ embeds: [embed] });
          res.status(200).send("Success!");
        } catch (error) {
          console.error("Error sending message to Discord:", error);
          res.status(500).send("Internal Server Error");
        }
      })
      .catch((error) => {
        console.error("Error fetching user from Discord:", error);
        res.status(500).send("Internal Server Error");
      });
  });

  app.post("/botlist-votes", async (req, res) => {
    if (req.header("Authorization") != botlistauth) {
      return res.status("401").end();
    }

    let botlistuser = req.body.user;
    let botlistbot = req.body.bot;
    const voteCooldownHours = 12;
    const voteCooldownSeconds = voteCooldownHours * 3600;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const voteAvailableTimestamp = currentTimestamp + voteCooldownSeconds;

    client.users
      .fetch(botlistuser)
      .then(async (user) => {
        const userAvatarURL = user.displayAvatarURL();

        const embed = new EmbedBuilder()
          .setDescription(
            `**Thank you <@${botlistuser}> for voting for <@${botlistbot}> on [Botlist.me](https://botlist.me/bots/${botlistbot}/vote) <:_:1227425669642719282>** \nYou can vote again <t:${voteAvailableTimestamp}:R>.`
          )
          .setColor("#FF00EA")
          .setThumbnail(userAvatarURL)
          .setTimestamp();

        try {
          const channel = await client.channels.fetch("1224815141921624186");
          if (!channel || channel.type !== ChannelType.GuildText) {
            return res
              .status(400)
              .send("Channel not found or is not a text channel");
          }

          await channel.send({ embeds: [embed] });
          res.status(200).send("Success!");
        } catch (error) {
          console.error("Error sending message to Discord:", error);
          res.status(500).send("Internal Server Error");
        }
      })
      .catch((error) => {
        console.error("Error fetching user from Discord:", error);
        res.status(500).send("Internal Server Error");
      });
  });

  app.post(
    "/github",
    express.json({ type: "application/json" }),
    async (request, response) => {
      const githubEvent = request.headers["x-github-event"];
      const data = request.body;
      let embed = new EmbedBuilder();

      async function getTotalCommitsFromRepo(repoName) {
        return await getTotalCommits(
          "Sdriver1",
          repoName,
          process.env.githubToken
        );
      }

      let totalCommits;
      if (data.repository.name === "Pridebot") {
        totalCommits = await getTotalCommitsFromRepo("Pridebot");
      } else if (data.repository.name === "Pridebot-Website") {
        totalCommits = await getTotalCommitsFromRepo("Pridebot-Website");
      } else {
        totalCommits = 0;
      }

      let commitPrefix = data.repository.name === "Pridebot" ? "2" : "";
      let commitTens = totalCommits.toString().slice(-2, -1) || "0";
      let commitOnes = totalCommits.toString().slice(-1);

      if (githubEvent === "push") {
        const commitCount = data.commits.length;
        const commitMessages = data.commits
          .map(
            (commit) =>
              `[\`${commit.id.slice(0, 7)}\`](${commit.url}) - **${
                commit.message
              }**`
          )
          .join("\n");
        const title = `${commitCount} New ${data.repository.name} ${
          commitCount > 1 ? "Commits" : "Commit"
        } (# ${commitPrefix}${commitTens}${commitOnes})`;
        const fieldname = `${commitCount > 1 ? "Commits" : "Commit"}`;

        embed
          .setColor("#FF00EA")
          .setAuthor({
            name: `${data.pusher.name}`,
            iconURL: `https://cdn.discordapp.com/emojis/1226912165982638174.png`,
            url: `https://github.com/${data.pusher.name}`,
          })
          .setTitle(title)
          .setTimestamp()
          .addFields({ name: fieldname, value: commitMessages });
      } else if (githubEvent === "star" && data.action === "created") {
        embed
          .setColor("#FF00EA")
          .setDescription(
            `## :star: New Star \n**Thank you [${data.sender.login}](https://github.com/${data.sender.name}) for starring [${data.repository.name}](https://github.com/${data.repository.full_name})**`
          )
          .setTimestamp();
      } else if (githubEvent === "star" && data.action === "deleted") {
        console.log(`${data.sender.login} removed their star ;-;`);
      } else {
        console.log(`Unhandled event: ${githubEvent}`);
        return;
      }

      try {
        const channel = await client.channels.fetch("1101742377372237906");
        if (!channel) {
          console.log("Could not find channel");
          return;
        }

        await channel.send({ embeds: [embed] });
      } catch (error) {
        console.error("Error sending message to Discord:");
      }
    }
  );
};
