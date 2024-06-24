const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const chalk = require("chalk");
const loadTranslations = require("../../config/commandfunctions/translation");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("asexual")
    .setNameLocalizations({
      de: "asexualität",
      el: "aσεξουαλικές",
      "es-ES": "asexual",
      fi: "asexuaali",
      nl: "aseksueel",
      ru: "асексуал",
    })
    .setDescription("asexual, bsexual, csexual...")
    .setDescriptionLocalizations({
      de: "asexualität, bsexualität, csexualität...",
      el: "ασεξουαλικές, βσεξουαλικές, γσεξουαλικές...",
      "es-ES": "asexual, bsexual, csexual...",
      fi: "asexuaali, bsexuaali, csexuaali...",
      nl: "asexueel, bsexueel, csexueel...",
      ru: "асексуал, бсексуал, цсексуал...",
    }),

  async execute(interaction, client) {
    const estDate = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    });
    console.log(
      chalk.white.bold(
        `-------------------------- \n/asexual \nServer: ${interaction.guild.name} (${interaction.guild.id}) \nUser: ${interaction.user.tag} (${interaction.user.id}) \nTime: ${estDate} (EST) \n--------------------------`
      )
    );

    const interactionLocale = interaction.locale || "en-US";
    const category = "Pride";
    const commandName = "asexual";
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
      .setTitle(`<:_:1108870840709288111> ${translations.title}`)
      .setDescription(translations.description)
      .setColor(0x9b59b6)
      .setFields(
        {
          name: translations.what_is_asexuality.name,
          value: translations.what_is_asexuality.value,
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
          name: translations.aromantic_days.name,
          value: translations.aromantic_days.value,
        },
        {
          name: translations.asexual_days.name,
          value: translations.asexual_days.value,
        }
      );

    await interaction.reply({ embeds: [embed] });
  },
};
