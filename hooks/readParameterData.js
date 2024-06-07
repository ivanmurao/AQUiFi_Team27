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

  const today = new Date();
  const startOfToday = new Date(today.setHours(0, 0, 0, 0));
  const endOfToday = new Date(today.setHours(23, 59, 59, 999));

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const startOfYesterday = new Date(yesterday.setHours(0, 0, 0, 0));
  const endOfYesterday = new Date(yesterday.setHours(23, 59, 59, 999));

  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(today.getDate() - 7);
  const startOfOneWeekAgo = new Date(oneWeekAgo.setHours(0, 0, 0, 0));
  const endOfOneWeekAgo = new Date(oneWeekAgo.setHours(23, 59, 59, 999));

  snapshot.forEach((childSnapshot) => {
    const rawData = childSnapshot.val();
    const rawTimestamp = childSnapshot.val().timestamp;
    const timestamp = new Date(rawTimestamp);

    if (
      (interval === "TODAY" &&
        timestamp >= startOfToday &&
        timestamp <= endOfToday) ||
      (interval === "YESTERDAY" &&
        timestamp >= startOfYesterday &&
        timestamp <= endOfYesterday) ||
      (interval === "ONE_WEEK_AGO" &&
        timestamp >= startOfOneWeekAgo &&
        timestamp <= endOfOneWeekAgo)
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
