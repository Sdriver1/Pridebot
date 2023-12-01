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
      value: `${latestCommitDate} - [${latestCommitTitle}](${latestCommitLink})`, 
      inline: false,
      },
      {
        name: "<:_:1110925802041774151> Updates",
        value: `1. Added proper bot database \n2. Added new command </pronountester:1179982757313642609> \n3. Updated Bot dependencies \n4. Cleaned up </help:1112238192784048208> and a couple bot files \n5. Updated [README.](https://github.com/Sdriver1/Pridebot#readme).`, 
        inline: false,
      }
    );

    await interaction.editReply({ embeds: [embed] });
  },
};

// Pride: </lesbian:1115869305062576250> || </gay:1115861631226884107> || </pronountester:1179982757313642609>
// Support: </mentalhealth:1176262554071334994> || </comingout:1176020092581060678>
// Terms: </sexuality:1111289006299283456> || </gender:1112200593310756874> || </pronouns:1111772157538730116>
// Tools: </stats:1111290488897683579> || </help:1112238192784048208> || </latest:1150993734180278353> || </bugreport:1176639348423266457> || </feedback:1176639348423266456>
// ReadME - https://github.com/Sdriver1/Pridebot#readme

