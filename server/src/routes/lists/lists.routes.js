const listRouter = require("express-promise-router")();
const { authUser } = require("../../middlewares/auth.mw");

// Controllers
const { Addlist, Deletelist, Editlist } = require("../../controllers/lists/lists.ct");
const{Recommendation} = require("../../controllers/lists/recc.ct")

// POST - Create User
listRouter.post("/rated/:uid", authUser, Addlist);


// POST - Create User
listRouter.delete("/rated/:uid", Deletelist);

// POST - Create User
listRouter.patch("/rated/:uid", Editlist);

// GET - Get User Data

module.exports = listRouter;
