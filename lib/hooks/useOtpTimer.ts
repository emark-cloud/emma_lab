"use client";

import { useEffect, useRef, useState } from "react";

/* OTP countdown timer. start() (re)starts the clock at `seconds` and
   counts down to zero. Returns secondsLeft + a `canResend` flag. */
export function useOtpTimer(initialSeconds = 60) {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const intervalRef = useRef<number | null>(null);

  function clear() {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  function start(seconds = initialSeconds) {
    clear();
    setSecondsLeft(seconds);
    intervalRef.current = window.setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clear();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  }

  useEffect(() => () => clear(), []);

  return { secondsLeft, start, canResend: secondsLeft === 0 };
}
