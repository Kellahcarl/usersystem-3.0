import React, { useEffect, useState } from "react";
import { getProjects } from "../../../redux/actions/projectAction";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Createproject from "./Createproject";
import { updateProject } from "../../../services/projects.service";
const Getallprojects = () => {
  const dispatch = useDispatch();
  const { projects, loading } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);
  let data = projects.projects;
  // data ? console.log(data) : console.log("empty");
  return (
    <div>
      <Createproject />
      <updateProject />
      {data ? (
        <Table striped borderless responsive="sm" hover>
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Clients Name</th>
              <th>Description</th>
              <th>start date</th>
              <th>end date</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data) => (
              <tr key={data._id}>
                <td>{data.name}</td>
                <td>{data.client_name}</td>
                <td>{data.description}</td>
                <td>{data.start_date}</td>
                <td>{data.end_date}</td>
                <td>{data.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <h4>data loading</h4>
      )}
    </div>
  );
};

export default Getallprojects;
