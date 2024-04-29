const listRouter = require("express-promise-router")();
const { authUser } = require("../../middlewares/auth.mw");

// Controllers
const {
  addList,
  deleteList,
  editList,
} = require("../../controllers/lists/lists.ct");
const { getRecommendation } = require("../../controllers/lists/recc.ct");

// POST - Add Movie and Rating to List
listRouter.post("/rated/:uid", authUser, addList);

// DELETE - Delete Rated Movie from User's list
listRouter.delete("/rated/:uid/:movieID", deleteList);

// PATCH - Update a Rated Movie in User's List
listRouter.patch("/rated/:uid/:movieID", editList);

// GET - Get Top Genres from User's List
listRouter.get("/recommendations/:uid", getRecommendation);

module.exports = listRouter;
