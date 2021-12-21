import axios from "axios";

const BASE_URL = "http://localhost:3001/api/auth";
const user = JSON.parse(localStorage.getItem("user"));

export default {
  resetPassword: async (user_id, password) => {
    let user = { user_id, password };
    const { data } = await axios.post(BASE_URL + "/reset-password", user, {
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    return data;
  },
  forgotPassword: async (email) => {
    user = { email };
    const { data } = await axios.post(BASE_URL + "/reset-password", user, {
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    return data;
  },
  updateUser: async (id, firstname, lastname, email) => {
    let user = {
      id,
      firstname,
      lastname,
      email,
    };
    const { data } = await axios.put(BASE_URL, user, {
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    return data;
  },
  deleteUser: async (email) => {
    let user = {
      email,
    };
    const { data } = await axios.post(BASE_URL + "/delete", user, {
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    return data;
  },
  getAllUser: async () => {
    const { data } = await axios.get(BASE_URL, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    return data;
  },
  getSingleUser: async (user_id) => {
    const { data } = await axios.get(BASE_URL + "/" + user_id, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    return data;
  },
};
