const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const chalk = require("chalk");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pridemonth")
    .setDescription("Only a month? I'm gay all year!"),

  async execute(interaction, client) {
    const estDate = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    });
    console.log(
      chalk.white.bold(
        `-------------------------- \n/pridemonth \nServer: ${interaction.guild.name} (${interaction.guild.id}) \nUser: ${interaction.user.tag} (${interaction.user.id}) \nTime: ${estDate} (EST) \n--------------------------`
      )
    );
    const embed = new EmbedBuilder()
      .setTitle(`<:_:1108822823721521242>  Pride Month!`)
      .setDescription(`Here are some facts about Pride Month:`)
      .setColor(0xff00ae)
      .setFields(
        {
          name: `What is Pride Month`,
          value: `Pride Month is celebrated each year in June to honor the 1969 Stonewall Uprising in New York City. It's a time when the LGBTQ+ community comes together to celebrate their identities, achievements, and ongoing struggles for equality.`,
        },
        {
          name: `History`,
          value: `The Stonewall Uprising began on June 28, 1969, and is considered a pivotal event in the fight for LGBTQ+ rights. The first official Pride Month was celebrated in June 1970, marking the one-year anniversary of the Stonewall Uprising. This event sparked the formation of various LGBTQ+ advocacy groups and led to the first Pride marches in major cities like New York, Los Angeles, and Chicago. Over the years, Pride Month has grown and spread to other countries, becoming a global celebration of diversity and inclusion.`,
        },
        {
          name: `Days/Honoring Times`,
          value: `- LGBTQ+ Pride Month - **June** \n- Stonewall Uprising anniversary - **June 28th**`,
        }
      );
    await interaction.reply({ embeds: [embed] });
  },
};
