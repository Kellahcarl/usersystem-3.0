import axios from "axios";

const API_URL = "http://localhost:3001/api/auth/";



const register = (firstname, lastname, isAdmin, email, password) => {
  return axios.post(API_URL + "register", {
    firstname,
    email,
    lastname,
    isAdmin,
    password,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export const authService = {
  register,
  login,
  logout,
};
