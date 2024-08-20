const mongoose = require("mongoose");

const usageTypeSchema = new mongoose.Schema({
  guildCount: {
    type: Number,
    required: true,
    default: 0,
  },
  userContextCount: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model("UsageType", usageTypeSchema);
