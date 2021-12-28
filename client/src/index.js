import React from "react";

import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Login from "./components/userService/Login";
import Register from "./components/userService/Register";
import Home from "./components/userService/Home";
import Profile from "./components/userService/Profile";
import BoardUser from "./components/userService/BoardUser";
import BoardAdmin from "./components/userService/BoardAdmin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Projects from "./components/projectComponents/projects";
import Tasks from "./components/taskComponent/tasks";
import Users from "./components/userComponent/user";
import { CreateProject } from "./components/projectComponents/CreateProject";

import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/admin" element={<BoardAdmin />}>
            <Route path="projects" element={<Projects />} />
            <Route path="createproject" element={<CreateProject />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="users" element={<Users />} />
          </Route>

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user" element={<BoardUser />} />
        </Route>
      </Routes>
    </Provider>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can chađinge
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
