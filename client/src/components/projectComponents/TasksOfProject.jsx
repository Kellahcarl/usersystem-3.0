import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTaskOFProject } from "../../redux/actions/taskActions";
import moment from "moment";

import { Container, Card, Button, Table, Modal } from "react-bootstrap";

function MyVerticallyCenteredModal(props) {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasksOfProject);
  const data = tasks;

  useEffect(() => {
    dispatch(getTaskOFProject(props.project_id));
  }, [dispatch]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Available Tasks
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {data ? (
          <Table striped borderless responsive="md" hover>
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
                  <td>{moment.utc(data.start_date).format("DD/MM/YY")}</td>
                  <td>{moment.utc(data.end_date).format("DD/MM/YY")}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <h4>data loading</h4>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export function ViewTaskOfProject({ project_id }) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant="success" onClick={() => setModalShow(true)}>
        Tasks
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        project_id={project_id}
      />
    </>
  );
}
