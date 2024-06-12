import { useEffect, useState } from "react";
import { onValue, ref, off } from "firebase/database";
import { db } from "@services/firebase/firebaseConfig.js";

const useGaugeData = (dataType) => {
  const [phValue, setPhValue] = useState(8);
  const [turbidityValue, setTurbValue] = useState(0);

  useEffect(() => {
    const phSensorRef = ref(db, `PH_${dataType}`);
    const turbSensorRef = ref(db, `TURBIDITY_${dataType}`);

    const phListener = onValue(
      phSensorRef,
      (snapshot) => {
        const value = snapshot.val();
        if (value !== null) {
          setPhValue(value);
        } else {
          console.error("Issues with the database");
          setPhValue(8); // or any default value
        }
      },
      (error) => {
        console.error("Issues with the database:", error);
      }
    );

    const turbListener = onValue(
      turbSensorRef,
      (snapshot) => {
        const value = snapshot.val();
        if (value !== null) {
          setTurbValue(value);
        } else {
          console.error("Issues with the database");
          setTurbValue(0); // or any default value
        }
      },
      (error) => {
        console.error("Issues with the database", error);
      }
    );

    // Cleanup function to remove listeners when the component unmounts
    return () => {
      off(phSensorRef, "value", phListener);
      off(turbSensorRef, "value", turbListener);
    };
  }, []);

  return { phValue, turbidityValue };
};

export default useGaugeData;
