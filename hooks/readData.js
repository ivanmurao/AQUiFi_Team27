import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { app } from "@services/firebase/firebaseConfig";

export const useReadData = (selectedInterval, refreshing) => {
  const [phValues, setPHValues] = useState([]);

  // Initialize Firestore
  const db = getFirestore(app);

  // Firestore Collections
  const SENSOR_PH_VALUE_COLLECTION = collection(db, "SENSOR_PH_LEVEL_VALUES");

  useEffect(() => {
    let isMounted = true;

    async function fetchPHValues() {
      let phValuesQuery;
      if (selectedInterval === "All") {
        phValuesQuery = query(
          SENSOR_PH_VALUE_COLLECTION,
          orderBy("Timestamp", "desc")
        );
      } else {
        phValuesQuery = query(
          SENSOR_PH_VALUE_COLLECTION,
          orderBy("Timestamp", "desc"),
          limit(selectedInterval)
        );
      }

      if (!isMounted) return;

      const phValuesSnapshot = await getDocs(phValuesQuery);
      const phValues = phValuesSnapshot.docs.map((doc) => ({
        x: doc.data().Timestamp,
        y: doc.data().PHLevelValues,
      }));
      setPHValues(phValues);
    }

    fetchPHValues();

    return () => {
      isMounted = false;
    };
  }, [selectedInterval, refreshing]);

  return phValues;
};
