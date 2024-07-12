const Voting = require("../../../mongo/models/votingSchema");

async function updateVotingStats(userId, platform) {
  let voting = await Voting.findOne();

  if (!voting) {
    voting = new Voting();
  }

  let userVoting = voting.votingUsers.find((user) => user.userId === userId);

  if (!userVoting) {
    userVoting = {
      userId: userId,
      votingTopGG: 0,
      votingWumpus: 0,
      votingBotList: 0,
    };
    voting.votingUsers.push(userVoting);
  }

  if (platform === "TopGG") {
    userVoting.votingTopGG += 1;
    voting.votingAmount.TopGGTotal += 1;
  } else if (platform === "Wumpus") {
    userVoting.votingWumpus += 1;
    voting.votingAmount.WumpusTotal += 1;
  } else if (platform === "BotList") {
    userVoting.votingBotList += 1;
    voting.votingAmount.BotListTotal += 1;
  }

  voting.votingAmount.OverallTotal += 1;
  await voting.save();
}

module.exports = { updateVotingStats };
