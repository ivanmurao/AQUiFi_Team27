import { getDatabase, ref, onValue } from "firebase/database";
import app from "./firebaseConfig";
import { useEffect, useState } from "react";

export default function useForecastedData(forecastedDataPath) {
  const [forecastedData, setForecastedData] = useState([]);

  useEffect(() => {
    const db = getDatabase(app);
    const forecastedRef = ref(db, "Sensor/Forecasted/");

    onValue(forecastedRef, (snapshot) => {
      const forecastedDataValues = [];

      snapshot.forEach((forecastedSnapshot) => {
        const rawForecastedDataValues = forecastedSnapshot
          .child(forecastedDataPath)
          .val();

        forecastedDataValues.push(rawForecastedDataValues);
      });

      const limitForecastedDataValues = forecastedDataValues.slice(-6);

      setForecastedData(limitForecastedDataValues);
    });
  }, []);

  return forecastedData;
}
