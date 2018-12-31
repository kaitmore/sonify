import React from "react";
import { Root, Routes } from "react-static";

import GithubCorner from "components/GithubCorner";

import "./app.css";

function App() {
  return (
    <Root>
      <GithubCorner />
      <Routes />
    </Root>
  );
}

export default App;
