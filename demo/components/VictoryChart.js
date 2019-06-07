import React from "react";
import { VictoryChart, VictoryLine, VictoryAxis } from "victory";
import moment from "moment";

const VictoryChartRenderer = ({ data }) => (
  <VictoryChart padding={{ top: 20, bottom: 60, left: 40, right: 20 }}>
    <VictoryAxis
      dependentAxis
      style={{
        axis: { stroke: "#000" },
        tickLabels: {
          fontFamily: "arial",
          fontSize: "10px",
          padding: 5,
          textAnchor: "end"
        }
      }}
    />
    <VictoryAxis
      tickFormat={x => moment(new Date(x)).format("L")}
      style={{
        axis: { stroke: "#000" },
        tickLabels: {
          fontFamily: "arial",
          fontSize: "8px",
          angle: 35,
          padding: 3,
          textAnchor: "start"
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
