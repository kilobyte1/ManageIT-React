import React, { Component } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
  Link,
} from "react-router-dom";
import Room from "./Room";

const HomePage = () => {
  const renderHomePage = () => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} align="center">
          <Typography variant="h3">House Party</Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button color="primary" to="/join" component={Link}>
              Join a Room
            </Button>
            <Button color="secondary" to="/create" component={Link}>
              Create a Room
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
  };

  return (
    <Router>
      <Routes>
        {/**
              Routes enforces a stricter API. For example, you must use the element prop to pass a JSX element to the route, rather than the component prop.
              Routes makes it easier to work with nested routes.
              Routes doesn't stop at the first match by default if you're using nested routes; it checks the entire tree.
               */}
        {/* Correctly rendering the home page content */}
        <Route path="/" element={renderHomePage()} />

        {/* Routes for joining and creating rooms */}
        <Route path="/join" element={<RoomJoinPage />} />
        <Route path="/create" element={<CreateRoomPage />} />
        {/* Route to the room . the : - means (placeholder) there will be a parameter */}
        <Route path="/room/:roomCode" element={<Room />} />
      </Routes>
    </Router>
  );
};
export default HomePage;
