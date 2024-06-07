async function react(reaction, user, client) {
  if (reaction.emoji.id === "1248480641301872650") {
    try {
      const IDLists = require("../../../mongo/models/idSchema.js");
      const idLists = await IDLists.findOne();

      if (idLists.devs.includes(user.id)) {
        if (reaction.message.author.id === client.user.id) {
          await reaction.message.delete();
        }
      }
    } catch (error) {
      console.error("Error handling reaction:", error);
    }
  }
}

async function addTrashCanReaction(message) {
  try {
    await message.react("1248480641301872650");
  } catch (error) {
    console.error("Failed to add reaction:", error);
  }
}

module.exports = {
  react,
  addTrashCanReaction,
};
