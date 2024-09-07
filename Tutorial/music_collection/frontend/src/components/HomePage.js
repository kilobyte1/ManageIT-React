import React, { Component, useEffect, useState } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
  Link,
  Redirect,
  Navigate,
} from "react-router-dom";
import Room from "./Room";
//

const HomePage = () => {
  // Declare state variable 'roomCode' to store the room code (initially set to null)
  const [roomCode, setRoomCode] = useState(null);

  // useEffect to run the fetchData function when the component mounts
  useEffect(() => {
    // Define an async function to fetch data from the server
    const fetchData = async () => {
      try {
        // Make a request to the "api/user-in-room" endpoint
        const response = await fetch("/api/user-in-room");
        // Check if the response is okay (status in the range 200-299)
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Convert the response to JSON
        const data = await response.json();
        // Update the 'roomCode' state with the data received from the server
        setRoomCode(data.code);
      } catch (error) {
        // Handle any error that occurs during the fetch
        console.error("Failed to fetch data:", error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []); // Empty dependency array means this effect runs only once after initial render

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
        {/* Redirect to room page if roomCode exists if not render home page*/}
        <Route
          path="/"
          element={
            roomCode ? <Navigate to={`/room/${roomCode}`} /> : renderHomePage()
          }
        />
        {/* Routes for joining and creating rooms */}
        <Route path="/join" element={<RoomJoinPage />} />
        <Route path="/create" element={<CreateRoomPage />} />
        {/* Route to the room. The :roomCode means a placeholder for the room code parameter */}
        <Route path="/room/:roomCode" element={<Room />} />
      </Routes>
    </Router>
  );
};
export default HomePage;
