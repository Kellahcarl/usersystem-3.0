import axios from "axios";
import { assignTask, unassignTask } from "../redux/actions/taskActions";

const BASE_URL = "http://localhost:3002";
const user = JSON.parse(localStorage.getItem("user"));

export const createTask = async (
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
    start_date,
    end_date,
    description,
    duration,
  };
  const { data: message } = await axios.post(BASE_URL + "/tasks", task, {
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  });
  return message;
};
export const updateTask = async (
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
  const { data: message } = await axios.put(BASE_URL + "/tasks", task, {
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  });
  return message;
};
export const getAllTasks = async () => {
  const { data: message } = await axios.get(BASE_URL + `/tasks/`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  console.log(message);
  return message;
};
export const getSingleTask = async (project_id, task_id) => {
  const { data: message } = await axios.get(
    BASE_URL + "/tasks/" + project_id + "/",
    task_id,
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
  );
  return message;
};
export const getassignedUser = async (task_id) => {
  const { data: message } = await axios.get(
    BASE_URL + "/tasks/assign/" + task_id,
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
  );
  return message;
};
export const assignUserTask = async (project_id, task_id, user_id) => {
  const { data: message } = await assignTask(project_id, task_id, user_id);

  return message;
};
export const unAssignUserTask = async (project_id, task_id) => {
  const { data: message } = await unassignTask(project_id, task_id);
  return message;
};
export const deleteTask = async (task_id) => {
  task_id = { task_id };
  const { data: message } = await axios.post(
    BASE_URL + "/tasks/delete/",
    task_id,
    {
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    }
  );
  return message;
};
export const completeTask = async (project_id, task_id) => {
  const { data: message } = await completeTask(project_id, task_id);
  return message;
};
