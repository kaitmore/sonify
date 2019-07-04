import React from "react";
import { VictoryChart, VictoryLine, VictoryAxis } from "victory";
import moment from "moment";

const VictoryChartRenderer = ({ data }) => (
  <VictoryChart padding={{ top: 20, bottom: 60, left: 40, right: 20 }}>
    <VictoryAxis
      dependentAxis
      style={{
        axis: { stroke: "rgb(214, 222, 235)" },
        tickLabels: {
          fontFamily: "arial",
          fontSize: "6px",
          padding: 5,
          textAnchor: "end",
          fill: "rgb(214, 222, 235)"
        }
      }}
    />
    <VictoryAxis
      tickFormat={x => moment(new Date(x)).format("L")}
      style={{
        axis: { stroke: "rgb(214, 222, 235)" },
        tickLabels: {
          fontFamily: "arial",
          fontSize: "6px",
          angle: 35,
          padding: 3,
          textAnchor: "start",
          fill: "rgb(214, 222, 235)"
        }
      }}
    />
    <VictoryLine
      style={{
        data: { stroke: "#c43a31" },
        parent: { border: "1px solid #ccc" }
      }}
      data={data.map(([x, y]) => ({ x, y }))}
    />
  </VictoryChart>
);

export default VictoryChartRenderer;
