const {
    SlashCommandBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("feedback")
      .setDescription("Provide feedback for Pridebot"),
    
    async execute(interaction) {
      // Create the feedback modal
      const feedbackModal = new ModalBuilder()
        .setCustomId("feedbackModal")
        .setTitle("Pridebot Feedback");
  
      // Add text input for feedback
      const feedbackInput = new TextInputBuilder()
        .setCustomId("feedbackInput")
        .setLabel("What's your feedback on Pridebot?")
        .setStyle(TextInputStyle.Paragraph);
  
      // Add text input for suggestions
      const suggestionsInput = new TextInputBuilder()
        .setCustomId("suggestionsInput")
        .setLabel("Suggestions for bot commands or improvements")
        .setStyle(TextInputStyle.Paragraph);
  
      // Add inputs to modal
      feedbackModal.addComponents(
        new ActionRowBuilder().addComponents(feedbackInput),
        new ActionRowBuilder().addComponents(suggestionsInput)
      );
  
      await interaction.showModal(feedbackModal);
    }
  };
  