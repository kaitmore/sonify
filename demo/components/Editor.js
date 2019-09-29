import React from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import Sonify from "sonify";
import VictoryChart from "./VictoryChart";
import Player from "./Player";

const scope = { React, Sonify, VictoryChart, Player };

const code = `
class Example extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
        isPlaying: false
    }

  }

  render() {
    const data = [
      [1536969666906, 22],
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

    const Sonifier = new Sonify({
        data, 
        songLength: 10,
        pitches: ["A", "C#", "E", "G#", "B"],
        octaveRange: 2,
        volume: 0.01,
        baseOctave: 4,
        glissando: true,
        staticRhythm: false,
        onEnded: () => this.setState({ isPlaying: false })
    });

    return <>
            <Player
                onPlay={() => {
                    Sonifier.play();
                    this.setState({ isPlaying: true })
                    }
                }
                onStop={() =>  { Sonifier.stop();
                    this.setState({ isPlaying: false })
                    }}
                isPlaying={this.state.isPlaying}
            />
            <VictoryChart data={data} />
       </>
  }
}
`;

const Editor = () => (
  <LiveProvider
    code={code}
    scope={scope}
    id="editor"
    theme={{
      plain: {
        color: "#d6deeb",
        backgroundColor: "#011627"
      },
      styles: [
        {
          types: ["changed"],
          style: {
            color: "rgb(162, 191, 252)",
            fontStyle: "italic"
          }
        },
        {
          types: ["deleted"],
          style: {
            color: "rgba(239, 83, 80, 0.56)",
            fontStyle: "italic"
          }
        },
        {
          types: ["inserted", "attr-name"],
          style: {
            color: "rgb(173, 219, 103)",
            fontStyle: "italic"
          }
        },
        {
          types: ["comment"],
          style: {
            color: "rgb(99, 119, 119)",
            fontStyle: "italic"
          }
        },
        {
          types: ["string", "url"],
          style: {
            color: "rgb(173, 219, 103)"
          }
        },
        {
          types: ["variable"],
          style: {
            color: "rgb(214, 222, 235)"
          }
        },
        {
          types: ["number"],
          style: {
            color: "rgb(247, 140, 108)"
          }
        },
        {
          types: ["builtin", "char", "constant", "function"],
          style: {
            color: "rgb(130, 170, 255)"
          }
        },
        {
          // This was manually added after the auto-generation
          // so that punctuations are not italicised
          types: ["punctuation"],
          style: {
            color: "rgb(199, 146, 234)"
          }
        },
        {
          types: ["selector", "doctype"],
          style: {
            color: "rgb(199, 146, 234)",
            fontStyle: "italic"
          }
        },
        {
          types: ["class-name"],
          style: {
            color: "rgb(255, 203, 139)"
          }
        },
        {
          types: ["tag", "operator", "keyword"],
          style: {
            color: "rgb(127, 219, 202)"
          }
        },
        {
          types: ["boolean"],
          style: {
            color: "rgb(255, 88, 116)"
          }
        },
        {
          types: ["property"],
          style: {
            color: "rgb(128, 203, 196)"
          }
        },
        {
          types: ["namespace"],
          style: {
            color: "rgb(178, 204, 214)"
          }
        }
      ]
    }}
  >
    <LiveEditor
      style={{ minWidth: "500px", outline: "none", overflow: "scroll" }}
    />
    <LiveError
      style={{
        whiteSpace: "pre-line",
        width: "100%"
      }}
    />
    <LivePreview style={{ width: "100%", height: "100%" }} />
  </LiveProvider>
);

export default Editor;
