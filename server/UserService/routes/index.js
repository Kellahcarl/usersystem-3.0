const express = require("express");
const router = express.Router();

const {
  updateUser,
  deleteUser,
  loginUser,
  registerUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/userAuth");
const { getUsers, getUser } = require("../controllers/userController");
const auth = require("../middleware/auth");

router.post("/login", loginUser);
router.post("/reset-password", resetPassword);
router.post("/forgot-password", forgotPassword);
router.post("/register", registerUser);
router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/", updateUser);
router.put("/delete", deleteUser);

module.exports = router;
