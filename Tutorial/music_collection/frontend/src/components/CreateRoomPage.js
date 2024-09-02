import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link, useNavigate } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const CreateRoomPage = () => {
  const defaultVotes = 2;
  // Use useNavigate hook for navigation
  const navigate = useNavigate();

  // Use useState hook for managing state
  const [guestCanPause, setGuestCanPause] = useState(true);
  const [voteToSkip, setVoteToSkip] = useState(defaultVotes);

  // Handle the change in votes input
  const handleVotesChange = (e) => {
    setVoteToSkip(e.target.value);
  };

  // Handle the change in guest can pause radio button
  const handleGuestCanPauseChange = (e) => {
    setGuestCanPause(e.target.value === "true");
  };

  // Handle form submission
  const handleRoomButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: voteToSkip,
        guests_can_pause: guestCanPause,
      }),
    };

    // Make the API call and navigate to the new room
    fetch("/api/create-room", requestOptions)
      .then((response) => response.json())
      .then((data) => navigate("/room/" + data.code));
  };

  return (
    <Grid container spacing={1}>
      {/* Grid item for the header */}
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          Create a room
        </Typography>
      </Grid>

      {/* Grid item for guest control radio buttons */}
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText>
            <div align="center">Guest Control of Playback</div>
          </FormHelperText>
          <RadioGroup
            row
            defaultValue="true"
            onChange={handleGuestCanPauseChange}
          >
            {/* Option for guests to control Play/Pause */}
            <FormControlLabel
              value="true"
              control={<Radio color="primary" />}
              label="Play/Pause"
              labelPlacement="bottom"
            />
            {/* Option for guests to have no control */}
            <FormControlLabel
              value="false"
              control={<Radio color="secondary" />}
              label="No control"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
      </Grid>

      {/* Grid item for setting the number of votes required to skip a song */}
      <Grid item xs={12} align="center">
        <FormControl>
          {/* Text field to input the number of votes */}
          <TextField
            required={true}
            type="number"
            onChange={handleVotesChange}
            defaultValue={defaultVotes}
            inputProps={{
              min: 1,
              style: { textAlign: "center" },
            }}
          />
          <FormHelperText align="center">
            Votes required to skip song
          </FormHelperText>
        </FormControl>
      </Grid>

      {/* Grid item for Create Room button */}
      <Grid item xs={12} align="center">
        <Button
          color="primary"
          variant="contained"
          onClick={handleRoomButtonPressed}
        >
          Create A Room
        </Button>
      </Grid>

      {/* Grid item for Back button */}
      <Grid item xs={12} align="center">
        <Button color="secondary" variant="contained" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  );
};

export default CreateRoomPage;
