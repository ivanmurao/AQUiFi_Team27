import { getDatabase, ref, onValue } from "firebase/database";
import app from "./firebaseConfig";
import { useEffect, useState } from "react";

export default function useData(timestampPath, valuePath) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const db = getDatabase(app);
    const sensorRef = ref(db, "Sensor/Raw/");

    onValue(sensorRef, (snapshot) => {
      const dataValues = [];

      snapshot.forEach((sensorSnapshot) => {
        const rawTimestamp = sensorSnapshot.child(timestampPath).val();
        const rawPHLevel = sensorSnapshot.child(valuePath).val();
        const time = new Date(rawTimestamp);

        const hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();

        const dataDict = { x: `${hours}:${minutes}:${seconds}`, y: rawPHLevel };

        dataValues.push(dataDict);
      });
      const limitDataValues = dataValues.slice(-6);

      setData(limitDataValues);
    });
  }, []);

  return data;
}
