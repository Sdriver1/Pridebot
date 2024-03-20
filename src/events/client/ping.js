async function calculatePing(interaction) {
  if (!interaction.deferred && !interaction.replied) {
    await interaction.deferReply();
    const message = await interaction.fetchReply();
    return message.createdTimestamp - interaction.createdTimestamp;
  } else {
    return Date.now() - interaction.createdTimestamp;
  }
}

module.exports = { calculatePing };
