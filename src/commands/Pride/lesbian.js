const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const chalk = require("chalk");
const loadTranslations = require("../../config/commandfunctions/translation");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lesbian")
    .setNameLocalizations({
      de: "lesbisch",
      fi: "lesbo",
      ru: "лесбиянки",
    })
    .setDescription("woman or 𝘸𝘰𝘮𝘢𝘯")
    .setDescriptionLocalizations({
      de: "frau oder 𝘧𝘳𝘢𝘶",
      fi: "nainen tai 𝘯𝘢𝘪𝘯𝘦𝘯",
      ru: "женщина или женщина",
    }),

  async execute(interaction, client) {
    const estDate = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    });
    console.log(
      chalk.white.bold(
        `-------------------------- \n/lesbian \nServer: ${interaction.guild.name} (${interaction.guild.id}) \nUser: ${interaction.user.tag} (${interaction.user.id}) \nTime: ${estDate} (EST) \n--------------------------`
      )
    );

    const interactionLocale = interaction.locale || "en-US";
    const category = "Pride";
    const commandName = "lesbian";
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
      .setTitle(`<:_:1108868440363642930> ${translations.title}`)
      .setDescription(translations.description)
      .setColor(0xff00ae)
      .setFields(
        {
          name: translations.what_is_lesbian.name,
          value: translations.what_is_lesbian.value,
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
          name: translations.lesbian_days.name,
          value: translations.lesbian_days.value,
        }
      );

    await interaction.reply({ embeds: [embed] });
  },
};
