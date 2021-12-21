import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import { useEffect } from "react";
import { getProjects } from "../../redux/actions/projectAction";
import { useDispatch, useSelector } from "react-redux";

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProjects());
  }, []);
  const { projects } = useSelector((state) => state.projects);
  console.log(projects[0]);
  return (
    <React.Fragment>
      <Title></Title>
      <Typography component="p" variant="h4">
        projects[0].description
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 15 March, 2019
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}
