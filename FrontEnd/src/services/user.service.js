import axios from "axios";

const BASE_URL = "http://localhost:8082/api/";

export const getProjectBoard = axios.create({
  baseURL: BASE_URL + "projects",
});

export const getTaskBoard = axios.create({
  baseURL: BASE_URL + "tasks",
});
