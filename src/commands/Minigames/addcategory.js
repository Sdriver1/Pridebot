const { SlashCommandBuilder } = require("discord.js");
const Minigame = require("../../../mongo/models/minigame");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("addcategory")
    .setDescription("Add a new category for a minigame.")
    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("The type of the minigame.")
        .setRequired(true)
        .addChoices(
          { name: "Gender Game", value: "gendergame" },
          { name: "Sexuality Game", value: "sexualitygame" },
          { name: "Trivia Game", value: "triviaGame" },
          { name: "Memory Game", value: "memoryGame" },
          { name: "Word Puzzle", value: "wordPuzzle" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("category")
        .setDescription("The category name.")
        .setRequired(true)
    ),

  async execute(interaction) {
    const type = interaction.options.getString("type");
    const category = interaction.options.getString("category");

    let minigame = await Minigame.findOne({});
    if (!minigame) {
      // Create a new Minigame document with the specified type and category
      const newMinigame = new Minigame({
        minigame: {
          gendergame: { categories: [] },
          memoryGame: { categories: [] },
          sexualitygame: { categories: [] },
          triviaGame: { categories: [] },
          wordPuzzle: { categories: [] },
        },
      });
      newMinigame.minigame[type].categories.push({ category });
      await newMinigame.save();
      return interaction.reply({
        content: `Minigame document created and category ${category} added to ${type}.`,
        ephemeral: true,
      });
    }

    if (!minigame.minigame[type].categories) {
      minigame.minigame[type].categories = [];
    }

    minigame.minigame[type].categories.push({ category });
    await minigame.save();

    interaction.reply({
      content: `Category ${category} added to ${type}.`,
      ephemeral: true,
    });
  },
};
