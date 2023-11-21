const {
    SlashCommandBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("bugreport")
      .setDescription("Report a bug in Pridebot"),
    
    async execute(interaction) {
      // Create the bug report modal
      const bugReportModal = new ModalBuilder()
        .setCustomId("bugReportModal")
        .setTitle("Pridebot Bug Report");
  
      // Add text input for command
      const commandInput = new TextInputBuilder()
        .setCustomId("commandInput")
        .setLabel("Command bug occurred on")
        .setStyle(TextInputStyle.Short);
  
      // Add text input for bug description
      const descriptionInput = new TextInputBuilder()
        .setCustomId("descriptionInput")
        .setLabel("Describe the bug you encountered")
        .setStyle(TextInputStyle.Paragraph);
  
      // Add inputs to modal
      bugReportModal.addComponents(
        new ActionRowBuilder().addComponents(commandInput),
        new ActionRowBuilder().addComponents(descriptionInput)
      );
  
      await interaction.showModal(bugReportModal);
    }
  };
  