const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const chalk = require("chalk");
const loadTranslations = require("../../config/commandfunctions/translation");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gay")
    .setNameLocalizations({
      "es-ES": "gay",
      fi: "homo",
    })
    .setDescription("Imagine being gay, couldn't be me")
    .setDescriptionLocalizations({
      "es-ES": "Imagina ser gay, no podría ser yo",
      fi: "Kuvittele olevasi homo, en voisi olla minä.",
    }),

  async execute(interaction, client) {
    const estDate = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    });
    console.log(
      chalk.white.bold(
        `-------------------------- \n/gay \nServer: ${interaction.guild.name} (${interaction.guild.id}) \nUser: ${interaction.user.tag} (${interaction.user.id}) \nTime: ${estDate} (EST) \n--------------------------`
      )
    );

    const interactionLocale = interaction.locale || "en-US";
    const category = "Pride";
    const commandName = "gay";
    let translations;
    try {
      translations = loadTranslations(interactionLocale, category, commandName);
    } catch (error) {
      console.error(`Error loading translations:`, error);
      translations = loadTranslations("en-US", category, commandName);
      await interaction.reply(
        `Your language (${interactionLocale}) is not set up. Defaulting to English.`
      );
    }

    const embed = new EmbedBuilder()
      .setTitle(`<:_:1109676932251000923> ${translations.title}`)
      .setDescription(translations.description)
      .setColor(0xff00ae)
      .setFields(
        {
          name: translations.what_is_gay.name,
          value: translations.what_is_gay.value,
        },
        {
          name: translations.history.name,
          value: translations.history.value,
        },
        {
          name: translations.flag.name,
          value: translations.flag.value,
        },
        {
          name: translations.honoring_days.name,
          value: translations.honoring_days.value,
        }
      );
      
    await interaction.reply({ embeds: [embed] });
  },
};
