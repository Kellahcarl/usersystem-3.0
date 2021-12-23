import React from "react";
import { Table, FormControl } from "react-bootstrap";

const Getalltasks = () => {
  return (
    <div>
      <Table striped borderless responsive="sm" hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Getalltasks;
