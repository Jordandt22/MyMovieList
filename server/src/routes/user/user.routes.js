const userRouter = require("express-promise-router")();
const { authUser } = require("../../middlewares/auth.mw");

// Controllers
const { createUser, getUser } = require("../../controllers/user/user.ct");

// POST - Create User
userRouter.post("/:uid", authUser, createUser);

// GET - Get User Data
userRouter.get("/:uid", authUser, getUser);

module.exports = userRouter;
