const { Router } = require("express");
const {
  createFavorites,
  getFavorites,
} = require("../controllers/favorites.controller");

const router = Router();

router.get("/:userId", getFavorites);
router.post("/", createFavorites);

module.exports = router;
