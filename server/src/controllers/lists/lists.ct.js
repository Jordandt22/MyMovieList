const UserModel = require("../../mongodb/mongo");


module.exports = {
  Addlist: async(req, res) => {
   const {uid} = req.params
       const { movieID, rating } = req.body; // Assuming the movie ID, movie name, and user ID are sent in the request body


       try {
           // Check if the user exists
           const user = await UserModel.findOne({uid});


           if (!user) {
               return res.status(404).json({ error: "User not found" });
           }


           // Add the movie ID and movie name to the user's list
           const updatedUser = await UserModel.findOneAndUpdate({uid}, {ratedMovies:[...user.ratedMovies, {movieID, rating}]},
               {returnDocument: "after"}
               );


           return res.status(200).json({ user: updatedUser, error: null });
       } catch (error) {
           console.error("Error adding movie to list:", error);
           return res.status(500).json({ user: null, error: "Internal server error" });
       }
  },


  Editlist: async (req, res) => {
   const { uid } = req.params;
   const { movieID, rating } = req.body; // movie ID and new rating are sent in the request body


   try {
       // Check if the user exists
       const user = await UserModel.findOne({ uid });


       if (!user) {
           return res.status(404).json({ error: "User not found" });
       }


       // Find the index of the movie in the user's list
       const movieIndex = user.ratedMovies.findIndex(item => item.movieID === movieID);


       if (movieIndex === -1) {
           return res.status(404).json({ error: "Movie not found in user's list" });
       }


       // Update the rating of the movie in the user's list
       user.ratedMovies[movieIndex].rating = rating;


       // Update the user's document in the database
       const updatedUser = await UserModel.findOneAndUpdate({ uid }, { ratedMovies: user.ratedMovies }, { new: true },
           {returnDocument: "after"});


       return res.status(200).json({ user: updatedUser, error: null });
   } catch (error) {
       console.error("Error editing movie in list:", error);
       return res.status(500).json({ user: null, error: "Internal server error" });
   }
},


Deletelist: async (req, res) => {
   const { uid } = req.params;
   const { movieID } = req.body; //Recieve MovieID


   try {
       // Check if the user exists
       const user = await UserModel.findOne({ uid });


       if (!user) {
           return res.status(404).json({ error: "User not found" });
       }


       // Find the index of the movie in the user's list
       const updatedlist = user.ratedMovies.filter(item => item.movieID !== movieID);


       // Update the user's document in the database
       const updatedUser = await UserModel.findOneAndUpdate({ uid }, { ratedMovies: updatedlist }, { new: true },
           {returnDocument: "after"});


       return res.status(200).json({ user: updatedUser, error: null });
   } catch (error) {
       console.error("Error deleting movie from list:", error);
       return res.status(500).json({ user: null, error: "Internal server error" });
   }
}
}
