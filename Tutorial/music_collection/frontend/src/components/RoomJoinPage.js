import React, { Component, useState } from "react";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";

const RoomJoinPage = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    //initial values
    roomCode: "",
    //when error pops up, rerender component
    error: "",
  });

  const handleRoomCode = (e) => {
    //"..." ensures that all the other
    //properties of prevState remain intact while only roomCode is updated.
    setState({ ...state, roomCode: e.target.value });
  };

  const roomButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      //pass the room code as the body
      body: JSON.stringify({
        code: state.roomCode,
      }),
    };
    fetch("/api/join-room", requestOptions)
      .then((response) => {
        if (response.ok) {
          navigate(`/room/${state.roomCode}`);
        } else {
          //update and add text to the error state
          setState({ ...state, error: "Room not found" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Join a Room
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <TextField
          //error will change the apearance of the field to red
          error={state.error}
          label="Code"
          placeholder="Enter a Room code"
          value={state.roomCode}
          //helpertext will display the error when there is
          helperText={state.error}
          variant="filled"
          onChange={handleRoomCode}
        />
      </Grid>

      <Grid item xs={12} align="center">
        <Button variant="contained" color="primary" onClick={roomButtonPressed}>
          Enter Room
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="secondary" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  );
};
export default RoomJoinPage;
