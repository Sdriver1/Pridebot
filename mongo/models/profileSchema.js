const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  preferredName: { type: String, required: false },
  bio: { type: String, required: false },
  sexuality: { type: String, required: false },
  otherSexuality: { type: String, required: false },
  romanticOrientation: { type: String, required: false },
  gender: { type: String, required: false },
  otherGender: { type: String, required: false },
  pronouns: { type: String, required: false },
  otherPronouns: { type: String, required: false },
  color: { type: String, required: false },
  badgesVisible: { type: Boolean, default: true },
});

const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;
