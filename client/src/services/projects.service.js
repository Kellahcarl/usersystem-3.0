import axios from "axios";

const BASE_URL = "http://localhost:3002";
const user = JSON.parse(localStorage.getItem("user"));

export const createProject = async (
  name,
  client_name,
  start_date,
  end_date,
  description
) => {
  let project = { name, client_name, start_date, end_date, description };
  const { data: message } = await axios.post(BASE_URL + "/projects", project, {
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  });
  return message;
};
export const updateProject = async (
  project_id,
  name,
  client_name,
  start_date,
  end_date,
  description
) => {
  let project = {
    project_id,
    name,
    client_name,
    start_date,
    end_date,
    description,
  };
  const { data: message } = await axios.put(BASE_URL + "/projects", project, {
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  });
  return message;
};
export const getAllProjects = async () => {
  const { data: message } = await axios.get(BASE_URL + "/projects", {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  return message;
};
export const getSingleProject = async (project_id) => {
  const { data: message } = await axios.get(
    BASE_URL + "/projects/" + project_id,
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
  );
  return message;
};
export const getassignedUser = async (project_id) => {
  const { data: message } = await axios.get(
    BASE_URL + "/projects/assign/" + project_id,
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
  );
  return message;
};
export const assignUserProject = async (project_id, user_id) => {
  const assignUser = { project_id, user_id };
  const { data: message } = await axios.post(
    BASE_URL + "/projects/assign/",
    assignUser,
    {
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    }
  );
  return message;
};
export const unAssignUserProject = async (project_id) => {
  project_id = { project_id };
  const { data: message } = await axios.post(
    BASE_URL + "/projects/unassign/",
    project_id,
    {
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    }
  );
  return message;
};
export const deleteProject = async (project_id) => {
  project_id = { project_id };
  const { data: message } = await axios.post(
    BASE_URL + "/projects/delete/",
    project_id,
    {
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    }
  );
  return message;
};
