const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const chalk = require("chalk");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("queer")
    .setDescription("OMG! QUEER!"),

  async execute(interaction, client) {
    const estDate = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    });
    console.log(
      chalk.white.bold(
        `-------------------------- \n/queer \nServer: ${interaction.guild.name} (${interaction.guild.id}) \nUser: ${interaction.user.tag} (${interaction.user.id}) \nTime: ${estDate} (EST) \n--------------------------`
      )
    );
    const embed = new EmbedBuilder()
      .setTitle(`Queer Identity!`)
      .setDescription(`Here are some facts on "queer"`)
      .setColor(0xff00ae)
      .setFields(
        {
          name: `What is "Queer"`,
          value: `The term "queer" is an umbrella term for people who are not heterosexual or not cisgender. It's a term that encompasses a wide spectrum of sexual orientations and gender identities, celebrating the diversity of the LGBTQ+ community. `,
        },
        {
          name: `History`,
          value: `Originally used as a derogatory term, "queer" has been reclaimed by the LGBTQ+ community as a symbol of pride and defiance against discrimination. Its usage as an inclusive and unifying label reflects the diversity and complexity of LGBTQ+ experiences.`,
        },
        {
            name: `<:_:1177459443231895563> The Flag`,
            value: `The queer pride flag, often synonymous with the LGBTQ+ pride flag, is a symbol of queer identity and community. It typically features the rainbow design, with each color representing a different aspect of the community: red for life, orange for healing, yellow for sunlight, green for nature, blue for harmony, and violet for spirit. This flag is widely recognized as a symbol of LGBTQ+ pride and diversity, celebrating the inclusion and acceptance of all sexual orientations and gender identities within the queer community.`,
        },          
        {
          name: `Important Dates`,
          value: `- LGBTQ+ Pride Month - **June** \n- National Coming Out Day - **October 11th**`,
        }
      );
    await interaction.reply({ embeds: [embed] });
  },
};
