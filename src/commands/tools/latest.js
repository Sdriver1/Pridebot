require("dotenv").config();
const { githubToken } = process.env;
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const axios = require("axios");
const chalk = require("chalk");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("latest")
    .setDescription("Get the bot's latest update"),

  async execute(interaction, client) {
    const estDate = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    });
    console.log(
      chalk.white.bold(
        `-------------------------- \n/latest \nServer: ${interaction.guild.name} (${interaction.guild.id}) \nUser: ${interaction.user.tag} (${interaction.user.id}) \nTime: ${estDate} (EST) \n--------------------------`
      )
    );

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

    const embed = new EmbedBuilder().setColor(0xff00ae).addFields(
      {
        name: "<:_:1110925802041774151> __Latest GitHub Commit__",
        value: `${latestCommitDate} - [${latestCommitTitle}](${latestCommitLink})`,
        inline: false,
      },
      {
        name: "<:_:1110925802041774151> Updates",
        value: `1. Added 4 new commands: </bisexual:1183503172036206632>, </nonbinary:1183503172036206633>, </pansexual:1183503172036206634>, and </transgender:1183503172036206636> \n2. Redid </lesbian:1183468824478089247> and </gay:1183468824478089246> \n3. Moved </pronountester:1179995184059121766> to Tools \n4. Updated </help:1112238192784048208> and [README.](https://github.com/Sdriver1/Pridebot#readme) with new commands`,
        inline: false,
      }
    );

    await interaction.reply({ embeds: [embed] });
  },
};

// Pride: </bisexual:1183503172036206632>, </lesbian:1183468824478089247> || </gay:1183468824478089246> || </nonbinary:1183503172036206633> || </pansexual:1183503172036206634> || </transgender:1183503172036206636>
// Support: </mentalhealth:1176262554071334994> || </comingout:1176020092581060678>
// Terms: </sexuality:1111289006299283456> || </gender:1112200593310756874> || </pronouns:1111772157538730116>
// Tools: </stats:1111290488897683579> || </help:1112238192784048208> || </latest:1150993734180278353> || </bugreport:1176639348423266457> || </feedback:1176639348423266456> || </pronountester:1179995184059121766>
// ReadME - https://github.com/Sdriver1/Pridebot#readme
