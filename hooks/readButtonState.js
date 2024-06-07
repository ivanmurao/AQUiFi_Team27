import { useEffect, useState } from "react";
import { off, onValue, ref } from "firebase/database";
import { db } from "@services/firebase/firebaseConfig";

export default function useButtonState() {
  const [buttonState, setButtonState] = useState(null);

  const buttonStateRef = ref(db, "BUTTON_STATE/");

  useEffect(() => {
    const buttonListener = onValue(buttonStateRef, (snapshot) => {
      setButtonState(snapshot.val());
    });

    return () => {
      off(buttonStateRef, "value", buttonListener);
    };
  }, []);

  return buttonState;
}
