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
    const newUser = {
      email,
      username,
      uid,
    };

    const user = await UserModel.create(newUser);
    res.status(200).json({ user, error: null });
  },
  getUser: async (req, res) => {
    const { uid } = req.params;
    const user = await UserModel.find({
      uid,
    });
    if (!user[0])
      return res.status(404).json({
        user: null,
        error: { message: "Unable to find user." },
      });

    res.status(200).json({ user: user[0], error: null });
  },

  getUserData: async (req, res) => {
    try {
      const uid = req.params.uid;

      // Find the user document by UID
      const user = await UserModel.findOne({ uid });

      if (!user) {
        // User not found
        return res.status(404).json({ error: "User not found" });
      }

      // User found, send user information in the response
      res.status(200).json({ user });
    } catch (error) {
      // Error occurred while fetching user information
      console.error("Error fetching user information:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  addProfilePicture: async (req, res) => {
    try {
      const uid = req.params.uid;
      const uploadedFile = req.file;

      // Check if file was uploaded
      if (!uploadedFile) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      // Find the user by userId
      const user = await UserModel.findOne({ uid });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Update the profilePicture field with the file path or URL
      user.profilePicture = uploadedFile.path; // Assuming multer saves the file locally

      // Save the updated user object to the database
      await user.save();

      // Send a response indicating successful upload
      res
        .status(200)
        .json({ message: "Profile picture uploaded successfully", user });
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
};
