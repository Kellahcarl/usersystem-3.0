import React, { useEffect } from "react";
import { getProjects } from "../../redux/actions/projectAction";
import Dashboard from "../projectModules/Dashboard";
import { useDispatch, useSelector } from "react-redux";

const BoardAdmin = () => {
  const dispatch = useDispatch();

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>admin board</h3>
        <Dashboard />
      </header>
    </div>
  );
};

export default BoardAdmin;
