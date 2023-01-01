const { Router } = require("express");
const {
  getAllUsers,
  createUser,
  editUser,
  deleteUser,
} = require("../controllers/users.controller");
const router = Router();

router.get("/", getAllUsers);

router.post("/", createUser);

router.put("/:id", editUser);

router.delete("/", deleteUser);

module.exports = router;
