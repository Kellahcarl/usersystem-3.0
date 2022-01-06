import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Card, Button } from "react-bootstrap";
import { getTaskOfUser } from "../../redux/actions/taskActions";
import moment from "moment";

const BoardUser = () => {
  const dispatch = useDispatch();
  const { tasks, loading } = useSelector((state) => state.taskOfUser);
  // console.log(tasks);
  useEffect(() => {
    dispatch(getTaskOfUser());
  }, [dispatch]);
  return (
    <>
      <Container>
        <Card>
          <h2>Welcome To The User Page </h2>
        </Card>
        <Card>
          {tasks ? (
            <>
              <Card.Header>Featured task</Card.Header>
              <Card.Body>
                <Card.Title>Project Name:{tasks.pname}</Card.Title>
                <Card.Text>Project Description:{tasks.pdescription}</Card.Text>
                <Card.Text>Task Name:{tasks.tname}</Card.Text>
                <Card.Text>Task Desciption:{tasks.tdescription}</Card.Text>
                <Card.Text>
                  Start Date :{moment.utc(tasks.start_date).format("DD/MM/YY")}
                </Card.Text>
                <Card.Text>
                  End Date{moment.utc(tasks.end_date).format("DD/MM/YY")}
                </Card.Text>
                <Button>Submit for Approval</Button>
              </Card.Body>
            </>
          ) : (
            <>
              <h2>no Tasks available yet</h2>
            </>
          )}
        </Card>
      </Container>
      <Container></Container>
    </>
  );
};

export default BoardUser;
