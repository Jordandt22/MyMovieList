const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
 const bcrypt = require("bcrypt")
 const router = express.Router();
//const { LoginModel, SignupModel } = require("./mongo")
const SignupModel  = require('./mongo');
const LoginModel = require('./mongo');



const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

// const newUser = new SignupModel({
//     email: 'bob@gmail.com',
//     username: 'bob123',
//     password: 'Password#1234',
//     confirmPassword: 'Password#1234'
// });

// const newUser = new SignupModel({
//     email_: Body.email_,
//     username_: Body.username_,
//     password_: Body.password_,
//     confirmPassword_: Body.confirmPassword_
// });

// // Save the new user to the database
// newUser.save();


app.post("/signup", (req, res) => {
    console.log("Body", req.body);

    // const newUser = new SignupModel (req.body);
    // newUser.save();
    // res.status(201).json({newUser});

    // SignupModel.create(req.body)
    // .then(users => res.json(users))
    // .catch(err => res.json(err))

    // newUser.save();

    const { email, username, password, confirmPassword } = req.body;

    // Create a new document in the SignupModel collection
    SignupModel.create({ email, username, password, confirmPassword })
        .then(newUser => {
            console.log("New user created:", newUser);
            res.status(201).json(newUser); // Send the newly created user as JSON response
        })
        .catch(err => {
            console.error("Error creating user:", err);
            res.status(500).json({ error: "Internal server error" }); // Send error response
        });

    

    

    
});



app.post("/login", async (req, res) => {
    // try {
    //     // Extract login data from request body
    //     const { email, password } = req.body;

    //     // Find the user in the database by email
    //     const user = await LoginModel.findOne({ email });

    //     // If user not found, return error
    //     if (!user) {
    //         return res.status(404).json({ error: "User not found" });
    //     }

    //     // Compare passwords
    //     const passwordMatch = await bcrypt.compare(password, user.password);

    //     // If passwords do not match, return error
    //     if (!passwordMatch) {
    //         return res.status(401).json({ error: "Incorrect password" });
    //     }

    //     // Passwords match, login successful
    //     // You can generate and send JWT token here for authentication

    //     res.status(200).json({ message: "Login successful" });
    // } catch (error) {
    //     console.error("Login error:", error);
    //     res.status(500).json({ error: "Internal server error" });
    // }

    app.post("/login", async (req, res) => {
        try {
          // Extract login data from request body
          const { email, password } = req.body;
      
          // Find the user in the database by email
          const user = await LoginModel.findOne({ email });
      
          // If user not found, return error
          if (!user) {
            return res.status(404).json({ error: "User not found" });
          }
      
          // Compare passwords using bcrypt
          const passwordMatch = await bcrypt.compare(password, user.password);
      
          // If passwords do not match, return error
          if (!passwordMatch) {
            return res.status(401).json({ error: "Incorrect password" });
          }
      
          // Passwords match, login successful
      
          // Generate and send JWT token (replace with your preferred token generation logic)
          const token = jwt.sign({ userId: user._id }, "your secret key", { expiresIn: "1h" });
      
          res.status(200).json({ message: "Login successful", token });
        } catch (error) {
          console.error("Login error:", error);
          res.status(500).json({ error: "Internal server error" });
        }
      });

});

app.get("/login", (req, res) => {
    res.render("Login");
});

app.get("/signup", async (req,res) => {
    const result = await SignupModel.find();
    res.send({"User:": result});
})

/*
// Endpoint to submit a movie rating
router.post('/ratings', (req, res) => {
  const { userId, movieId, rating } = req.body;
  // Here you would handle the logic to store the rating in the database
  // This is just a placeholder
  console.log(`User ${userId} rated movie ${movieId} with a rating of ${rating}`);
  // Send a success response
  res.status(200).json({ message: 'Rating submitted successfully' });
});

// Endpoint to retrieve movie information
router.get('/movies/:movieId', (req, res) => {
  const { movieId } = req.params;
  // Here you would retrieve movie information from the database based on the movieId
  // This is just a placeholder
  const movie = {
    id: movieId,
    title: 'Example Movie',
    description: 'This is an example movie description',
    genres: ['Action', 'Adventure'],
    releaseDate: '2022-01-01',
    averageRating: 4.5
  };
  // Send movie information as response
  res.status(200).json(movie);
});

// Endpoint to generate movie recommendations
router.post('/recommendations', (req, res) => {
  const { userId } = req.body;
  // Here you would generate movie recommendations based on the user's preferences and ratings
  // This is just a placeholder
  const recommendations = [
    { title: 'Recommended Movie 1', description: 'Description of Recommended Movie 1' },
    { title: 'Recommended Movie 2', description: 'Description of Recommended Movie 2' }
  ];
  // Send recommended movies as response
  res.status(200).json(recommendations);
});

module.exports = router;


*/

const port = 3001;

app.listen(port, () => {
    console.log(`Server running on Port: ${port}`);
})

module.exports = app;




