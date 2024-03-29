import "./Job_Card.css";
import {
  Badge,
  Button,
  Card,
  CardContent,
  Grid,
  Icon,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import {
  Delete,
  Edit,
  Visibility,
  Download,
  PlaylistAddCheck,
  CancelScheduleSend,
  ThumbUpAlt,
  DoDisturbAlt,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { isUser } from "app/utils/GetCookies";
import Swal from "sweetalert2";
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import EditIcon from '@mui/icons-material/Edit';

const showAlert = (type, title, text) => {
  Swal.fire({
    title: title,
    text: text,
    icon: type,
    width: 300,
    // customClass: 'swal-wide',
  });
};

const Jobs_Card = ({ job }) => {
  const location = useLocation();
  const Role = isUser();
  const isMyJob = location.pathname === "/my-job" ? true : false;
  const isApplication = location.pathname === "/applications" ? true : false;
  const isDashboard = location.pathname === "/dashboard" ? true : false;
  const isJobApplication =
    location.pathname === "/job/applications" ? true : false;

  const handleSwalFire = () => {
    showAlert("success", "Success!", "Your action was successful.");
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="div" component="h2" gutterBottom>
          <Grid container item xs={12}>
            <Grid item xs={9}>
              <Typography variant="h5" component="h2" gutterBottom>
                {job.title}
              </Typography>
            </Grid>
            {isApplication && (
              <Grid item xs={3}>
                <Stack
                  spacing={7}
                  direction="row"
                  justifyContent={"end"}
                  marginRight={2}
                  marginTop={0.1}
                >
                  <>
                    <Badge badgeContent={"Finished"} color="primary"></Badge>
                    {/* <Badge badgeContent={"Applied"} color="success"></Badge> */}
                    {/* <Badge badgeContent={"Cancelled"} color="secondary"></Badge> */}
                    {/* <Badge badgeContent={"Rejected"} color="error"></Badge> */}
                  </>
                </Stack>
              </Grid>
            )}
          </Grid>
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Job Type: {job.jobType}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Duration: {job.duration}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Salary: {job.salary}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Deadline: {new Date(job.deadline).toLocaleDateString()}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Skills: {job.skills.join(", ")}
        </Typography>
        <Typography display={"flex"} justifyContent={"end"} gap={2} mt={1}>
          {isMyJob && Role === "recruiter" && (
            <>
              <Link to={"/job/applications"}>
                <Tooltip title="View Application">
                  <Visibility color="success" sx={{ cursor: "pointer" }} />
                </Tooltip>
              </Link>
              <Link>
                <Tooltip title="Update">
                  <Edit color="primary" sx={{ cursor: "pointer" }} />
                </Tooltip>
              </Link>
              <Button sx={{ minWidth: 0, padding: 0 }}>
                <Tooltip title="Delete">
                  <Delete color="error" sx={{ cursor: "pointer" }} />
                </Tooltip>
              </Button>
            </>
          )}
          {isDashboard && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSwalFire()}
            >
              Apply
            </Button>
          )}
          {isJobApplication && (
            <>
              <Link to={"#"}>
                <Tooltip arrow title="Reject">
                  <CancelScheduleSend color="error" />
                </Tooltip>
              </Link>
              <Link to={"#"}>
                <Tooltip arrow title="Shortlist">
                  <PlaylistAddCheck color="warning" />
                </Tooltip>
              </Link>
              <Link to={"#"}>
                <Tooltip arrow title="Accept">
                  <ThumbUpAlt color="primary" />
                </Tooltip>
              </Link>
              <Link to={"#"}>
                <Tooltip arrow title="Download Resume">
                  <Download color="success" />
                </Tooltip>
              </Link>
            </>
          )}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Jobs_Card;
