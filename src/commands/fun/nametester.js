const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const chalk = require("chalk");

const {
  containsDisallowedContent,
} = require("../../config/detection/containDisallow");
const { scanText } = require("../../config/detection/perspective");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("nametester")
    .setDescription("Tests out names in a sentence.")
    .addStringOption((option) =>
      option.setName("name").setDescription("Name to test").setRequired(true)
    )
    .addBooleanOption((option) =>
      option
        .setName("public")
        .setDescription("Set to true to make the response visible to everyone")
        .setRequired(false)
    ),

  async execute(interaction) {
    const estDate = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    });
    console.log(
      chalk.white.bold(
        `-------------------------- \n/nametester \nServer: ${interaction.guild.name} (${interaction.guild.id}) \nUser: ${interaction.user.tag} (${interaction.user.id}) \nTime: ${estDate} (EST) \n--------------------------`
      )
    );

    const name = interaction.options.getString("name");
    const public = interaction.options.getBoolean("public");
    const username = interaction.user.username;
    const scoreupdate = await scanText(name);

    if (name) {
      const result = await containsDisallowedContent(name, username);
      if (result) {
        return interaction.reply({
          content: "The preferred name contains disallowed content.",
          ephemeral: true,
        });
      }
    }

    if (scoreupdate !== null) {
      const { toxicity, insult } = scoreupdate;
      if (toxicity > 0.65 || insult > 0.65) {
        console.log(
          chalk.yellowBright.bold(
            `⚠️  ${username} has been flagged for toxic or insulting content \nToxicity: ${(
              toxicity * 100
            ).toFixed(2)}% \nInsult: ${(insult * 100).toFixed(
              2
            )}% \nContent: "${name}"`
          )
        );
        return interaction.reply({
          content:
            "One of your test have been flagged for high toxicity or insult.",
          ephemeral: true,
        });
      }
    } else {
      return interaction.reply({
        content: "There was an error analyzing your message. Please try again.",
        ephemeral: true,
      });
    }

    const embed = new EmbedBuilder()
      .setTitle("Name Tester")
      .setDescription(`Explore new names!`)
      .setFields(
        {
          name: "Subject of the sentence",
          value: `**${name}** is walking down the street on a nice sunny day.`,
        },
        {
          name: "Object of the sentence",
          value: `The dog is chasing **${name}** down the street.`,
        },
        {
          name: "Possessive Determiner",
          value: `The ball belongs to **${name}**.`,
        },
        {
          name: "Possessive Pronoun",
          value: `The ball is **${name}'s**.`,
        },
        {
          name: "Being talked too",
          value: `Hey **${name}**, how are you doing today?`,
        }
      )
      .setColor(0xff00ae)
      .setFooter({
        text: "...",
      })
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: !public });
  },
};
