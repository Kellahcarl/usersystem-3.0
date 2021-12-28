import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getTasks } from "../../redux/actions/taskActions";

import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
} from "react-bootstrap";
import { CreateTask } from "./CreateTask";

const Tasks = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const { tasks } = useSelector((state) => state.tasks);

  let data = tasks;
  //   data ? console.log(data) : console.log("empty");
  return (
    <Container>
      <Card>
        {/* <Button>create Task</Button> */}
        <CreateTask />
      </Card>
      {data ? (
        <Table striped borderless responsive="sm" hover>
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Duration</th>
              <th>Description</th>
              <th>start date</th>
              <th>end date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data) => (
              <tr key={data._id}>
                <td>{data.name}</td>
                <td>{data.duration}</td>
                <td>{data.description}</td>
                <td>{moment.utc(data.start_date).format("MM/DD/YY")}</td>
                <td>{moment.utc(data.end_date).format("MM/DD/YY")}</td>
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

export default Tasks;
