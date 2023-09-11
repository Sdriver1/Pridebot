const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Shows command list and helpful links"),

  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setTitle(`Pridebot Help`)
      .setDescription(
        `Pridebot is pride themed bot developed by <@691506668781174824> with main goal of providing users with information on many sexualities, genders, pronouns, and other identities. It is used to help educate and develop users knowledge of LGBTQ identities and users of LGBTQ questioning themselves with unbiased and accurate information to help them discover themselves. `
      )
      .setColor(0xff00ae)
      .addFields(
        {
          name: "<:_:1115831076993110067> Commands",
          value: `**Utility:** \n</help:1112238192784048208> - Shows command list and helpful links \n</stats:1111290488897683579> - Get the bot's and discord stats\n\n**LGBTQ related:** \n</gender:1112200593310756874> - Learn about any kinds or types of genders \n</pronouns:1111772157538730116> - Learn about any kinds or types of pronouns \n</sexuality:1111289006299283456> - Learn about any kinds or types of sexualities`,
        },
        {
          name: "Useful links",
          value:
            "[**Support Server**](https://discord.gg/guybqSTzdS) \n[**Bot Invite**](https://discord.com/api/oauth2/authorize?client_id=1101256478632972369&permissions=415001594945&scope=bot%20applications.commands) \n[**Github Repo**](https://github.com/Sdriver1/Pridebot)",
        }
      );
    await interaction.reply({ embeds: [embed] });
  },
};
