import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import app from "@services/firebase/firebaseConfig";

export default function useData(dataPath) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      const db = getDatabase(app);
      const sensorRef = ref(db, "Sensor/Raw/");

      try {
        const snapshot = onValue(sensorRef);
        const dataValues = [];

        snapshot.forEach((sensorSnapshot) => {
          const rawData = sensorSnapshot.child(dataPath).val();
          if (rawData) {
            dataValues.push(rawData);
          }
        });

        const limitDataValues = dataValues.slice(-1);
        setData(limitDataValues);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Initial fetch

    // Subscribe to changes
    const unsubscribe = onValue(sensorRef, fetchData, {
      onlyOnce: false, // Listen for continuous updates
    });

    return () => {
      // Unsubscribe when component unmounts
      unsubscribe();
    };
  }, [dataPath]); // Re-run effect when dataPath changes

  return { data, loading };
}
