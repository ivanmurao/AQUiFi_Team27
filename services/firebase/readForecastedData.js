import { getDatabase, ref, onValue } from "firebase/database";
import app from "./firebaseConfig";
import { useEffect, useState } from "react";

export default function useForecastedData(timestampPath, valuePath) {
  const [forecastedData, setForecastedData] = useState([]);

  useEffect(() => {
    const db = getDatabase(app);
    const forecastedRef = ref(db, "Sensor/Forecasted/");

    onValue(forecastedRef, (snapshot) => {
      const forecastedDataValues = [];

      snapshot.forEach((forecastedSnapshot) => {
        const rawTimestamp = forecastedSnapshot.child(timestampPath).val();
        const rawPHLevel = forecastedSnapshot.child(valuePath).val();
        const time = new Date(rawTimestamp);

        const hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();

        const dataDict = { x: `${hours}:${minutes}:${seconds}`, y: rawPHLevel };

        forecastedDataValues.push(dataDict);
      });

      const limitForecastedDataValues = forecastedDataValues.slice(-6);

      setForecastedData(limitForecastedDataValues);
    });
  }, []);

  return forecastedData;
}
