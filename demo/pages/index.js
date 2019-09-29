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

      <script
        type="text/javascript"
        src="https://cdnjs.cloudflare.com/ajax/libs/tone/13.8.17/Tone.js"
      ></script>
    </Head>
    <GithubCorner />
    <Editor />
  </div>
);
