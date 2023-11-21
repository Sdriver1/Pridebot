const { EmbedBuilder } = require("discord.js");

module.exports = async (client, interaction) => {
  if (!interaction.isModalSubmit()) return;

  let channelId;
  let title, fields;
  let reactions = [];

  try {
    if (interaction.customId === "feedbackModal") {
      channelId = "1176640398563754085"; // Channel ID for feedback
      const feedback = interaction.fields.getTextInputValue("feedbackInput");
      const suggestions = interaction.fields.getTextInputValue("suggestionsInput");

      title = "Feedback";
      fields = [
        { name: "Feedback", value: feedback },
        { name: "Suggestions", value: suggestions },
      ];
      reactions = ["⭐"]; // Set reactions for feedback
    } else if (interaction.customId === "bugReportModal") {
      channelId = "1151324412973416549"; // Original channel ID for bug reports
      const command = interaction.fields.getTextInputValue("commandInput");
      const description = interaction.fields.getTextInputValue("descriptionInput");

      title = "Bug Report";
      fields = [
        { name: "Command", value: command },
        { name: "Description", value: description },
      ];
      reactions = ["✅", "🔍", "❌"]; // Set reactions for bug reports
    } else {
      // If the modal doesn't match known IDs, ignore it
      return;
    }

    const channel = client.channels.cache.get(channelId);
    if (!channel) {
      console.error("Channel not found");
      return;
    }

    const responseEmbed = new EmbedBuilder()
      .setTitle(title)
      .addFields(fields)
      .setColor(0xff00ae);

    const sentMessage = await channel.send({ embeds: [responseEmbed] });
    await interaction.reply({
      content: "Your submission has been received!",
      ephemeral: true,
    });

    // React to the message with appropriate reactions
    for (const reaction of reactions) {
      await sentMessage.react(reaction);
    }

  } catch (error) {
    console.error("Error handling modal submission:", error);
    await interaction.reply({
      content: "There was an error processing your submission.",
      ephemeral: true,
    });
  }
};
