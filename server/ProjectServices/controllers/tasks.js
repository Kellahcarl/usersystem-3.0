const db = require("../database");
const { v4: uuidv4 } = require("uuid");
const { validateTask, validateAssignTask } = require("../helpers/validator");
const { parser } = require("../helpers/parser");
const _ = require("lodash");

const Joi = require("joi");

module.exports = {
  getTasks: async (req, res) => {
    try {
      let { recordset } = await db.exec("sp_getTasks");

      return res.status(200).send({ tasks: recordset });
    } catch (error) {
      if (error.message) return res.status(500).json(error);
      res.status(404).json(error);
    }
  },
  getTask: async (req, res) => {
    const { project_id, task_id } = req.params;
    try {
      let { recordset } = await db.exec("sp_getTask", {
        project_id,
        task_id,
      });
      if (recordset.length === 0)
        return res
          .status(404)
          .send({ message: `No task with task id: ${task_id}` });
      tasks = recordset[0];
      return res.status(200).send({ task: recordset });
    } catch (error) {
      if (error.message) return res.status(500).json(error);
      res.status(404).json(error);
    }
  },
  createTask: async (req, res) => {
    const { error } = validateTask(req.body);
    if (error)
      return res
        .status(400)
        .send({ success: false, message: error.details[0].message });
    const projectResult = await db.exec("sp_getSingleProject", {
      project_id: req.body.project_id,
    });

    if (!projectResult.recordset[0])
      return res.status(400).send({ message: "invalid project. " });

    const { name, project_id, duration, start_date, end_date, description } =
      req.body;
    const id = uuidv4();
    try {
      await db.exec("sp_createTask", {
        id,
        name,
        project_id,
        duration,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        description,
      });
      res.send({ message: "Task created successfully" });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },
  deleteTask: async (req, res) => {
    try {
      const { task_id, project_id } = req.body;
      let { recordset } = await db.exec("sp_getTask", {
        task_id,
      });

      const task = recordset[0];

      if (!task) {
        return res
          .status(404)
          .send({ message: "task does not exist or  already deleted" });
      }

      await db.exec("sp_deleteTask", {
        task_id,
      });
      res.status(201).send({ message: "task deleted Successfully" });
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .send({ error: error.message, message: "Internal Sever Error" });
    }
  },
  updateTask: async (req, res) => {
    const { error } = validateTask(
      _.pick(req.body, [
        "name",
        "project_id",
        "duration",
        "start_date",
        "end_date",
        "description",
      ])
    );
    if (error)
      return res
        .status(400)
        .send({ success: false, message: error.details[0].message });

    if (!req.body.task_id)
      return res
        .status(400)
        .send({ success: false, message: "task_id is required" });

    try {
      const {
        task_id,
        name,
        project_id,
        duration,
        start_date,
        end_date,
        description,
      } = req.body;

      let { recordset } = await db.exec("sp_getTask", {
        project_id,
        task_id,
      });

      const task = recordset[0];

      if (!task) {
        return res
          .status(404)
          .send({ message: "task does not exist or  already deleted" });
      }

      await db.exec("sp_updateTask", {
        task_id,
        name,
        project_id,
        duration,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        description,
      });
      res.send({ message: "Task updated successfully" });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },
  getAssignTask: async (req, res) => {
    const { task_Id } = req.params;
    try {
      if (!task_Id)
        return res.status(400).send({ message: "Task_id is required" });
      let { recordset } = await db.exec("sp_getAssignedTask", {
        task_id: task_Id,
      });
      res.send({ User: recordset });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },
  assignTask: async (req, res) => {
    const { error } = validateAssignTask(req.body);
    if (error)
      return res
        .status(400)
        .send({ success: false, message: error.details[0].message });

    try {
      const { task_id, user_id } = req.body;

      let result = await db.exec("sp_getTask", {
        task_id,
      });

      if (result.recordset == "") {
        return res.status(404).send({ message: "task doesnt exist" });
      }

      const { recordset } = await db.exec("sp_checkassignedTask", { user_id });

      if (recordset[0]) {
        return res.status(404).send({ message: "user already assigned" });
      }
      const id = uuidv4();
      await db.exec("sp_assignTask", { id, task_id, user_id });
      await db.exec("sp_assignUser", { user_id });
      await db.exec("sp_assigntaskuser", { task_id });
      await db.query(
        "INSERT INTO dbo.taskAssignQueue (task_id ,user_id, active) VALUES ('" +
          task_id +
          "''" +
          user_id +
          "', 1)"
      );

      res.status(200).send({ message: "User added to task successfully" });
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .send({ message: `Internal Server Error - ${error.message}` });
    }
  },
  unassignTask: async (req, res) => {
    const { task_id } = req.body;

    let result = await db.exec("sp_getTask", {
      task_id,
    });
    if (result.recordset == "") {
      return res.status(404).send({ message: " task doesnt exist" });
    }

    let user = await db.exec("getAssignedUser", { task_id });
    if (!user.recordset[0]) {
      return res.status(404).send({ message: "user already unassigned" });
    }

    const user_id = user.recordset[0].uid;

    try {
      await db.exec("sp_unassignTask", { task_id });
      await db.exec("sp_unassignUser", { user_id });
      await db.exec("sp_unassigntaskuser", { task_id });
      await db.query(
        "INSERT INTO dbo.taskAssignQueue (task_id ,user_id, active) VALUES ('" +
          task_id +
          "''" +
          user_id +
          "', 0)"
      );

      res.send({ message: "User unassigned task successfully" });
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .send({ message: `Internal Server Error - ${error.message}` });
    }
  },

  completeTask: async (req, res) => {
    try {
      const { task_id } = req.body;
      let { recordset } = await db.exec("sp_getTask", {
        task_id,
      });

      const task = recordset[0];

      if (!task) {
        return res
          .status(404)
          .send({ message: "task does not exist or  already deleted" });
      }

      await db.exec("sp_completeTask", {
        task_id,
      });
      res.status(201).send({ message: "task completed Successfully" });
    } catch (error) {
      res
        .status(500)
        .send({ error: error.message, message: "Internal Sever Error" });
    }
  },
  unCompleteTask: async (req, res) => {
    try {
      const { task_id } = req.body;
      let { recordset } = await db.exec("sp_getTask", {
        task_id,
      });

      const task = recordset[0];

      if (!task) {
        return res
          .status(404)
          .send({ message: "task does not exist or  already deleted" });
      }

      await db.exec("sp_unCompleteTask", {
        task_id,
      });
      res.status(201).send({ message: "task completed Successfully" });
    } catch (error) {
      res
        .status(500)
        .send({ error: error.message, message: "Internal Sever Error" });
    }
  },
  getAssignTasksOfUser: async (req, res) => {
    const { user_id } = req.params;
    console.log(user_id);
    if (!user_id) return res.status(400).send({ message: "Id is required" });
    console.log(user_id);
    try {
      let { recordset } = await db.exec("sp_getUserTasks", {
        user_id,
      });
      res.status(200).send({ tasks: recordset });
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .send({ error: error.message, message: "Internal Sever Error" });
    }
  },
};
