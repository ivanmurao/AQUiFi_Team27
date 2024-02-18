import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import app from "./firebaseConfig";

export default function useForecastedData(timestampPath, valuePath) {
  const [forecastedData, setForecastedData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const db = getDatabase(app);
      const forecastedRef = ref(db, "Sensor/Forecasted/");

      onValue(forecastedRef, (snapshot) => {
        const forecastedDataValues = [];

        snapshot.forEach((forecastedSnapshot) => {
          const rawTimestamp = forecastedSnapshot.child(timestampPath).val();
          const rawPHLevel = forecastedSnapshot.child(valuePath).val();
          if (rawTimestamp && rawPHLevel) {
            const time = new Date(rawTimestamp);
            const dataPoint = {
              x: formatTime(time),
              y: rawPHLevel
            };
            forecastedDataValues.push(dataPoint);
          }
        });

        const limitForecastedDataValues = forecastedDataValues.slice(-24);
        setForecastedData(limitForecastedDataValues);
      }, (error) => {
        console.error("Error fetching forecasted data:", error);
      });
    };

    fetchData(); // Initial fetch

    // Subscribe to changes
    const unsubscribe = onValue(ref(getDatabase(app), "Sensor/Forecasted/"), fetchData);

    return () => {
      // Unsubscribe when component unmounts
      unsubscribe();
    };
  }, [timestampPath, valuePath]);

  return forecastedData;
}

function formatTime(time) {
  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}
