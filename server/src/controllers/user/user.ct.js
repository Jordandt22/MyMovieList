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
};
