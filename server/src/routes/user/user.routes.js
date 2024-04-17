const userRouter = require("express-promise-router")();
const { authUser } = require("../../middlewares/auth.mw");

// Controllers
const { createUser } = require("../../controllers/user/user.ct");

// POST - Create User
userRouter.post("/:uid", authUser, createUser);

module.exports = userRouter;
