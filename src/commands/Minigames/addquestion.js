const { SlashCommandBuilder } = require("discord.js");
const Minigame = require("../../../mongo/models/minigame");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("addquestion")
    .setDescription("Add a question to a category.")
    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("The type of the minigame.")
        .setRequired(true)
        .addChoices(
          { name: "Gender Game", value: "gendergame" },
          { name: "Sexuality Game", value: "sexualitygame" },
          { name: "Trivia Game", value: "triviaGame" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("category")
        .setDescription("The category name.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("question")
        .setDescription("The question to add.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("options")
        .setDescription("The options for the question, separated by commas.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("correct")
        .setDescription("The correct answer.")
        .setRequired(true)
    ),

  async execute(interaction) {
    const type = interaction.options.getString("type");
    const category = interaction.options.getString("category");
    const questionText = interaction.options.getString("question");
    const options = interaction.options.getString("options").split(",");
    const correctAnswer = interaction.options.getString("correct");

    const minigame = await Minigame.findOne({});
    if (!minigame) {
      return interaction.reply({
        content: "No minigame found in the database.",
        ephemeral: true,
      });
    }

    // Ensure categories array exists
    if (!minigame.minigame[type].categories) {
      minigame.minigame[type].categories = [];
    }

    let categoryObject = minigame.minigame[type].categories.find(
      (cat) => cat.category === category
    );
    if (!categoryObject) {
      categoryObject = {
        category: category,
        questions: []
      };
      minigame.minigame[type].categories.push(categoryObject);
    }

    const question = {
      question: questionText,
      options: options,
      correctAnswer: correctAnswer
    };

    categoryObject.questions.push(question);

    await minigame.save();

    interaction.reply({
      content: `Question added to ${category} in ${type}.`,
      ephemeral: true,
    });
  },
};
