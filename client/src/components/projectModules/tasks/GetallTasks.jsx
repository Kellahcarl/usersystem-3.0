import React, { useEffect, useState } from "react";
import { Table, FormControl } from "react-bootstrap";
import { getTasks } from "../../../redux/actions/taskActions";

import { useDispatch, useSelector } from "react-redux";
// import { createTask, updateTask } from "../../../services/tasks.service";
import Createtask from "./CreateTask";

const Getalltasks = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);
  // const { user } = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    // const user_id = user._id;
    dispatch(getTasks());
  }, [dispatch]);
  let data = tasks.tasks;
  data ? console.log(data) : console.log("empty");

  return <div></div>;
};

export default Getalltasks;
