import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal } from "react-bootstrap";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Select from "react-validation/build/select";
import { getProjects } from "../../redux/actions/projectAction";
import { getUnAssignedUsers } from "../../redux/actions/userAction";
import { assignTask } from "../../redux/actions/taskActions";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

function MyVerticallyCenteredModal(props) {
  const form = useRef();
  const checkBtn = useRef();

  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.unassignedUsers);

  useEffect(() => {
    dispatch(getUnAssignedUsers());
  }, [dispatch]);
  const [successful, setSuccessful] = useState(false);

  const [user_id, setUser_id] = useState("");

  const { message } = useSelector((state) => state.message);

  const onChangeUser = (e) => {
    const user = e.target.value;

    setUser_id(user);
  };
  const project_id = props.project_id;
  const task_id = props.task_id;

  // console.log(project_id, task_id);

  const handleCreateTask = (e) => {
    e.preventDefault();

    console.log(user_id);
    setSuccessful(false);
    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(assignTask(project_id, task_id, user_id))
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
    props.onHide();
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Assign User
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleCreateTask} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="User">User</label>
                <Select
                  className="form-control"
                  name="User"
                  value={user_id}
                  onChange={onChangeUser}
                  validations={[required]}
                >
                  {users ? (
                    users.map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.first} {user.last}
                      </option>
                    ))
                  ) : (
                    <option value=""> loading Users</option>
                  )}
                </Select>
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block" type="submit">
                  Submit
                </button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export function AssignTask({ project_id, task_id }) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant="success" onClick={() => setModalShow(true)}>
        Assign
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        project_id={project_id}
        task_id={task_id}
      />
    </>
  );
}
