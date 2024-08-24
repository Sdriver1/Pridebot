async function fetchBotStats() {
  try {
    const response = await fetch("https://api.pridebot.xyz/api/stats");
    const data = await response.json();
    document.getElementById("totalServers").textContent =
      data.currentGuildCount.toLocaleString();
    document.getElementById("comptotalServers").textContent = formatServerCount(
      data.currentGuildCount
    );
    document.getElementById("totalUsers").textContent =
      data.totalUserCount.toLocaleString();
    document.getElementById("comptotalUsers").textContent = formatUserCount(
      data.totalUserCount
    );
    document.getElementById("totalcommandsCount").textContent =
      data.commandsCount.toLocaleString();
    document.getElementById("totalcommandUsage").textContent =
      data.totalUsage.toLocaleString();
  } catch (error) {
    console.error("Failed to fetch bot stats:", error);
  }
}

function formatServerCount(count) {
  if (count >= 100) {
    return Math.floor(count / 10) * 10 + "+";
  }
  return count.toLocaleString();
}

function formatUserCount(count) {
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + "k+";
  }
  return count.toLocaleString();
}

window.onload = fetchBotStats;
