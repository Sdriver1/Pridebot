const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const chalk = require("chalk");
const loadTranslations = require("../../config/commandfunctions/translation");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pridemonth")
    .setNameLocalizations({
      fi: "pridekuukausi"
    })
    .setDescription("Only a month? I'm gay all year!")
    .setDescriptionLocalizations({
      fi: "Vain kuukausi? Olen homo koko vuoden!"
    }),

  async execute(interaction, client) {
    const estDate = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    });
    console.log(
      chalk.white.bold(
        `-------------------------- \n/pridemonth \nServer: ${interaction.guild.name} (${interaction.guild.id}) \nUser: ${interaction.user.tag} (${interaction.user.id}) \nTime: ${estDate} (EST) \n--------------------------`
      )
    );

    const interactionLocale = interaction.locale || "en-US";
    const category = "Pride";
    const commandName = "pridemonth";
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
      .setTitle(`<:_:1108822823721521242> ${translations.title}`)
      .setDescription(translations.description)
      .setColor(0xff00ae)
      .setFields(
        {
          name: translations.what_is_pride_month.name,
          value: translations.what_is_pride_month.value,
        },
        {
          name: translations.history.name,
          value: translations.history.value,
        },
        {
          name: translations.pride_month_days.name,
          value: translations.pride_month_days.value,
        }
      );

    await interaction.reply({ embeds: [embed] });
  },
};
