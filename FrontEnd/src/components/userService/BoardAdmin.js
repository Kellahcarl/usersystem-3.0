import React, { useEffect } from "react";
import Dashboard from "../projectModules/Dashboard";
import { useDispatch, useSelector } from "react-redux";

const BoardAdmin = () => {
  const dispatch = useDispatch();

  return (
    <div className="container">
      <header>
        <strong>admin board</strong>
      </header>
      <Dashboard />
    </div>
  );
};

export default BoardAdmin;
