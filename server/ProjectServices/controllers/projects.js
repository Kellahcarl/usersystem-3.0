const db = require("../database");
const {
  validateProject,
  validateAssignProject,
} = require("../helpers/validator");
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");
const parser = require("../helpers/parser");
const _ = require("lodash");

module.exports = {
  getProjects: async (req, res) => {
    try {
      let result = await db.exec("sp_getProjects");

      const projects = await parser(result);
      res.status(200).json({ projects });
    } catch (error) {
      console.log(error);
      if (error.message) return res.status(500).json(error);
      res.status(404).json(error);
    }
  },
  getProject: async (req, res) => {
    const { project_id } = req.params;
    if (!project_id)
      return res.status(400).send({ message: "project Id is required" });

    try {
      let result = await db.exec("sp_getSingleProject", {
        project_id,
      });
      console.log(result);
      if (result.recordset == "") {
        return res.status(404).send(`no project with Project_id ${project_id}`);
      }

      const project = result.recordset;

      res.status(200).json({ project });
    } catch (error) {
      if (error.message) return res.status(500).json(error).send(error.message);
      res.status(404).json(error);
    }
  },
  createProject: async (req, res) => {
    const { error } = validateProject(req.body);
    if (error)
      return res
        .status(400)
        .send({ success: false, message: error.details[0].message });

    try {
      const { name, client_name, start_date, end_date, description } = req.body;
      const id = uuidv4();
      const result = await db.exec("sp_createProject", {
        id,
        name,
        client_name,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        description,
      });
      res.send({ message: "Project created successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  updateProject: async (req, res) => {
    const { error } = validateProject(
      _.pick(req.body, [
        "name",
        "client_name",
        "start_date",
        "end_date",
        "description",
      ])
    );
    if (!req.body.project_id)
      return res
        .status(400)
        .send({ success: false, message: "project_id is required" });
    if (error)
      return res
        .status(400)
        .send({ success: false, message: error.details[0].message });

    try {
      const {
        name,
        project_id,
        client_name,
        start_date,
        end_date,
        description,
      } = req.body;

      await db.exec("sp_updateProject", {
        id: project_id,
        name,
        client_name,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        description,
      });

      res.send({ message: "Project updated successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Internal Server Error", error: error.message });
    }
  },

  deleteProject: async (req, res) => {
    try {
      const { project_id } = req.body;
      const { recordset } = await db.exec("sp_getSingleProject", {
        project_id,
      });

      const project = recordset[0];

      if (!project) {
        return res
          .status(404)
          .send({ message: "Project does not exist or already deleted" });
      }

      await db.exec("sp_deleteProject", {
        id: project_id,
      });
      res.status(201).send({ message: "Project deleted Successfully" });
    } catch (error) {
      res
        .status(500)
        .send({ error: error.message, message: "Internal Sever Error" });
    }
  },
  completeProject: async (req, res) => {
    console.log("completed");
  },
};
