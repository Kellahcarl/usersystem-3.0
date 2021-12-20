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
const { authToken, isAdmin } = require("../middleware/auth");

router.get("/", authToken, getUsers);
router.get("/:id", authToken, getUser);

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/reset-password", authToken, resetPassword);
router.post("/forgot-password", forgotPassword);
router.put("/", authToken, isAdmin, updateUser);
router.put("/delete", authToken, isAdmin, deleteUser);

module.exports = router;
