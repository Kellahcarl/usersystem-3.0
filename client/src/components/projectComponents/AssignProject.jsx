import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
  Modal,
} from "react-bootstrap";
import { getAssignedUsers, getUsers } from "../../redux/actions/userAction";

function MyVerticallyCenteredModal(props) {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const { assignedUsers, loading } = useSelector(
    (state) => state.assignedUsers
  );
  useEffect(() => {
    dispatch(getUsers());
    dispatch(getAssignedUsers(props.project_id));
  }, [dispatch]);
  // console.log(props.project_id);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Assign Project
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function AssignProject({ project_id }) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        ASSIGN
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        project_id={project_id}
      />
    </>
  );
}
