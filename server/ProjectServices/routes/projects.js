const express = require("express");
const router = express.Router();

const {
  getProjects,
  getProject,
  createProject,
  assignProject,
  unassignProject,
  getAssignProject,
  updateProject,
  deleteProject,
  completeProject,
} = require("../controllers/projects");
const { authToken, isAdmin } = require("../middleware/auth");

router.get("/:project_id", authToken, getProject);
router.get("/", authToken, getProjects);

router.post("/", authToken, isAdmin, createProject);
router.put("/", authToken, isAdmin, updateProject);
router.get("/assign/:project_id", authToken, getAssignProject);
router.post("/assign", authToken, isAdmin, assignProject);
router.post("/unassign", authToken, isAdmin, unassignProject);
router.put("/delete", authToken, isAdmin, deleteProject);
router.get("/complete", authToken, isAdmin, completeProject);

module.exports = router;
