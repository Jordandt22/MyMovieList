const UserModel = require("../../mongodb/mongo");

module.exports = {
  createUser: async (req, res) => {
    // Checking if the Account Already Exists
    const { uid } = req.params;
    const accountAlreadyExists = await UserModel.exists({
      uid,
    });
    if (accountAlreadyExists)
      return res.status(403).json({
        user: null,
        error: { message: "This account has already been created." },
      });

    const { email, username } = req.body;

    // New User
    const min = 1;
    const max = 6;
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    const randNum = Math.floor(
      Math.random() * (maxFloored - minCeiled + 1) + minCeiled
    );
    const user = await UserModel.create({
      email,
      username,
      uid,
      profilePicture: randNum,
    });
    res.status(200).json({ user, error: null });
  },
  getUser: async (req, res) => {
    try {
      const { uid } = req.params;

      // Find the user document by UID
      const user = await UserModel.findOne({ uid });

      if (!user) {
        // User not found
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json({ user, error: null });
    } catch (error) {
      // Error occurred while fetching user information
      console.error("Error fetching user information:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  updateProfilePicture: async (req, res) => {
    try {
      const uid = req.params.uid;
      const profilePicture = req.body.profilePicture;

      // Check if there's a profile picture
      if (!profilePicture) {
        return res.status(400).json({ error: "No profile picture chosen." });
      }

      // Find the user by userId
      const user = await UserModel.findOne({ uid });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Update the profilePicture field with the profile picture number
      user.profilePicture = profilePicture;

      // Save the updated user object to the database
      await user.save();

      // Send a response indicating successful upload
      res
        .status(200)
        .json({ message: "Profile picture updated successfully", user });
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { uid } = req.params;

      // Find the user by uid and delete it
      const user = await UserModel.findOneAndDelete({ uid });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json({ message: "User deleted successfully", user });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  editUsername: async (req, res) => {
    try {
      const { uid } = req.params;
      const newUsername = req.body.username;

      // Find the user by userId
      const user = await UserModel.findOne({ uid });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      console.log("Original username:", user.username); // Log original username

      // Update the username
      user.username = newUsername;

      console.log("Updated username (in memory):", user.username); // Log updated username

      // Save the updated user object to the database
      const updatedUser = await user.save();

      console.log("Updated username (after save):", updatedUser.username); // Log saved username

      // Return the updated user object as response
      res.json({ message: "Username updated successfully", user: updatedUser });
    } catch (error) {
      console.error("Error updating username:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
