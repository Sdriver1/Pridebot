const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const chalk = require("chalk");

const {
  containsDisallowedContent,
} = require("../../config/blacklist/detection/containDisallow");
const { scanText } = require("../../config/blacklist/detection/perspective");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pronountester")
    .setDescription("Tests out pronouns in a sentence.")
    .addStringOption((option) =>
      option
        .setName("subject")
        .setDescription("Subject pronoun (e.g., he, she, they)")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("object")
        .setDescription("Object pronoun (e.g., him, her, them)")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("possessive")
        .setDescription("Possessive pronoun (e.g., his, her, their)")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("possessive_adjective")
        .setDescription("Possessive adjective (e.g., his, hers, theirs)")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reflexive")
        .setDescription(
          "Reflexive pronoun (e.g., himself, herself, themselves)"
        )
        .setRequired(true)
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
        `-------------------------- \n/tester \nServer: ${interaction.guild.name} (${interaction.guild.id}) \nUser: ${interaction.user.tag} (${interaction.user.id}) \nTime: ${estDate} (EST) \n--------------------------`
      )
    );
    const subject = interaction.options.getString("subject");
    const object = interaction.options.getString("object");
    const possessiveDeterminer = interaction.options.getString("possessive");
    const possessivePronoun = interaction.options.getString(
      "possessive_adjective"
    );
    const reflexive = interaction.options.getString("reflexive");

    const username = interaction.user.username;
    const scoreupdate = await scanText(
      subject ||
        object ||
        possessiveDeterminer ||
        possessivePronoun ||
        reflexive
    );

    if (subject && containsDisallowedContent(subject, username)) {
      return interaction.reply({
        content: "The subject contains disallowed content.",
        ephemeral: true,
      });
    }
    if (object && containsDisallowedContent(object, username)) {
      return interaction.reply({
        content: "The object contains disallowed content.",
        ephemeral: true,
      });
    }
    if (
      possessiveDeterminer &&
      containsDisallowedContent(possessiveDeterminer, username)
    ) {
      return interaction.reply({
        content: "The possessiveDeterminer contains disallowed content.",
        ephemeral: true,
      });
    }
    if (
      possessivePronoun &&
      containsDisallowedContent(possessivePronoun, username)
    ) {
      return interaction.reply({
        content: "The possessivePronoun contains disallowed content.",
        ephemeral: true,
      });
    }
    if (reflexive && containsDisallowedContent(reflexive, username)) {
      return interaction.reply({
        content: "The reflexive contains disallowed content.",
        ephemeral: true,
      });
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
            )}% \nContent: "${
              subject ||
              object ||
              possessiveDeterminer ||
              possessivePronoun ||
              reflexive
            }"`
          )
        );
        return interaction.reply({
          content:
            "One or more of your test have been flagged for high toxicity or insult.",
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
      .setColor(0xff00ae)
      .setTitle(
        `Testing Pronouns: ${
          subject.charAt(0).toUpperCase() + subject.slice(1)
        }/${object.charAt(0).toUpperCase() + object.slice(1)}/${
          possessiveDeterminer.charAt(0).toUpperCase() +
          possessiveDeterminer.slice(1)
        }`
      )
      .setDescription(
        "Explore new pronouns! If you want to learn more about specific pronouns, use </pronouns:1111772157538730116>."
      )
      .addFields(
        {
          name: "__Examples__:",
          value: `**${
            subject.charAt(0).toUpperCase() + subject.slice(1)
          }** is going to the store.\nI saw **${object}** at the party.\n**${
            possessiveDeterminer.charAt(0).toUpperCase() +
            possessiveDeterminer.slice(1)
          }** car is parked outside.\nThe book is **${possessivePronoun}**.\n${
            subject.charAt(0).toUpperCase() + subject.slice(1)
          } prepared the meal **${reflexive}**.`,
          inline: true,
        },
        {
          name: "__Full Pronoun Set__:",
          value: `**Subject Pronoun** - ${subject}\n**Object Pronoun** - ${object}\n**Possessive Determiner** - ${possessiveDeterminer}\n**Possessive Pronoun** - ${possessivePronoun}\n**Reflexive Pronoun** - ${reflexive}`,
          inline: true,
        }
      )
      .setTimestamp();

    const isPublic = interaction.options.getBoolean("public", false);

    await interaction.reply({ embeds: [embed], ephemeral: !isPublic });
  },
};
