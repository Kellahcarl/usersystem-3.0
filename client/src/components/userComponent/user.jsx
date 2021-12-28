import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Container, Card, Button, Table } from "react-bootstrap";
import { getUsers } from "../../redux/actions/userAction";
import { CreateUser } from "./CreateUser";

const Users = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const { users } = useSelector((state) => state.users);

  let data = users;
  data ? console.log(data) : console.log("empty");
  return (
    <Container>
      <Card>
        <CreateUser />
      </Card>
      {data ? (
        <Table striped borderless responsive="sm" hover>
          <thead>
            <tr>
              <th>Names</th>
              <th>Email</th>
              <th>UserType</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data) => (
              <tr key={data._id}>
                <td>{data.first + " " + data.last}</td>
                <td>{data.email}</td>
                <td>{data.isAdmin ? <>Administrator</> : <>Normal User</>}</td>
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

export default Users;
