import React from "react";

import GithubCorner from "../components/GithubCorner";

import Editor from "../components/Editor";
import "../style/style.css";

const data = [
  [1536969666906, 1],
  [1546969674206, 2],
  [1596966695555, 4.3],
  [1666959697655, 0],
  [1576669693906, 3],
  [1586769694206, 3.4],
  [1597969694206, 6],
  [1599969694206, 5],
  [1600969694206, 4],
  [1619696669036, 3],
  [1626969674106, 1.2],
  [1636966695255, 4.3],
  [1646959697645, 2.3],
  [1656669693506, 3],
  [1666769694216, 3.4],
  [1677969689206, 6],
  [1689696242486, 2],
  [1798869694236, 0.05]
];

export default () => (
  <div
    style={{
      textAlign: "center",
      height: "100%",
      display: "flex"
    }}
  >
    <GithubCorner />
    <Editor />
  </div>
);
