const { EmbedBuilder, WebhookClient } = require("discord.js");
const { webFeedback, webBugReport } = process.env;

module.exports = async (client, interaction) => {
  if (!interaction.isModalSubmit()) return;

  await interaction.deferReply({ ephemeral: true });

  try {
    if (
      interaction.customId === "feedbackModal" ||
      interaction.customId === "bugReportModal"
    ) {
      let webhookUrl =
        interaction.customId === "feedbackModal" ? webFeedback : webBugReport;
      let title =
        interaction.customId === "feedbackModal" ? "Feedback" : "Bug Report";
      let fields = getModalFields(interaction);

      const responseEmbed = new EmbedBuilder()
        .setTitle(`${title} from ${interaction.user.tag}`)
        .addFields(fields)
        .setColor(0xff00ae)
        .setFooter({
          text: `ID: ${interaction.user.id}`,
          iconURL: interaction.user.displayAvatarURL(),
        })
        .setTimestamp();

      const webhook = new WebhookClient({ url: webhookUrl });
      await webhook.send({ embeds: [responseEmbed] });
    } else if (interaction.customId === "suggestionModal") {
      await handleSuggestionModal(client, interaction); // @TODO: Either implement this function or remove this line
    } else {
      await interaction.editReply({
        content: "This action is not supported.",
        ephemeral: true,
      });
      return;
    }

    await interaction.editReply({
      content: "Your submission has been received!",
      ephemeral: true,
    });
  } catch (error) {
    console.error("Error handling modal submission:", error);
    await interaction.editReply({
      content: "There was an error processing your submission.",
      ephemeral: true,
    });
  }
};

function getModalFields(interaction) {
  if (interaction.customId === "feedbackModal") {
    return [
      {
        name: "Feedback",
        value: interaction.fields.getTextInputValue("feedbackInput"),
      },
      {
        name: "Suggestions",
        value: interaction.fields.getTextInputValue("suggestionsInput"),
      },
    ];
  } else if (interaction.customId === "bugReportModal") {
    return [
      {
        name: "Command",
        value: interaction.fields.getTextInputValue("commandInput"),
      },
      {
        name: "Description",
        value: interaction.fields.getTextInputValue("descriptionInput"),
      },
    ];
  }
}
