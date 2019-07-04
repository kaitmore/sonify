import React from "react";
import Head from "next/head";

import GithubCorner from "../components/GithubCorner";
import Editor from "../components/Editor";
import "../style/style.css";

export default () => (
  <div
    style={{
      textAlign: "center",
      height: "100%",
      display: "flex"
    }}
  >
    <Head>
      <title>Sonify Demo</title>
    </Head>
    <GithubCorner />
    <Editor />
  </div>
);
