export default function phColorSelector(phValue) {
  let phColor;
  const flooredValue = Math.floor(phValue);

  if (flooredValue >= 10) {
    phColor = "#8A2BE2";
  } else if (flooredValue === 9) {
    phColor = "#0000FF";
  } else if (flooredValue === 8) {
    phColor = "#ADD8E6";
  } else if (flooredValue === 7) {
    phColor = "#008000";
  } else if (flooredValue === 6) {
    phColor = "#ADFF2F";
  } else if (flooredValue === 5) {
    phColor = "#FFFF00";
  } else if (flooredValue === 4) {
    phColor = "#FFA500";
  } else if (flooredValue <= 3) {
    phColor = "#FF5733";
  } else {
    phColor = "#7EA3CC"; // Default color
  }

  return phColor;
}
