async function getRegisteredCommandsCount(client) {
  if (!client.application?.id) {
    console.error("Client application is not ready.");
    return 0;
  }
  const commands = await client.application.commands.fetch();
  return commands.size;
}

module.exports = { getRegisteredCommandsCount };