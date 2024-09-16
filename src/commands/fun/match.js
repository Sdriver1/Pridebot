const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const commandLogging = require("../../config/logging/commandlog");
const utility_functions = {
  chance: function (probability) {
    return Math.random() < probability;
  },
  number_format_commas: function (number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("match")
    .setDescription("Determine the compatibility between two users.")
    .addUserOption((option) =>
      option
        .setName("user1")
        .setDescription("The first user to match")
        .setRequired(true)
    )
    .addUserOption((option) =>
      option
        .setName("user2")
        .setDescription("The second user to match")
        .setRequired(false)
    ),

  async execute(interaction, client) {
    const user1 = interaction.options.getUser("user1");
    let user2 = interaction.options.getUser("user2");

    if (!user2) {
      user2 = interaction.user;
    }

    let description;
    if (utility_functions.chance(0.01)) {
      description = `<@${user1.id}> and <@${user2.id}> are **perfectly compatible**!`;
    } else if (utility_functions.chance(0.01)) {
      description = `<@${user1.id}> and <@${user2.id}> are **not compatible at all**!`;
    } else {
      description = `<@${user1.id}> and <@${user2.id}> are **${Math.floor(
        Math.random() * 101
      )}%** compatible!`;
    }

    const user1name = user1.username;
    const user2name = user2.username;

    const embed = new EmbedBuilder()
      .setTitle(`How compatible is ${user1name} and ${user2name}?`)
      .setDescription(description)
      .setColor(0xff00ae)
      .setFooter({
        text: "The bot has 99.99% accuracy rate on checking users compatibility",
      });

    await interaction.reply({ embeds: [embed] });
    await commandLogging(client, interaction);
  },
};
