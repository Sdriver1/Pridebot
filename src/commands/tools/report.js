const { 
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  SlashCommandBuilder,
  ActionRowBuilder,
  EmbedBuilder,
  ComponentType,
  ButtonBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("feedback")
    .setDescription("Report issues or help with bot development"),

    async execute(interaction) {
      const feedback = [
        {
          name: "Bug/Issue",
          description: "Click to report a bug or issue with the bot",
          value: "bug",
          emoji: "1108421476148859010"
        },
        {
          name: "Information Modifications",
          description: "Click to add/remove/modify bot provided info",
          value: "info",
          emoji: "1108421476148859010"
        },
        {
          name: "Contribute to Bot development",
          description: "Click if you wish to contribute to bot development",
          value: "help",
          emoji: "1108421476148859010"
        },
      ]

    const selectOptions = feedback.map((feed) =>
      new StringSelectMenuOptionBuilder()
        .setLabel(feed.name)
        .setDescription(feed.description)
        .setValue(feed.value)
        .setEmoji(feed.emoji)
    );
    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId("feedbackSelect")
      .setPlaceholder("Click here to contribute any feedback")
      .addOptions(selectOptions);

    const row = new ActionRowBuilder().addComponents(selectMenu);

    const embed = new EmbedBuilder()
      .setTitle("Select the type of feedback you wish to contribute!")
      .addFields({
        name: "Feedback Types",
        value: feedback
          .map((feedback) => `<:_:${feedback.emoji}> **${feedback.name}**`)
          .join("\n"),
        inline: true,
      })
      .setColor("#FF00AE")

      await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });

      const collector = interaction.channel.createMessageComponentCollector({
        componentType: ComponentType.StringSelect,
      });
  
      collector.on("collect", async (selectInteraction) => {
        if (selectInteraction.customId === "feedbackSelect") {
          const selectedValue = selectInteraction.values[0];
  
          if (selectedValue === "bug") {
            const formEmbed = new EmbedBuilder()
              .setTitle("Bug Report")
              .addField("Field 1", "Enter field 1 value")
              .addField("Field 2", "Enter field 2 value")
              .addField("Field 3", "Enter field 3 value")
              .addField("Field 4", "Enter field 4 value")
              .setColor("#FF0000")
              .setTimestamp();
              interaction.guild.channels.cache
              .get("YOUR_SUPPORT_SERVER_CHANNEL_ID")
              .send({ embeds: [formEmbed] });
          } else if (selectedValue === "info") {
            const button1 = new ButtonBuilder()
              .setCustomId("modifyCommand1")
              .setLabel("Command 1")
              .setStyle("PRIMARY");
            const button2 = new ButtonBuilder()
              .setCustomId("modifyCommand2")
              .setLabel("Command 2")
              .setStyle("PRIMARY");
            const button3 = new ButtonBuilder()
              .setCustomId("modifyCommand3")
              .setLabel("Command 3")
              .setStyle("PRIMARY");
  
            const row = new MessageActionRow()
              .addComponents(button1, button2, button3);
              const infoEmbed = new MessageEmbed()
            .setTitle("Information Modifications")
            .setDescription("Which command do you want to submit modifications?")
            .setColor("#00FF00");

          await selectInteraction.update({ embeds: [infoEmbed], components: [row] });
        } else if (selectedValue === "help") {
          const helpEmbed = new MessageEmbed()
            .setTitle("Contribute to Bot Development")
            .setDescription("If you want to contribute to Bot development, please access the bot GitHub [here](https://github.com/) and contact @sdriver1 with code or ideas.")
            .setColor("#0000FF");

          await selectInteraction.reply({ embeds: [helpEmbed], ephemeral: true });
        }
      }
    });
  },
};

     