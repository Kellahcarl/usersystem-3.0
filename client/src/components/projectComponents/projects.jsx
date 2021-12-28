import React, { useEffect } from "react";
import { getProjects } from "../../redux/actions/projectAction";
import { useDispatch, useSelector } from "react-redux";

import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
} from "react-bootstrap";
import { CreateProject } from "./CreateProject";
import AssignProject from "./AssignProject";

const Projects = () => {
  const dispatch = useDispatch();
  const { projects, loading } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);
  let data = projects.projects;
  data ? console.log(data) : console.log("empty");

  return (
    <Container>
      <Card>
        {/* <Button>create Project</Button> */}
        <CreateProject />
      </Card>
      {data ? (
        <Table striped borderless responsive="sm" hover>
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Clients Name</th>
              <th>Description</th>
              <th>start date</th>
              <th>end date</th>
              <th>Assign</th>
              <th>Delete!</th>
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
                <td>
                  {data.status ? (
                    <> Assigned</>
                  ) : (
                    <AssignProject project_id={data._id} />
                  )}
                </td>
                <td></td>
                <td>
                  <i className="bi bi-trash"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <h4>data loading</h4>
      )}
    </Container>
  );
};

export default Projects;
