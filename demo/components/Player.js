import React from "react";

const Player = ({ onPlay, onStop, isPlaying }) => {
  return (
    <>
      <button type="button" onClick={() => (isPlaying ? onStop() : onPlay())}>
        <span role="img" aria-label="play">
          ▶️
        </span>
        {isPlaying ? "Stop" : "Listen"}
      </button>
    </>
  );
};
export default Player;
