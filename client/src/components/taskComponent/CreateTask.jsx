import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal } from "react-bootstrap";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Select from "react-validation/build/select";
import { getProjects } from "../../redux/actions/projectAction";
import { addTask } from "../../redux/actions/taskActions";

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

  const dispatch = useDispatch();
  const { projects, loading } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);
  let data = projects.projects;

  const [successful, setSuccessful] = useState(false);

  const [project_id, setProject_id] = useState("");
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [start_date, setStart_date] = useState("");
  const [end_date, setEnd_date] = useState("");

  const { message } = useSelector((state) => state.message);

  const onChangeProject = (e) => {
    const Project = e.target.value;

    setProject_id(Project);
  };
  const onChangeTaskName = (e) => {
    const ProjectName = e.target.value;
    setName(ProjectName);
  };

  const onChangeDuration = (e) => {
    const duration = e.target.value;
    setDuration(duration);
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

  const handleCreateTask = (e) => {
    e.preventDefault();

    setSuccessful(false);
    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(
        addTask(project_id, name, duration, start_date, end_date, description)
      )
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
          Created Project
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleCreateTask} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="Project">Project</label>
                <Select
                  className="form-control"
                  name="Project"
                  value={project_id}
                  onChange={onChangeProject}
                  validations={[required]}
                >
                  {data ? (
                    data.map((data) => (
                      <option key={data._id} value={data._id}>
                        {data.name} {data.client_name}
                      </option>
                    ))
                  ) : (
                    <option value=""> loading Projects</option>
                  )}
                </Select>
              </div>
              <div className="form-group">
                <label htmlFor="TaskName">TaskName</label>
                <Input
                  type="text"
                  className="form-control"
                  name="TaskName"
                  value={name}
                  onChange={onChangeTaskName}
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
                <label htmlFor="Duration">Duration</label>
                <Input
                  type="number"
                  className="form-control"
                  name="Duration"
                  value={duration}
                  onChange={onChangeDuration}
                  validations={[required]}
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

export function CreateTask() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant="success" onClick={() => setModalShow(true)}>
        Create Task
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
