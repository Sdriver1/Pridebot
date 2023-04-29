const { Schema, model } = require("mongoose");
const guildschema = new Schema({
  _id: Schema.Types.ObjectId,
  guildId: String,
  guildName: String,
  guildIcon: { type: String, required: false },
});

module.exports = model("Guilds", guildschema, "guild");
