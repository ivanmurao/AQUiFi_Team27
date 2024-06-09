import { useEffect, useState } from "react";
import { off, onValue, ref } from "firebase/database";
import { db } from "@services/firebase/firebaseConfig";

export default function useButtonState() {
  const [buttonState, setButtonState] = useState(null);

  const buttonStateRef = ref(db, "BUTTON_STATE/");

  useEffect(() => {
    const buttonListener = onValue(
      buttonStateRef,
      (snapshot) => {
        const value = snapshot.val();
        if (value !== null) {
          setButtonState(value);
        } else {
          console.error("Issues with the database");
          setButtonState(null);
        }
      },
      (error) => {
        console.error("Issues with the database:", error);
      }
    );

    return () => {
      off(buttonStateRef, "value", buttonListener);
    };
  }, []);

  return buttonState;
}
