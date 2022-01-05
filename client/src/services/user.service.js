import axios from "axios";

const BASE_URL = "http://localhost:3001/api/auth";
const user = JSON.parse(localStorage.getItem("user"));

export const resetPassword = async (user_id, password) => {
  let user = { user_id, password };
  const { data: message } = await axios.post(
    BASE_URL + "/reset-password",
    user,
    {
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    }
  );
  return message;
};
export const forgotPassword = async (email) => {
  user = { email };
  const { data: message } = await axios.post(
    BASE_URL + "/reset-password",
    user,
    {
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    }
  );
  return message;
};
export const updateUser = async (id, firstname, lastname, email) => {
  let user = {
    id,
    firstname,
    lastname,
    email,
  };
  const { data: message } = await axios.put(BASE_URL, user, {
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  });
  return message;
};
export const deleteUser = async (email) => {
  let user = {
    email,
  };
  const { data: message } = await axios.post(BASE_URL + "/delete", user, {
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  });
  return message;
};
export const getAllUsers = async () => {
  const { data: message } = await axios.get(BASE_URL, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  return message.users;
};
export const getSingleUser = async (user_id) => {
  const { data: message } = await axios.get(BASE_URL + "/" + user_id, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  return message;
};

export const getUnassigned = async (user_id) => {
  const { data: message } = await axios.get(BASE_URL + "/assign", {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  return message.users;
};
