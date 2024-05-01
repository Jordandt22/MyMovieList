const userRouter = require("express-promise-router")();
const { authUser } = require("../../middlewares/auth.mw");
const upload = require("../../middlewares/upload");
const express = require("express");
const router = express.Router();
const homeController = require('../../controllers/home');
const uploadController = require('../../controllers/upload');
const dbConfig = require("../../config/db");

// Controllers
const {
  createUser,
  getUser,
  updateProfilePicture,
  deleteUser,
  editUsername,
  uploadFiles,
  getListFiles,
  download,
  getHome
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
// userRouter.post("/upload/:uid", addProfilePicture);

// Delete - Delete a User
// Example Postman URL:
// http://localhost:3001/v1/api/user/W76bg1VFYLeh4xN7mNDjxxiR2QG3
userRouter.delete("/:uid", authUser, deleteUser);

// Put - Edit a Username
// http://localhost:3001/v1/api/user/users/exanSco2MkNfK3TR21a6u2iIE8H3
// {
//     "username": "WheresBasketBrawl123"
// }
userRouter.patch("/:uid", editUsername);


// userRouter.get("/home", getHome);
  
userRouter.post("/upload/picture", uploadFiles);
userRouter.get("/files/list", getListFiles);
userRouter.get("/files/:name", download);
  

  

module.exports = userRouter;
