import { getDatabase, ref, onValue } from "firebase/database";
import app from "./firebaseConfig";
import { useEffect, useState } from "react";

export default function useData(dataPath) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const db = getDatabase(app);
    const sensorRef = ref(db, "Sensor/Raw/");

    onValue(sensorRef, (snapshot) => {
      const dataValues = [];

      snapshot.forEach((sensorSnapshot) => {
        const rawDataValues = sensorSnapshot.child(dataPath).val();

        dataValues.push(rawDataValues);
      });

      const limitDataValues = dataValues.slice(-24);

      setData(limitDataValues);
    });
  }, []);

  return data;
}
