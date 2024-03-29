import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import JobsCard from "./Jobs_Card";

const Jobs_List = ({jobs,title}) => {
  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 ,mt:5}}>
        {title}
      </Typography>

      <Grid container spacing={3}>
        {jobs?.map((job) => (
          <Grid item xs={12} sm={6} md={4} key={job.id}>
            <JobsCard job={job} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Jobs_List;
