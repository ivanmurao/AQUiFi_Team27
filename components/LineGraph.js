import React from "react";
import { StyleSheet, View } from "react-native";
import {
  VictoryLine,
  VictoryLabel,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryZoomContainer,
} from "victory-native";

const LineGraph = ({
  title,
  data,
  tickValues,
  domain,
  xlabel,
  ylabel,
  time,
  value,
}) => {
  return (
    <VictoryChart
      theme={VictoryTheme.material}
      width={350}
      height={300}
      containerComponent={
        <VictoryZoomContainer allowZoom={false} zoomDomain={{ x: [1, 6] }} />
      }
    >
      <VictoryLabel
        text={title}
        x={190}
        y={30}
        textAnchor="middle"
        style={{ fontSize: 16, fontWeight: "bold" }}
      />
      <VictoryLine data={data} x={time} y={value} />
      <VictoryAxis
        crossAxis
        style={styles.xAxisStyle}
        label={xlabel}
        // tickFormat={() => ""}
      />
      <VictoryAxis
        dependentAxis
        style={styles.yAxisStyle}
        tickValues={tickValues}
        domain={domain}
        label={ylabel}
      />
    </VictoryChart>
  );
};

const styles = StyleSheet.create({
  yAxisStyle: {
    grid: { stroke: "transparent" },
    axisLabel: { padding: 25, fontSize: 13, fontWeight: "bold" },
  },
  xAxisStyle: {
    grid: { stroke: "transparent" },
    axisLabel: { padding: 25, fontSize: 13, fontWeight: "bold" },
    tickLabels: { /*angle: -90,*/ fontSize: 12, padding: 5 },
  },
});

export default LineGraph;
