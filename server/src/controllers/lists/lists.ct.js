const UserModel = require("../../mongodb/mongo");

module.exports = {
   Addlist: async(req, res) => {
    const {uid} = req.params
        const { MovieID, rating } = req.body; // Assuming the movie ID, movie name, and user ID are sent in the request body

    try {
      // Check if the user exists
      const user = await UserModel.findOne({ uid });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

            // Add the movie ID and movie name to the user's list
            const updatedUser = await UserModel.findOneAndUpdate({uid}, {lists:[...user.lists, {MovieID, rating}]})

            return res.status(200).json({ user: updatedUser, error: null });
        } catch (error) {
            console.error("Error adding movie to list:", error);
            return res.status(500).json({ user: null, error: "Internal server error" });
        }
   }
}