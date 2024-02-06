import React from "react";
import { StyleSheet, View } from "react-native";
import {
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
} from "victory-native";

const LineGraph = ({ data, tickValues, domain, xlabel, ylabel }) => {
  return (
    <View style={styles.container}>
      <VictoryChart theme={VictoryTheme.material} width={380} height={330}>
        <VictoryLine animate data={data} />
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
    axisLabel: { padding: 28, fontSize: 13, fontWeight: "bold" },
  },
  xAxisStyle: {
    grid: { stroke: "transparent" },
    tickLabels: { fontSize: 0, padding: 0 },
    axisLabel: { padding: 28, fontSize: 13, fontWeight: "bold" },
  },
});

export default LineGraph;
