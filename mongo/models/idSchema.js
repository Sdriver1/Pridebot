const mongoose = require("mongoose");

const idSchema = new mongoose.Schema({
  devs: { type: [String], default: [] },
  vips: { type: [String], default: [] },
  bot: { type: [String], default: [] },
  donor: { type: [String], default: [] },
  oneyear: { type: [String], default: [] },
  partner: { type: [String], default: [] },
  support: { type: [String], default: [] },
});

module.exports = mongoose.model("IDLists", idSchema);
