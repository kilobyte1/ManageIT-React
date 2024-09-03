import React, { Component, useState } from "react";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const RoomJoinPage = () => {
  const [state, setState] = useState({
    //initial values
    roomCode: "",
    //when error pops up, rerender component
    error: "",
  });

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Join a Room
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <TextField
          error={state.error}
          label="Code"
          placeholder="Enter a Room code"
          value={state.roomCode}
          helptext={state.error}
          variant="outlined"
        />
      </Grid>
    </Grid>
  );
};
export default RoomJoinPage;
