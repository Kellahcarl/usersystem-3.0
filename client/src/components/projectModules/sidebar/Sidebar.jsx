import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./Sidebar.css";

const Sidebar = () => {
  return (
    <>
      <Nav
        className="col-md-12 d-none d-md-block bg-light sidebar"
        activeKey="/home"
      >
        <div className="sidebar-sticky"></div>
        <Nav.Item>
          <Nav.Link>
            <Link to="/admin/projects">Projects</Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link>
            <Link to="/admin/tasks">Tasks</Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link>
            <Link to="/admin/users">Users</Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="disabled" disabled>
            Settings
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
};

export default Sidebar;
