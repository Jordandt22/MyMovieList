const listRouter = require("express-promise-router")();
const { authUser } = require("../../middlewares/auth.mw");

// Controllers
const { Addlist, Deletelist, Editlist } = require("../../controllers/lists/lists.ct");

// POST - Create User
listRouter.post("/:uid", Addlist);


// POST - Create User
listRouter.delete("/:uid", Deletelist);

// POST - Create User
listRouter.patch("/:uid", Editlist);

// GET - Get User Data

module.exports = listRouter;
