require("dotenv").config();
const { ClusterManager } = require("discord-hybrid-sharding");

const manager = new ClusterManager(`${__dirname}/index.js`, {
  totalShards: "auto",
  shardsPerClusters: 2,
  totalClusters: "auto",
  mode: 'process',
  token: process.env.token,
});

manager.on("clusterCreate", (cluster) =>
  console.log(`Launched Cluster ${cluster.id}`)
);
manager.spawn({ amount: "auto", timeout: -1 });
