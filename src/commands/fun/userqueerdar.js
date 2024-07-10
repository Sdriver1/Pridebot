const {
  EmbedBuilder,
  ContextMenuCommandBuilder,
  ApplicationCommandType,
} = require("discord.js");
const utility_functions = {
  chance: function (probability) {
    if (Math.random() > probability) return false;
    return true;
  },
  number_format_commas: function (number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },
};
const ids = {
  bot: "1101256478632972369",
  tree: "950951110829551658",
};

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("User Queerdar")
    .setType(ApplicationCommandType.User),

  async execute(interaction) {
    const targetUser = interaction.targetUser;
    const userName = targetUser.username;
    const userid = targetUser.id;

    let meter;
    if (userid === ids.bot) {
      meter = 101;
    } else if (userid === ids.tree) {
      meter = 100;
    } else if (utility_functions.chance(0.0001)) {
      meter = Math.floor(Math.random() * 2354082) + 500;
      if (utility_functions.chance(0.5)) {
        meter *= -1;
      }
    } else {
      meter = Math.floor(Math.random() * 101);
    }

    const embed = new EmbedBuilder()
      .setTitle(`How queer is ${userName}?`)
      .setDescription(
        `<@${userid}> is **${utility_functions.number_format_commas(
          meter
        )}% queer!**`
      )
      .setColor(0xff00ae)
      .setFooter({
        text: "The bot has 99.99% accuracy rate on checking users queerness",
      });
    await interaction.reply({ embeds: [embed] });
  },
};
