import React from "react";
import { StyleSheet, View } from "react-native";
import {
  VictoryLine,
  VictoryLabel,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
} from "victory-native";

const LineGraph = ({
  data,
  tickValues,
  domain,
  xlabel,
  ylabel,
  time,
  value,
}) => {
  return (
    <View style={styles.container}>
      <VictoryChart theme={VictoryTheme.material} width={350} height={300}>
        <VictoryLabel
          text="Real-time Data"
          x={190}
          y={30}
          textAnchor="middle"
          style={{ fontSize: 16, fontWeight: "bold" }}
        />
        <VictoryLine animate data={data} x={time} y={value} />
        <VictoryAxis crossAxis style={styles.xAxisStyle} label={xlabel} />
        <VictoryAxis
          dependentAxis
          style={styles.yAxisStyle}
          tickValues={tickValues}
          domain={domain}
          label={ylabel}
        />
      </VictoryChart>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  yAxisStyle: {
    grid: { stroke: "transparent" },
    axisLabel: { padding: 25, fontSize: 13, fontWeight: "bold" },
  },
  xAxisStyle: {
    grid: { stroke: "transparent" },
    axisLabel: { padding: 38, fontSize: 13, fontWeight: "bold" },
    tickLabels: { angle: -45 },
  },
});

export default LineGraph;
