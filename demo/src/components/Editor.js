import React from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import Sonify from "sonify";
import VictoryChart from "./VictoryChart";
import Player from "./Player";

const scope = { Sonify, VictoryChart, Player };

const code = `
function Example (){
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

    const Sonifier = new Sonify(data, 10, {
      pitches: ["A", "C#", "E", "G#", "B"],
      octaves: 2,
      baseOctave: 4,
      glissando: true,
      staticRhythm: false
    });
console.log(Sonifier.context)
    return (
        <>
            <Player 
                onPlay={() => Sonifier.play()}
                onStop={() => Sonifier.stop()} 
                isPlaying={Sonifier.context.state === "running"} 
            />
            <VictoryChart data={data} />
        </>
    )

}
`;

const Editor = () => (
  <LiveProvider code={code} scope={scope}>
    <LiveEditor />
    <LiveError />
    <LivePreview />
  </LiveProvider>
);

export default Editor;
