import { useEffect, useState } from "react";
import { get, limitToLast, orderByChild, query, ref } from "firebase/database";
import { db } from "@services/firebase/firebaseConfig";

const useParameterData = (path, parameter, refreshing) => {
  const [parameterValues, setParameterValues] = useState([]);

  useEffect(() => {
    // Firestore Collections
    const SENSOR_PARAMETER_VALUE_COLLECTION = ref(db, path);

    const queryParameterValues = query(
      SENSOR_PARAMETER_VALUE_COLLECTION,
      orderByChild("timestamp"),
      limitToLast(10)
    );

    // Only Once
    get(queryParameterValues).then((snapshot) => {
      const rawParameterValues = [];

      snapshot.forEach((childSnapshot) => {
        const rawData = childSnapshot.val();
        const parameterValue = rawData[parameter];
        const rawTimestamp = childSnapshot.val().timestamp;
        const timestamp = new Date(rawTimestamp);

        rawParameterValues.push({
          x: formatTime(timestamp),
          y: parameterValue,
        });
      });
      setParameterValues(rawParameterValues);
    });
  }, [refreshing]);

  return parameterValues;
};

export default useParameterData;

function formatTime(time) {
  if (!time) return "";
  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}
