const CommandUsage = require("../../../mongo/models/usageSchema");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) return;

      try {
        await CommandUsage.findOneAndUpdate(
          { commandName: interaction.commandName },
          { $inc: { count: 1 } },
          { upsert: true, new: true }
        );

        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: `Error occurred while executing this command \nIf the error contiunes, please use </bugreport:1176639348423266457> to alert developers, Thank you!`,
          ephemeral: true,
        });
      }
    }
  },
};
