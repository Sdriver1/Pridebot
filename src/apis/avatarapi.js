const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

module.exports = (client) => {
  const app = express();
  const port = 2611;

  app.listen(port, () => {
    console.log(`Avatar API is running on port ${port}`);
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(
    "/assets",
    express.static(path.join(__dirname, "..", "..", "web", "assets"))
  );

  app.get("/", (req, res) => {
    res
      .status(404)
      .sendFile(path.join(__dirname, "..", "..", "web", "404.html"));
  });

  app.get("/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
      const user = await client.users.fetch(userId);
      const htmlFilePath = path.join(
        __dirname,
        "..",
        "..",
        "web",
        "webavatar.html"
      );
      let htmlContent = fs.readFileSync(htmlFilePath, "utf8");

      const username = user.username;
      const capitalizedUsername =
        username.charAt(0).toUpperCase() + username.slice(1);

      htmlContent = htmlContent.replace(
        /{user.tag}/g,
        `${capitalizedUsername}`
      );
      htmlContent = htmlContent.replace(
        /<meta name="og:title" content=".*" \/>/,
        `<meta name="og:title" content="${capitalizedUsername}'s Pride Avatars" />`
      );
      htmlContent = htmlContent.replace(
        /<meta name="og:description" content=".*" \/>/,
        `<meta name="og:description" content="Pridebot Pride Avatars for ${capitalizedUsername}" />`
      );
      htmlContent = htmlContent.replace(
        /<meta name="description" content=".*" \/>/,
        `<meta name="description" content="Pridebot Pride Avatars for ${capitalizedUsername}" />`
      );
      htmlContent = htmlContent.replace(
        /<title>.*<\/title>/,
        `<title>${capitalizedUsername}'s Pride Avatars | Pridebot</title>`
      );

      res.send(htmlContent);
    } catch (error) {
      res
        .status(404)
        .sendFile(path.join(__dirname, "..", "..", "web", "404.html"));
    }
  });

  app.get("/getUser/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await client.users.fetch(userId);
      res.json({ username: user.username });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });

  app.get("/files/:userId", (req, res) => {
    const { userId } = req.params;
    const imagePath = path.join(__dirname, "..", "..", "src", "pfps", userId);

    if (fs.existsSync(imagePath)) {
      const files = fs.readdirSync(imagePath);
      res.json({ files });
    } else {
      res.status(404).json({ error: "User profile pictures not found" });
    }
  });

  app.get("/:userId/:flag.png", (req, res) => {
    const { userId, flag } = req.params;
    const imagePath = path.join(
      __dirname,
      "..",
      "..",
      "src",
      "pfps",
      userId,
      `${flag}.png`
    );
    if (fs.existsSync(imagePath)) {
      res.sendFile(imagePath);
    } else {
      res.status(404).send("Image not found");
    }
  });
};
