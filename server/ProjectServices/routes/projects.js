const express = require("express");
const router = express.Router();

const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  completeProject,
} = require("../controllers/projects");
const { authToken, isAdmin } = require("../middleware/auth");

router.get("/:project_id", authToken, getProject);
router.get("/", authToken, getProjects);

router.post("/", authToken, isAdmin, createProject);
router.put("/", authToken, isAdmin, updateProject);
router.put("/delete", authToken, isAdmin, deleteProject);
router.get("/complete", authToken, isAdmin, completeProject);

module.exports = router;
