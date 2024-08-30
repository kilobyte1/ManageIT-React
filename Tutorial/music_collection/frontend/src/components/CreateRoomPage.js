import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link } from "react-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default class CreateRoomPage extends Component {
  defaltVotes = 2;
  constructor(props) {
    super(props);
    this.tsate = {
      geustCanPause: true,
      voteToSkip: this.defaltVotes,
    };
    this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this);
  }

  handleVotesChange(e) {
    this.setState({ voteToSkip: e.target.value });
  }

  handleGuestCanPauChange(e) {
    this.setState({
      geustCanPause: e.target.value === "true" ? true : false,
    });
  }
  handleRoomButtonPressed() {
    console.log(this.state);
  }

  render() {
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
              onChange={this.handleGuestCanPauChange}
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
              onChange={this.handleVotesChange}
              defaultValue={this.defaultVotes}
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
        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={this.handleRoomButtonPressed}
          >
            Create A Room
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" to="" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    );
  }
}
