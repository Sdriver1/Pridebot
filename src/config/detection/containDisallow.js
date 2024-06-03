const chalk = require("chalk");
const { blockedlist1 } = require("../blacklist/blockedterms")

function containsDisallowedContent(input, username) {
  if (typeof input !== "string" || input.trim() === "") {
    return false;
  }

  const sanitizedInput = input.toLowerCase().trim();
  let foundDisallowed = false;

  blockedlist1.forEach((term) => {
    if (sanitizedInput.includes(term)) {
      console.log(
        chalk.yellowBright.bold(
          `⚠️  ${username} has used blacklisted term: "${term}"`
        )
      );
      foundDisallowed = true;
    }
  });

  return foundDisallowed;
}

module.exports = { containsDisallowedContent };
