import { useEffect, useState } from "react";
import { onValue, ref, off } from "firebase/database";
import { db } from "@services/firebase/firebaseConfig.js";

const useGaugeData = () => {
  const [phValue, setPhValue] = useState(8);
  const [turbidityValue, setTurbValue] = useState(0);

  useEffect(() => {
    const phSensorRef = ref(db, "PH_GAUGE_VALUE");
    const turbSensorRef = ref(db, "TURBIDITY_GAUGE_VALUE");

    const phListener = onValue(phSensorRef, (snapshot) => {
      setPhValue(snapshot.val());
    });

    const turbListener = onValue(turbSensorRef, (snapshot) => {
      setTurbValue(snapshot.val());
    });

    // Cleanup function to remove listeners when the component unmounts
    return () => {
      off(phSensorRef, "value", phListener);
      off(turbSensorRef, "value", turbListener);
    };
  }, []);

  return { phValue, turbidityValue };
};

export default useGaugeData;
