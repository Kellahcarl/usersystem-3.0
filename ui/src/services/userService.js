import axios from "axios";

const BASE_URL = "http://localhost:3001/api/auth";
const user = JSON.parse(localStorage.getItem("user"));

export const userService = {
  getAllUsers: async () => {
    const { data: message } = await axios.get(BASE_URL, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    return message;
  },
};
