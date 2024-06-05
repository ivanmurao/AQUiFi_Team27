export default function turbidityColorSelector(turbidityValue) {
  let turbidityColor;
  const flooredValue = Math.floor(turbidityValue);

  if (flooredValue >= 10) {
    turbidityColor = "#FF5733";
  } else if (flooredValue >= 7 && flooredValue <= 9) {
    turbidityColor = "#FFA500";
  } else if (flooredValue === 6) {
    turbidityColor = "#FFFF00";
  } else if (flooredValue === 5) {
    turbidityColor = "#ADFF2F";
  } else if (flooredValue === 4) {
    turbidityColor = "#008000";
  } else if (flooredValue === 3) {
    turbidityColor = "#ADD8E6";
  } else if (flooredValue === 2) {
    turbidityColor = "#0000FF";
  } else if (flooredValue <= 1) {
    turbidityColor = "#8A2BE2";
  } else {
    turbidityColor = "#7EA3CC"; // Default color
  }

  return turbidityColor;
}
