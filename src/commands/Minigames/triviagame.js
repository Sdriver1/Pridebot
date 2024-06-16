const {
  SlashCommandBuilder,
  ActionRowBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
} = require("discord.js");
const Minigame = require("../../../mongo/models/minigame");
const chalk = require("chalk");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("triviagame")
    .setDescription("Start a trivia game.")
    .addStringOption((option) =>
      option
        .setName("category")
        .setDescription("The category of the trivia game.")
        .setRequired(true)
        .addChoices(
          { name: "Genders", value: "Genders" },
          { name: "Sexuality", value: "Sexuality" },
          { name: "General", value: "General" },
          { name: "History", value: "History" }
        )
    )
    .addIntegerOption((option) =>
      option
        .setName("questions")
        .setDescription("The number of questions in the trivia game.")
        .setRequired(false)
    ),

  async execute(interaction) {
    const estDate = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    });
    console.log(
      chalk.white.bold(
        `-------------------------- \n/triviagame \nServer: ${interaction.guild.name} (${interaction.guild.id}) \nUser: ${interaction.user.tag} (${interaction.user.id}) \nTime: ${estDate} (EST) \n--------------------------`
      )
    );
    const category = interaction.options.getString("category");
    const questionsCount = interaction.options.getInteger("questions");

    const minigame = await Minigame.findOne({});
    if (!minigame) {
      return interaction.reply({
        content: "No minigame found in the database.",
        ephemeral: true,
      });
    }

    const selectedCategory = minigame.minigame.triviaGame.categories.find(
      (cat) => cat.category === category
    );

    if (!selectedCategory || selectedCategory.questions.length === 0) {
      return interaction.reply({
        content: "Not enough questions in this category.",
        ephemeral: true,
      });
    }

    const questions = questionsCount
      ? selectedCategory.questions.slice(0, questionsCount)
      : selectedCategory.questions;

    await interaction.reply({
      content: `Starting trivia game with ${questions.length} questions from category ${category}.`,
      ephemeral: true,
    });

    const startEmbed = new EmbedBuilder()
      .setTitle("Pridebot Trivia Game")
      .setDescription(
        `Category: **${category}**\nNumber of Questions: **${questions.length}**\n\nClick the button below when you're ready to start.`
      )
      .setColor(0xff00ea);

    const startButton = new ButtonBuilder()
      .setCustomId("start")
      .setLabel("Start Game")
      .setStyle(ButtonStyle.Success);

    const startMessage = await interaction.followUp({
      embeds: [startEmbed],
      components: [new ActionRowBuilder().addComponents(startButton)],
    });

    const filter = (i) =>
      i.customId === "start" && i.user.id === interaction.user.id;
    await startMessage.awaitMessageComponent({
      filter,
      componentType: ComponentType.Button,
    });

    const embed = new EmbedBuilder()
      .setTitle("Pridebot Trivia Game")
      .setDescription(
        `Category: **${category}**\nNumber of Questions: **${questions.length}**`
      )
      .setColor(0xff00ea);

    await startMessage.edit({
      embeds: [embed],
      components: [],
    });

    const askQuestion = async (question, index) => {
      embed
        .setTitle(`Question ${index + 1}`)
        .setDescription(question.question)
        .setFooter({ text: " " });

      const buttons = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("A")
          .setLabel(`A: ${question.options[0]}`)
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId("B")
          .setLabel(`B: ${question.options[1]}`)
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId("C")
          .setLabel(`C: ${question.options[2]}`)
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId("D")
          .setLabel(`D: ${question.options[3]}`)
          .setStyle(ButtonStyle.Primary)
      );

      await startMessage.edit({
        embeds: [embed],
        components: [buttons],
      });

      const filter = (i) =>
        i.customId === "A" ||
        i.customId === "B" ||
        i.customId === "C" ||
        i.customId === "D";
      const response = await startMessage.awaitMessageComponent({
        filter,
        componentType: ComponentType.Button,
        time: 15000,
      });

      if (response) {
        const selectedAnswer = response.customId;
        const correctAnswer = ["A", "B", "C", "D"].find(
          (_, idx) => question.options[idx] === question.correctAnswer
        );

        if (selectedAnswer === correctAnswer) {
          embed.setDescription(
            `${question.question}\n\nCorrect! The answer was ${correctAnswer}.`
          );
        } else {
          embed.setDescription(
            `${question.question}\n\nWrong! The correct answer was ${correctAnswer}.`
          );
        }
      } else {
        embed.setDescription(`${question.question}\n\nTime's up!`);
        embed.setFooter({ text: "Time's up!" });
      }

      await startMessage.edit({ embeds: [embed], components: [] });
      await new Promise((resolve) => setTimeout(resolve, 5000));
    };

    for (let i = 0; i < questions.length; i++) {
      await askQuestion(questions[i], i);
    }

    embed
      .setTitle("Trivia Game Over")
      .setDescription("Thanks for playing!")
      .setFooter({ text: " " });
    await startMessage.edit({
      embeds: [embed],
      components: [],
    });
  },
};
