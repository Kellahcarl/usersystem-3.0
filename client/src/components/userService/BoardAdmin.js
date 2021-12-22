import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const BoardAdmin = () => {
  const dispatch = useDispatch();

  return (
    <div className="container">
      <header>
        <strong>admin board</strong>
      </header>
    </div>
  );
};

export default BoardAdmin;
