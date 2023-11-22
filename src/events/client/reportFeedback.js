const { EmbedBuilder, WebhookClient } = require("discord.js");
const { Routes } = require("discord-api-types/v10");
const { webFeedback, webBugReport } = process.env;

module.exports = async (client, interaction) => {
  if (!interaction.isModalSubmit()) return;

  let webhookUrl;
  let title, fields;

  try {
    if (interaction.customId === "feedbackModal") {
      webhookUrl = webFeedback;
      const feedback = interaction.fields.getTextInputValue("feedbackInput");
      const suggestions =
        interaction.fields.getTextInputValue("suggestionsInput");

      title = "Feedback";
      fields = [
        { name: "Feedback", value: feedback },
        { name: "Suggestions", value: suggestions },
      ];
    } else if (interaction.customId === "bugReportModal") {
      webhookUrl = webBugReport;
      const command = interaction.fields.getTextInputValue("commandInput");
      const description =
        interaction.fields.getTextInputValue("descriptionInput");

      title = "Bug Report";
      fields = [
        { name: "Command", value: command },
        { name: "Description", value: description },
      ];
    } else {
      return;
    }

    const responseEmbed = new EmbedBuilder()
      .setTitle(title)
      .addFields(fields)
      .setColor(0xff00ae);

    const webhook = new WebhookClient({ url: webhookUrl });

    await webhook.send({
      embeds: [responseEmbed],
    });

    await interaction.reply({
      content: "Your submission has been received!",
      ephemeral: true,
    });
  } catch (error) {
    console.error("Error sending webhook message:", error);
    await interaction.reply({
      content: "There was an error processing your submission.",
      ephemeral: true,
    });
  }
};
