import React from "react";

const Player = ({ onPlay, onStop, isPlaying }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center"
      }}
    >
      <h1>sonify demo</h1>
      <button type="button" onClick={() => (isPlaying ? onStop() : onPlay())}>
        {isPlaying ? "Stop" : "Listen"}
      </button>
    </div>
  );
};
export default Player;
