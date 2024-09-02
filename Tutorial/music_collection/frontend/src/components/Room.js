import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Room = () => {
  const { roomCode } = useParams();

  const [state, setState] = useState({
    votesToSkip: 10,
    guestCanPause: false,
    isHost: true,
  });

  /**fetch details about a room from a backend API and update
   * the component's state with the retrieved data. */
  //
  useEffect(() => {
    //This ensures that getRoomDetails is called only when
    // the component mounts or when roomCode changes, preventing infinite loops.
    function getRoomDetails() {
      fetch("/api/get-room" + "?code=" + roomCode)
        .then((response) => response.json())
        .then((data) => {
          setState({
            votesToSkip: data.votes_to_skip,
            guestCanPause: data.guests_can_pause,
            isHost: data.is_host,
          });
        });
    }

    getRoomDetails();
  }, [roomCode]); // The effect will run when roomCode changes

  return (
    <div>
      <h3>{roomCode}</h3>
      <p>Votes: {state.votesToSkip}</p>
      <p>Guest Can Pause: {state.guestCanPause.toString()}</p>
      <p>Host: {state.isHost.toString()}</p>
    </div>
  );
};

export default Room;
