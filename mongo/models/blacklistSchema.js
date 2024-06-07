const mongoose = require('mongoose');

const blacklistSchema = new mongoose.Schema({
    blacklistIDs: { type: [String], default: [] },
});

module.exports = mongoose.model('Blacklist', blacklistSchema);
