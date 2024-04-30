const userRouter = require("express-promise-router")();
const { authUser } = require("../../middlewares/auth.mw");
const upload = require("../../middlewares/upload");

// Controllers
const {
  createUser,
  getUser,
  getUserData,
  addProfilePicture,
  deleteUser,
  editUsername
} = require("../../controllers/user/user.ct");

// POST - Create User
userRouter.post("/:uid", authUser, createUser);

// GET - Get User Data
userRouter.get("/:uid", authUser, getUser);

// Example Postman URL:
// http://localhost:3001/v1/api/user/users/W76bg1VFYLeh4xN7mNDjxxiR2QG3
userRouter.get("/users/:uid", getUserData);

// Post - Submit a Profile Picture
// Example Postman URL:
// http://localhost:3001/v1/api/user/upload/W76bg1VFYLeh4xN7mNDjxxiR2QG3
// Body > form-data > key drop down arrow "File" > key: "file"
// value: any profile picture > Content type: multipart/form-data
userRouter.post("/upload/:uid", authUser, addProfilePicture);

// Delete - Delete a User
// Example Postman URL:
// http://localhost:3001/v1/api/user/W76bg1VFYLeh4xN7mNDjxxiR2QG3
userRouter.delete("/:uid", authUser, deleteUser);

// Put - Edit a Username
// http://localhost:3001/v1/api/user/users/exanSco2MkNfK3TR21a6u2iIE8H3
// {
//     "username": "WheresBasketBrawl123"
// }
userRouter.put("/users/:uid", editUsername);

module.exports = userRouter;
