require("dotenv").config();
const { token, databaseToken, topggToken } = process.env;
const { connect } = require("mongoose");
const {
  Client,
  Collection,
  ChannelType,
  GatewayIntentBits,
  Events,
  EmbedBuilder,
} = require("discord.js");
const fs = require("fs");
const { AutoPoster } = require("topgg-autoposter");

const botStartTime = Math.floor(Date.now() / 1000);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
  ],
});
client.commands = new Collection();
client.commandArray = [];
client.botStartTime = botStartTime;

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
  const functionFolders = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFolders)
    require(`./functions/${folder}/${file}`)(client);
}

const eventHandlers = {
  updateChannelName: require("./events/client/statsTracker.js"),
  handleGuildCreate: require("./events/client/guildCreate.js"),
  handleGuildDelete: require("./events/client/guildDelete.js"),
  handleReportFeedback: require("./events/client/modals.js"),
};

const userprofile = require("./commands/Profile/userprofile.js");
const usergaydar = require("./commands/Fun/usergaydar.js");
const usertransdar = require("./commands/Fun/usertransdar.js");

client.on(Events.GuildCreate, (guild) =>
  eventHandlers.handleGuildCreate(client, guild)
);
client.on(Events.GuildDelete, (guild) =>
  eventHandlers.handleGuildDelete(client, guild)
);
client.on("interactionCreate", (interaction) => {
  eventHandlers.handleReportFeedback(client, interaction);
});

setInterval(() => eventHandlers.updateChannelName(client), 5 * 60 * 1000);
client.once("ready", () => {
  eventHandlers.updateChannelName(client);
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isUserContextMenuCommand()) {
    if (interaction.commandName === "User Profile") {
      await userprofile.execute(interaction);
    }
    if (interaction.commandName === "User Gaydar") {
      await usergaydar.execute(interaction);
    }
    if (interaction.commandName === "User Transdar") {
      await usertransdar.execute(interaction);
    }
  }
});
const ap = AutoPoster(topggToken, client);
ap.on("posted", () => {
  console.log("Posted stats to Top.gg!");
});

const commandsPath = "./src/commands";
const clientId = "1101256478632972369";
client.handleCommands(commandsPath, clientId);
client.handleEvents();
client.login(token);

connect(databaseToken)
  .then(() => console.log("Connected to MongoDB"))
  .catch(console.error);

const express = require("express");
const app = express();

const port = 2610;

app.listen(port, () => {
  console.log(`API is running on port ${port}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
        .setColor(0x00ae86)
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

app.post(
  "/github",
  express.json({ type: "application/json" }),
  async (request, response) => {
    const githubEvent = request.headers["x-github-event"];
    const data = request.body;
    let embed = new EmbedBuilder();

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
      const title = `${commitCount} New ${data.repository.name} ${commitCount > 1 ? 'Commits' : 'Commit'}`;
      const fieldname = `${commitCount > 1 ? 'Commits' : 'Commit'}`
    
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
          `## :star: New Star \n**Thank you [${data.sender.login}](https://github.com/${data.sender.login}) for starring [Pridebot](https://github.com/${data.repository.full_name})**`
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
