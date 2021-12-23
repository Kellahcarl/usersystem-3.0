import React from "react";
import { Outlet } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
} from "react-bootstrap";
import { withRouter } from "react-router";
import Sidebar from "../projectModules/sidebar/Sidebar";
import "../projectModules/index.css";

const BoardAdmin = () => {
  return (
    <>
      <Container fluid>
        <Col xs={2} id="sidebar-wrapper">
          <Sidebar />
        </Col>
        <Col xs={10} id="page-content-wrapper content">
          <div className="btns">
            <Button variant="success">Create </Button>{" "}
            <Button variant="primary">Update </Button>{" "}
          </div>
          <div className="outlet">
            <Outlet />
          </div>
        </Col>
      </Container>
    </>
  );
};

export default BoardAdmin;
