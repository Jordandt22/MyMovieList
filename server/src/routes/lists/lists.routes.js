const listRouter = require("express-promise-router")();
const { authUser } = require("../../middlewares/auth.mw");

// Controllers
const { Addlist } = require("../../controllers/lists/lists.ct");

// POST - Create User
listRouter.post("/:uid", Addlist);

// GET - Get User Data

module.exports = listRouter;
