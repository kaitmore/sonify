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
        {/* <span role="img" aria-label="play" style={{ padding: "8px" }}>
          &#9654;
        </span> */}
        {isPlaying ? "Stop" : "Listen"}
      </button>
    </div>
  );
};
export default Player;
