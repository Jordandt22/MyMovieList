const userRouter = require("express-promise-router")();
const { authUser } = require("../../middlewares/auth.mw");

// Controllers
const {
  createUser,
  getUser,
  updateProfilePicture,
  deleteUser,
  editUsername,
} = require("../../controllers/user/user.ct");

// POST - Create User
userRouter.post("/:uid", authUser, createUser);

// GET - Get User Data
userRouter.get("/:uid", authUser, getUser);

// PATCH - Update the User's Profile Picture
userRouter.patch("/:uid/profile_picture", authUser, updateProfilePicture);

// OLD:
// Example Postman URL:
// http://localhost:3001/v1/api/user/upload/W76bg1VFYLeh4xN7mNDjxxiR2QG3
// Body > form-data > key drop down arrow "File" > key: "file"
// value: any profile picture > Content type: multipart/form-data

// Delete - Delete a User
// Example Postman URL:
// http://localhost:3001/v1/api/user/W76bg1VFYLeh4xN7mNDjxxiR2QG3
userRouter.delete("/:uid", authUser, deleteUser);

// Put - Edit a Username
// http://localhost:3001/v1/api/user/users/exanSco2MkNfK3TR21a6u2iIE8H3
// {
//     "username": "WheresBasketBrawl123"
// }
userRouter.patch("/:uid/username", authUser, editUsername);

module.exports = userRouter;
