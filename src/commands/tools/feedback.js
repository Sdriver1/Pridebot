const {
  SlashCommandBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("feedback")
    .setDescription("Provide feedback for Pridebot"),

  async execute(interaction) {
    const feedbackModal = new ModalBuilder()
      .setCustomId("feedbackModal")
      .setTitle("Pridebot Feedback");

    const feedbackInput = new TextInputBuilder()
      .setCustomId("feedbackInput")
      .setLabel("What's your feedback on Pridebot?")
      .setStyle(TextInputStyle.Paragraph);

    const suggestionsInput = new TextInputBuilder()
      .setCustomId("suggestionsInput")
      .setLabel("Suggestions for bot commands or improvements")
      .setStyle(TextInputStyle.Paragraph);

    feedbackModal.addComponents(
      new ActionRowBuilder().addComponents(feedbackInput),
      new ActionRowBuilder().addComponents(suggestionsInput)
    );

    await interaction.showModal(feedbackModal);
  },
};
