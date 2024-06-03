import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import app from "@services/firebase/firebaseConfig";

export default function useData(timestampPath, valuePath) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const db = getDatabase(app);
      const sensorRef = ref(db, "Sensor/Raw/");

      onValue(sensorRef, (snapshot) => {
        const dataValues = [];

        snapshot.forEach((sensorSnapshot) => {
          const rawTimestamp = sensorSnapshot.child(timestampPath).val();
          const rawPHLevel = sensorSnapshot.child(valuePath).val();
          const time = new Date(rawTimestamp);

          const dataPoint = { x: formatTime(time), y: rawPHLevel };
          dataValues.push(dataPoint);
        });

        const limitDataValues = dataValues.slice(-6);
        setData(limitDataValues);
      }, (error) => {
        console.error("Error fetching data:", error);
      });
    };

    fetchData(); // Initial fetch

    // Subscribe to changes
    const unsubscribe = onValue(ref(getDatabase(app), "Sensor/Raw/"), fetchData);

    return () => {
      // Unsubscribe when component unmounts
      unsubscribe();
    };
  }, [timestampPath, valuePath]);

  return data;
}

function formatTime(time) {
  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}
