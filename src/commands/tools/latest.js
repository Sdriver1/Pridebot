require("dotenv").config();
const { githubToken } = process.env;
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
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
      `https://api.github.com/repos/${repoOwner}/${repoName}/commits?per_page=4`,
      {
        headers: {
          Authorization: `Bearer ${githubToken}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );
    const commitsData = commitsResponse.data;

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

    const embed = new EmbedBuilder().setColor(0xff00ae)
    .addFields(
      {
      name: "<:_:1110925802041774151> __Latest GitHub Commit__",
      value: `${latestCommitDate} - [${latestCommitTitle}](${latestCommitLink})`, // Placeholder value. You can edit it as needed.
      inline: false,
      },
      {
        name: "<:_:1110925802041774151> Updates",
        value: `1. Reworked </help:1112238192784048208> so now has select menu for command info \n2. Moved commands from 2 categories to 4 categories and add 2 new commands \n3. New commands: </mentalhealth:1176244149184385054> and </comingout:1176020092581060678> (Info in </help:1112238192784048208> under support) \n4. Changed start time in </stats:1111290488897683579> to timestamp \n5. Added a [README.](https://github.com/Sdriver1/Pridebot/blob/main/README.md) to Github]`, // Placeholder value. You can edit it as needed.
        inline: false,
      }
    );

    await interaction.editReply({ embeds: [embed] });
  },
};

// Pride: </lesbian:1115869305062576250> || </gay:1115861631226884107>
// Support: </mentalhealth:1176244149184385054> || </comingout:1176020092581060678>
// Terms: </sexuality:1111289006299283456> || </gender:1112200593310756874> || </pronouns:1111772157538730116>
// Tools: </stats:1111290488897683579> || </help:1112238192784048208> || </latest:1150993734180278353>
//
