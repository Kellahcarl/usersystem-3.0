import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal } from "react-bootstrap";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { UpdateSingleProject } from "../../redux/actions/projectAction";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
const vname = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The name must be between 3 and 20 characters!
      </div>
    );
  }
};
const vdescription = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The name must be between 3 and 20 characters!
      </div>
    );
  }
};

function MyVerticallyCenteredModal(props) {
  const form = useRef();
  const checkBtn = useRef();

  const [successful, setSuccessful] = useState(false);

  const [name, setName] = useState("");
  const [client_name, setClient_name] = useState("");
  const [description, setDescription] = useState("");
  const [start_date, setStart_date] = useState("");
  const [end_date, setEnd_date] = useState("");

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const onChangeProjectName = (e) => {
    const ProjectName = e.target.value;
    setName(ProjectName);
  };

  const onChangeClientName = (e) => {
    const ClientName = e.target.value;
    setClient_name(ClientName);
  };
  const onChangeDescription = (e) => {
    const Description = e.target.value;
    setDescription(Description);
  };
  const onChangeStartDate = (e) => {
    const StartDate = e.target.value;
    setStart_date(StartDate);
  };
  const onChangeEndDate = (e) => {
    const EndDate = e.target.value;
    setEnd_date(EndDate);
  };
  const project_id = props.project_id;

  const handleUpdateProject = (e) => {
    e.preventDefault();

    form.current.validateAll();

    setSuccessful(false);

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(
        UpdateSingleProject(
          project_id,
          name,
          client_name,
          start_date,
          end_date,
          description
        )
      )
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
    // props.onHide();
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
          UPDATE PROJECT
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleUpdateProject} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="ProjectName">ProjectName</label>
                <Input
                  type="text"
                  className="form-control"
                  name="ProjectName"
                  value={name}
                  onChange={onChangeProjectName}
                  validations={[required, vname]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="ClientName">ClientName</label>
                <Input
                  type="text"
                  className="form-control"
                  name="ClientName"
                  value={client_name}
                  onChange={onChangeClientName}
                  validations={[required, vname]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Description">Description</label>
                <Input
                  type="text"
                  className="form-control"
                  name="Description"
                  value={description}
                  onChange={onChangeDescription}
                  validations={[required, vdescription]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="StartDate">StartDate</label>
                <Input
                  type="date"
                  className="form-control"
                  name="StartDate"
                  value={start_date}
                  onChange={onChangeStartDate}
                  validations={[required]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="EndDate">EndDate</label>
                <Input
                  type="date"
                  className="form-control"
                  name="EndDate"
                  value={end_date}
                  onChange={onChangeEndDate}
                  validations={[required]}
                />
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

export default function UpdateProject({ project_id }) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Update Project
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        project_id={project_id}
      />
    </>
  );
}
