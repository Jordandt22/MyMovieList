const { initializeApp } = require("firebase-admin/app");
const UserModel = require("../../mongo");
const firebaseApp = initializeApp();

// const newUser = new UserModel({
//     email: 'bob@gmail.com',
//     username: 'bob123',
//     password: 'Password#1234',
//     confirmPassword: 'Password#1234'
// });

// const newUser = new UserModel({
//     email_: Body.email_,
//     username_: Body.username_,
//     password_: Body.password_,
//     confirmPassword_: Body.confirmPassword_
// });

// // Save the new user to the database
// newUser.save();

module.exports = {
  signUp: async (req, res) => {
    // const newUser = new SignupModel (req.body);
    // newUser.save();
    // res.status(201).json({newUser});

    // SignupModel.create(req.body)
    // .then(users => res.json(users))
    // .catch(err => res.json(err))

    // newUser.save();

    // Verifying Access Token
    const accessToken = req.headers?.authorization?.split("Bearer ")[1];

    // --- VERIFY ACCESS TOKEN with Firebase Admin ----

    // Checking if the Account Already Exists
    const accountAlreadyExists = await UserModel.exists({
      uid: req.body.uid,
    });
    if (accountAlreadyExists)
      return res.status(500).json({
        user: null,
        error: { message: "This account has already been created." },
      });

    const { uid, email, username } = req.body;

    // New User
    const newUser = {
      email,
      username,
      uid,
    };

    const user = await UserModel.create(newUser);

    res.status(200).json({ user, error: null });
  },
  login: async (req, res) => {
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
    // app.post("/login", async (req, res) => {
    //   try {
    //     // Extract login data from request body
    //     const { email, password } = req.body;
    //     // Find the user in the database by email
    //     const user = await LoginModel.findOne({ email });
    //     // If user not found, return error
    //     if (!user) {
    //       return res.status(404).json({ error: "User not found" });
    //     }
    //     // Compare passwords using bcrypt
    //     const passwordMatch = await bcrypt.compare(password, user.password);
    //     // If passwords do not match, return error
    //     if (!passwordMatch) {
    //       return res.status(401).json({ error: "Incorrect password" });
    //     }
    //     // Passwords match, login successful
    //     // Generate and send JWT token (replace with your preferred token generation logic)
    //     const token = jwt.sign({ userId: user._id }, "your secret key", {
    //       expiresIn: "1h",
    //     });
    //     res.status(200).json({ message: "Login successful", token });
    //   } catch (error) {
    //     console.error("Login error:", error);
    //     res.status(500).json({ error: "Internal server error" });
    //   }
    // });
  },
};
