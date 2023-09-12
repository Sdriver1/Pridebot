require("dotenv").config();
const { githubToken } = process.env;
const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js"); // Ensure this is the correct class in your Discord.js version
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("latest")
    .setDescription("Get the bot's latest update"),

  async execute(interaction, client) {
    await interaction.deferReply({ fetchReply: true });

    const repoOwner = "Sdriver1";
    const repoName = "Pridebot";

    const commitsResponse = await axios.get(
      `https://api.github.com/repos/${repoOwner}/${repoName}/commits?per_page=4`, // Fetching 4 commits: the latest one + the last 3
      {
        headers: {
          Authorization: `Bearer ${githubToken}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );
    const commitsData = commitsResponse.data;

    // Latest commit
    const latestCommit = commitsData[0];
    const latestCommitDate = new Date(
      latestCommit.commit.author.date
    ).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    const latestCommitLink = latestCommit.html_url;
    const latestCommitTitle = latestCommit.commit.message.split("\n")[0];

    const embed = new EmbedBuilder().setColor(0xff00ae).addFields({
      name: "<:_:1110925802041774151> __Latest GitHub Commit__",
      value: `${latestCommitDate} - [${latestCommitTitle}](${latestCommitLink})\n1. </latest:1150993734180278353> was added. Use it to see bot's latest updates \n2. Removed github section of </stats:1111290488897683579> \n3. Updating </help:1112238192784048208> and </gay:1115861631226884107> with content and grammar fixes `, // Placeholder value. You can edit it as needed.
      inline: false,
    });

    await interaction.editReply({ embeds: [embed] });
  },
};
