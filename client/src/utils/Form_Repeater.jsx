import React from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  makeStyles,
  Paper,
  MenuItem,
  Input,
} from "@mui/material";

const Form_Repeater = () => {
  return (
    <>
      <Grid item
          container
          className=""
          key="1"
          style={{ paddingLeft: 0, paddingRight: 0 }}>
        <Grid item xs={4}>
          <TextField
            label={`Institution Name #`}
            value=""
            variant="outlined"
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Start Year"
            value=""
            variant="outlined"
            type="number"
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="End Year"
            value=""
            variant="outlined"
            type="number"
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            color="secondary"
            className=""
          >
            +
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className=""
            style={{backgroundColor:"red"}}
          >
            -
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Form_Repeater;
