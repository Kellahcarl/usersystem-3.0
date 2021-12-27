import React, { useState } from "react";
import { Form, InputGroup, FormControl } from "react-bootstrap";
import DatePicker from "react-datepicker";

const Createproject = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div>
      <InputGroup className="mb-3">
        <FormControl
          type="text"
          placeholder="Project name"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Client Name"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <FormControl
          type="date"
          placeholder="start Date"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <FormControl
          type="date"
          placeholder="End Date"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Description"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
    </div>
  );
};

export default Createproject;
