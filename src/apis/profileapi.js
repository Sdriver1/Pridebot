const express = require("express");
const cors = require("cors");
const ProfileData = require("../../mongo/models/profileSchema.js");
require("dotenv").config();
const { getInfo } = require("discord-hybrid-sharding");

module.exports = (client) => {
  console.log(
    `Profile API initialization started by Cluster ${getInfo().CLUSTER}.`
  );
  const app = express();
  const port = 2612;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  app.listen(port, () => {
    console.log(`Profile API is running on port ${port}`);
  });

  // Auth middleware
  const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token || token !== `Bearer ${process.env.PROFILE_API_TOKEN}`) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  };

  app.get("/", (req, res) => {
    res.status(200).json({
      message: "Available API endpoints",
      endpoints: {
        getProfile: "/profile/:userId (GET)",
        updateProfile: "/profile/update/:userId (PATCH) [Auth Required]",
        deleteProfile: "/profile/delete/:userId (DELETE) [Auth Required]",
      },
    });
  });

  app.get("/profile/:userId", async (req, res) => {
    try {
      const profile = await ProfileData.findOne({ userId: req.params.userId });

      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }

      return res.json(profile);
    } catch (error) {
      console.error("Failed to retrieve profile:", error);
      return res.status(500).send("Internal Server Error");
    }
  });

  app.patch("/profile/update/:userId", authMiddleware, async (req, res) => {
    try {
      const { userId } = req.params;
      const updateData = req.body;

      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      if (!updateData || Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: "No data provided to update" });
      }

      const profile = await ProfileData.findOneAndUpdate(
        { userId },
        { $set: updateData },
        { new: true }
      );

      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }

      return res.json({ message: "Profile updated successfully", profile });
    } catch (error) {
      console.error("Failed to update profile:", error);
      return res.status(500).send("Internal Server Error");
    }
  });

  app.delete("/profile/delete/:userId", authMiddleware, async (req, res) => {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      const profile = await ProfileData.findOneAndDelete({ userId });

      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }

      return res.json({ message: "Profile deleted successfully" });
    } catch (error) {
      console.error("Failed to delete profile:", error);
      return res.status(500).send("Internal Server Error");
    }
  });
};
