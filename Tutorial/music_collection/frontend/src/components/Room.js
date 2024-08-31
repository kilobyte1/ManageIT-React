import React from "react";
import { useParams } from "react-router-dom";

const Room = () => {
  const { roomCode } = useParams();

  const [state, setState] = React.useState({
    votesToSkip: 2,
    guestCanPause: false,
    isHost: false,
  });

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
