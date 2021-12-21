import axios from "axios";

const BASE_URL = "http://localhost:8082";
const user = JSON.parse(localStorage.getItem("user"));

export default {
  createTask: async (
    project_id,
    name,
    start_date,
    end_date,
    description,
    duration
  ) => {
    let task = {
      project_id,
      name,
      client_name,
      start_date,
      end_date,
      description,
      duration,
    };
    const { data } = await axios.post(BASE_URL + "/tasks", task, {
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    return data;
  },
  updateTask: async (
    task_id,
    project_id,
    name,
    start_date,
    end_date,
    description,
    duration
  ) => {
    let task = {
      task_id,
      project_id,
      name,
      start_date,
      end_date,
      description,
      duration,
    };
    const { data } = await axios.put(BASE_URL + "/tasks", task, {
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    return data;
  },
  getAllTasks: async (project_id) => {
    const { data } = await axios.get(BASE_URL + "/tasks", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    return data;
  },
  getSingleTask: async (project_id, task_id) => {
    const { data } = await axios.get(
      BASE_URL + "/tasks/" + project_id + "/",
      task_id,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    return data;
  },
  getassignedUser: async (task_id) => {
    const { data } = await axios.get(BASE_URL + "/tasks/assign/" + task_id, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    return data;
  },
  assignUserTask: async (project_id, task_id, user_id) => {
    assignUser = { project_id, task_id, user_id };
    const { data } = await axios.post(BASE_URL + "/tasks/assign/", assignUser, {
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    return data;
  },
  unAssignUserTask: async (project_id, task_id) => {
    taskInfo = { project_id, task_id };
    const { data } = await axios.post(BASE_URL + "/tasks/unassign/", taskInfo, {
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    return data;
  },
  deleteTask: async (project_id) => {
    project_id = { project_id };
    const { data } = await axios.post(BASE_URL + "/tasks/delete/", project_id, {
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    return data;
  },
  completeTask: async (project_id, task_id) => {
    task = { project_id, task_id };
    const { data } = await axios.post(BASE_URL + "/tasks/complete/", task, {
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    return data;
  },
};
