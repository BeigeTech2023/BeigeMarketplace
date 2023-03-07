const express = require("express");
const router = express.Router();
const {
  getUser,
  getUsers,
  //createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

router.route("").get(getUsers); //.post(createUser);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);
module.exports = router;
