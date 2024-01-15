const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const chalk = require("chalk");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gaydar")
    .setDescription("Why am I bi myself again ;-;")
    .addBooleanOption((option) =>
      option
        .setName("user")
        .setDescription("Try to see how gay another user is")
        .setRequired(false)
    ),

  async execute(interaction, client) {
    const estDate = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    });
    console.log(
      chalk.white.bold(
        `-------------------------- \n/gaydar \nServer: ${interaction.guild.name} (${interaction.guild.id}) \nUser: ${interaction.user.tag} (${interaction.user.id}) \nTime: ${estDate} (EST) \n--------------------------`
      )
    );

    // Check if the user option is provided
    let userOption = interaction.options.getBoolean("user");
    let user = userOption ? userOption : interaction.user.tag;

    // Generate a random number between 0 and 100
    let meter = Math.floor(Math.random() * 101);

    const embed = new EmbedBuilder()
      .setTitle(`How gay is ${user}`)
      .setDescription(`${user} is **${meter}% gay!**`)
      .setColor(0xff00ae);
    await interaction.reply({ embeds: [embed] });
  },
};
