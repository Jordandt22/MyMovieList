const mongoose = require("mongoose");
const connect = mongoose.connect(
  "mongodb+srv://VG123:Abcd123$@customers.c411cqs.mongodb.net/myMovieList?retryWrites=true&w=majority&appName=Customers"
);

// Check if database connected
connect
  .then(() => {
    console.log("Database connected successfully!");
  })
  .catch((error) => {
    console.log("Database cannot be connected.", error);
  });

// Create a Schema

const GenreSchema = new mongoose.Schema({
  genreID: {
    type: Number
  }
});


const MovieSchema = new mongoose.Schema({
  movieID: {
    type: String
  },
  rating: {
    type: Number,
  },
  genres:[GenreSchema]
});




const UserSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  username: {
    type: String,
  },
  uid: {
    type: String,
  },
  ratedMovies: [MovieSchema],
  profilePicture:{
    type:String,
  }
});

// Collection part
//const LoginModel = new mongoose.model("Users", LoginSchema);

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;

// const LoginModel = mongoose.model("Logins", LoginSchema)
// module.exports = LoginModel;

//module.exports = { LoginModel, SignupModel};
