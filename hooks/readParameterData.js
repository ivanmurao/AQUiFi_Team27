import { useEffect, useState } from "react";
import { get, limitToLast, orderByChild, query, ref } from "firebase/database";
import { db } from "@services/firebase/firebaseConfig";

const useParameterData = (path, parameter, refreshing) => {
  const [parameterValues, setParameterValues] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const SENSOR_PARAMETER_VALUE_COLLECTION = ref(db, path);

      const queryToday = query(
        SENSOR_PARAMETER_VALUE_COLLECTION,
        orderByChild("timestamp"),
        limitToLast(10)
      );

      const queryYesterday = query(
        SENSOR_PARAMETER_VALUE_COLLECTION,
        orderByChild("timestamp")
      );

      const queryOneWeekAgo = query(
        SENSOR_PARAMETER_VALUE_COLLECTION,
        orderByChild("timestamp")
      );

      try {
        const todaySnapshot = await get(queryToday);
        const yesterdaySnapshot = await get(queryYesterday);
        const oneWeekAgoSnapshot = await get(queryOneWeekAgo);

        const todayData = filterData(todaySnapshot, "TODAY", parameter);
        const yesterdayData = filterData(
          yesterdaySnapshot,
          "YESTERDAY",
          parameter
        );
        const oneWeekAgoData = filterData(
          oneWeekAgoSnapshot,
          "ONE_WEEK_AGO",
          parameter
        );

        setParameterValues([...todayData, ...yesterdayData, ...oneWeekAgoData]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [path, parameter, refreshing]);

  return parameterValues;
};

const filterData = (snapshot, interval, parameter) => {
  const data = [];

  if (!snapshot.exists()) {
    console.log("Snapshot is empty for", interval);
    return data;
  }

  snapshot.forEach((childSnapshot) => {
    const rawData = childSnapshot.val();
    const rawTimestamp = rawData.timestamp;
    const timestamp = new Date(rawTimestamp);

    const today = new Date();

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 7);

    if (
      (interval === "TODAY" && timestamp >= today) ||
      (interval === "YESTERDAY" &&
        timestamp >= yesterday &&
        timestamp < today) ||
      (interval === "ONE_WEEK_AGO" &&
        timestamp >= oneWeekAgo &&
        timestamp < yesterday)
    ) {
      const parameterValue = rawData[parameter];
      data.push({
        interval,
        x: formatTime(timestamp),
        y: parameterValue,
      });
    }
  });

  return data;
};

function formatTime(time) {
  if (!time) return "";
  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

export default useParameterData;
