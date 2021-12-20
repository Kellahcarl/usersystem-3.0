const express = require("express");
const router = express.Router();

const {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
  assignTask,
  unassignTask,
  completeTask,
  getAssignTask,
} = require("../controllers/tasks");
const { authToken, isAdmin } = require("../middleware/auth");

router.get("/:project_id", authToken, getTasks);
router.get("/assign/:task_Id", authToken, getAssignTask);
router.get("/:project_id/:task_id", authToken, getTask);

router.post("/", authToken, isAdmin, createTask);
router.put("/delete", authToken, isAdmin, deleteTask);
router.put("/complete", authToken, completeTask);
router.put("/", authToken, updateTask);
router.post("/assign", authToken, isAdmin, assignTask);
router.post("/unassign", authToken, isAdmin, unassignTask);

module.exports = router;
