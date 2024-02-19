import React from "react";
import { StyleSheet, View } from "react-native";
import {
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
} from "victory-native";

const ForecastedLineGraph = ({
  data,
  tickValues,
  domain,
  ylabel,
  xlabel,
  time,
  value,
}) => {
  return (
    <View style={styles.container}>
      <VictoryChart theme={VictoryTheme.material} width={350} height={300}>
        <VictoryLabel
          text="Forecast Data"
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
    paddingTop: 10,
  },
  yAxisStyle: {
    grid: { stroke: "transparent" },
    axisLabel: { padding: 28, fontSize: 13, fontWeight: "bold" },
  },
  xAxisStyle: {
    grid: { stroke: "transparent" },
    // tickLabels: { fontSize: 0, padding: 0 },
    axisLabel: { padding: 10/*38*/, fontSize: 13, fontWeight: "bold" },
    tickLabels: { angle: -45, fontSize: 0, padding: 0 },
  },
});

export default ForecastedLineGraph;
