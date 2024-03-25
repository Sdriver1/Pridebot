const mongoose = require("mongoose");

const usageSchema = new mongoose.Schema({
  commandName: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
    default: 0,
  },
});

const CommandUsage = mongoose.model("CommandUsage", usageSchema);
module.exports = CommandUsage;
