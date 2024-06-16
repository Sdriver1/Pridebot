const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswer: { type: String, required: true },
});

const categorySchema = new mongoose.Schema({
  category: { type: String, required: true },
  questions: { type: [questionSchema], default: [] },
});

const gendergameSchema = new mongoose.Schema({
  categories: { type: [categorySchema], default: [] },
});

const memoryGameSchema = new mongoose.Schema({
  categories: { type: [categorySchema], default: [] },
});

const sexualitygameSchema = new mongoose.Schema({
  categories: { type: [categorySchema], default: [] },
});

const triviaGameSchema = new mongoose.Schema({
  categories: { type: [categorySchema], default: [] },
});

const wordPuzzleSchema = new mongoose.Schema({
  categories: { type: [categorySchema], default: [] },
});

const minigameSchema = new mongoose.Schema({
  minigame: {
    gendergame: { type: gendergameSchema, default: () => ({}) },
    memoryGame: { type: memoryGameSchema, default: () => ({}) },
    sexualitygame: { type: sexualitygameSchema, default: () => ({}) },
    triviaGame: { type: triviaGameSchema, default: () => ({}) },
    wordPuzzle: { type: wordPuzzleSchema, default: () => ({}) },
  },
});

module.exports = mongoose.model("Minigame", minigameSchema);
