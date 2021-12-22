import axios from "axios";

const BASE_URL = "http://localhost:3001/api/auth";
const user = JSON.parse(localStorage.getItem("user"));

export default {
  resetPassword: async (user_id, password) => {
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
  },
  forgotPassword: async (email) => {
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
  },
  updateUser: async (id, firstname, lastname, email) => {
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
  },
  deleteUser: async (email) => {
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
  },
  getAllUser: async () => {
    const { data: message } = await axios.get(BASE_URL, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    return message;
  },
  getSingleUser: async (user_id) => {
    const { data: message } = await axios.get(BASE_URL + "/" + user_id, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    return message;
  },
};
