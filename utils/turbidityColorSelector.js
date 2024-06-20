export default function turbidityColorSelector(turbidityValue) {
  let turbidityColor;
  const flooredValue = Math.floor(turbidityValue);

  if (flooredValue >= 10) {
    turbidityColor = "#BB8E4D";
  } else if (flooredValue === 9) {
    turbidityColor = "#C7A26B";
  } else if (flooredValue === 8) {
    turbidityColor = "#D3B589";
  } else if (flooredValue === 7) {
    turbidityColor = "#DABF9E";
  } else if (flooredValue === 6) {
    turbidityColor = "#E2D0B0";
  } else if (flooredValue === 5) {
    turbidityColor = "#EADDC4";
  } else if (flooredValue === 4) {
    turbidityColor = "#F2EBDA";
  } else if (flooredValue === 3) {
    turbidityColor = "#F7F5E5";
  } else if (flooredValue === 2) {
    turbidityColor = "#FFFEF7";
  } else if (flooredValue <= 1) {
    turbidityColor = "#FFFFFF";
  } else {
    turbidityColor = "#FFFFFF"; // Default color
  }

  return turbidityColor;
}
