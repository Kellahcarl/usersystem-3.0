import axios from "axios";
import { assignTask, unassignTask } from "../redux/actions/taskActions";

const BASE_URL = "http://localhost:3002";
const user = JSON.parse(localStorage.getItem("user"));

export const createTask = async (
  project_id,
  name,
  duration,
  start_date,
  end_date,
  description
) => {
  let task = {
    project_id,
    name,
    duration,
    start_date,
    end_date,
    description,
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
  duration,
  start_date,
  end_date,
  description
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
  console.log(message);
  return message;
};
export const getAllTasks = async () => {
  const { data: message } = await axios.get(BASE_URL + `/tasks/`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  return message.tasks;
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
export const assignUserTask = async (task_id, user_id) => {
  const info = { task_id, user_id };
  const { data: message } = await axios.post(BASE_URL + "/tasks/assign", info, {
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  });
  return message;
};
export const unAssignUserTask = async (task_id) => {
  const { data: message } = await axios.post(
    BASE_URL + "/tasks/unassign",
    { task_id },
    {
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    }
  );
  return message;
};

export const deleteTask = async (task_id, project_id) => {
  const data = { task_id, project_id };
  const { data: message } = await axios.put(BASE_URL + "/tasks/delete/", data, {
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  });
  return message;
};
export const completeTask = async (task_id) => {
  const { data: message } = await axios.put(
    BASE_URL + "/tasks/complete",
    { task_id },
    {
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    }
  );
  return message;
};
export const uncompleteTask = async (task_id) => {
  const { data: message } = await axios.put(
    BASE_URL + "/tasks/uncomplete",
    { task_id },
    {
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    }
  );
  return message;
};
export const getTaskOfProject = async (project_id) => {
  const { data: message } = await axios.get(
    BASE_URL + `/tasks/tasks/${project_id}`,
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
  );
  return message.tasks;
};
