import { useEffect, useState, useRef } from "react";

import type { useTimerProps } from "../types/useTimer";

export function useTimer(props: useTimerProps) {
  const { focus, shortBreak, longBreak, cycle } = props;

  useEffect(() => {
    setFocusSeconds(focus);
    setShortBreakSeconds(shortBreak);
    setLongBreakSeconds(longBreak);
  }, [focus, shortBreak, longBreak]);

  const [focusSeconds, setFocusSeconds] = useState(focus);
  const [shortBreakSeconds, setShortBreakSeconds] = useState(shortBreak);
  const [longBreakSeconds, setLongBreakSeconds] = useState(longBreak);

  const [totalTime, setTotalTime] = useState(0);
  const [activeTime, setActiveTime] = useState(0);
  const [completedCycle, setCompletedCycle] = useState(0);

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setseconds] = useState(0);
  const [timerStatus, setTimerStatus] = useState("");
  const [timerMode, setTimerMode] = useState("");

  const intervalID = useRef<number | undefined>(undefined);
  const cycleCountRef = useRef<number>(0);

  useEffect(() => {
    switch (timerMode) {
      case "timerModeFocus":
        setTotalTime(0);
        stopTime(intervalID.current);
        focusTime();
        break;
      case "timerModeShort":
        setTotalTime(0);
        stopTime(intervalID.current);
        shortBreakTime();
        break;
      case "timerModeLong":
        setTotalTime(0);
        stopTime(intervalID.current);
        longBreakTime();
        break;

      default:
        break;
    }
  }, [timerMode]);

  const timerFormat = (
    valueSeconds: number,
    tempoBreak: number,
    timerStatus: string,
  ) => {
    setActiveTime(tempoBreak);
    setTimerStatus(timerStatus);

    const hoursCalculadas = Math.floor(valueSeconds / 3600);
    const minutesCalculados = Math.floor((valueSeconds % 3600) / 60);
    const secondsCalculados = valueSeconds % 60;

    setHours(hoursCalculadas);
    setMinutes(minutesCalculados);
    setseconds(secondsCalculados);
  };

  const focusTime = () => {
    timerFormat(focusSeconds, focus, "Focus");

    var hoursCalculadas = Math.floor(focusSeconds / 3600);
    var minutesCalculados = Math.floor((focusSeconds % 3600) / 60);
    var secondsCalculados = focusSeconds % 60;
    var secondsLeft = focusSeconds;

    intervalID.current = setInterval(() => {
      if (
        !(hoursCalculadas > 0) &&
        !(minutesCalculados > 0) &&
        !(secondsCalculados > 0)
      ) {
        stopTime(intervalID.current);
        return;
      }

      if (secondsCalculados <= 0) {
        secondsCalculados = 60;
        minutesCalculados--;
      }

      if (minutesCalculados <= 0 && hoursCalculadas > 0) {
        minutesCalculados = 59;
        secondsCalculados = 60;
        hoursCalculadas--;
      }

      setTotalTime((prevtotalTime) => prevtotalTime + 1);
      secondsCalculados--;
      secondsLeft--;

      if (
        minutesCalculados <= 0 &&
        secondsCalculados <= 0 &&
        cycleCountRef.current < cycle
      ) {
        setFocusSeconds(focus);
        cycleCountRef.current = cycleCountRef.current + 1;
        setCompletedCycle((prevCiclo) => prevCiclo + 1);
        setTotalTime(0);
        stopTime(intervalID.current);
        setTimerMode("timerModeShort");
        return;
      }

      if (
        minutesCalculados <= 0 &&
        secondsCalculados <= 0 &&
        cycleCountRef.current === cycle
      ) {
        cycleCountRef.current = 0;
        setFocusSeconds(focus);
        setTotalTime(0);
        stopTime(intervalID.current);
        setTimerMode("timerModeLong");
        return;
      }

      setFocusSeconds(secondsLeft);
      setHours(hoursCalculadas);
      setMinutes(minutesCalculados);
      setseconds(secondsCalculados);
    }, 1000);
  };

  const shortBreakTime = () => {
    timerFormat(shortBreakSeconds, shortBreak, "ShortBreak");

    var hoursCalculadas = Math.floor(shortBreakSeconds / 3600);
    var minutesCalculados = Math.floor((shortBreakSeconds % 3600) / 60);
    var secondsCalculados = shortBreakSeconds % 60;
    var secondsLeft = shortBreakSeconds;

    intervalID.current = setInterval(() => {
      if (
        !(hoursCalculadas > 0) &&
        !(minutesCalculados > 0) &&
        !(secondsCalculados > 0)
      ) {
        stopTime(intervalID.current);
        return;
      }

      if (secondsCalculados <= 0) {
        secondsCalculados = 60;
        minutesCalculados--;
      }

      if (minutesCalculados <= 0 && hoursCalculadas > 0) {
        minutesCalculados = 59;
        secondsCalculados = 60;
        hoursCalculadas--;
      }

      setTotalTime((prevtotalTime) => prevtotalTime + 1);
      secondsCalculados--;
      secondsLeft--;

      if (secondsCalculados <= 0 && minutesCalculados <= 0) {
        secondsLeft = shortBreak;
        stopTime(intervalID.current);
        setTimerMode("timerModeFocus");
      }

      setShortBreakSeconds(secondsLeft);
      setHours(hoursCalculadas);
      setMinutes(minutesCalculados);
      setseconds(secondsCalculados);
    }, 1000);
  };

  const longBreakTime = () => {
    timerFormat(longBreakSeconds, longBreak, "LongBreak");

    var hoursCalculadas = Math.floor(longBreakSeconds / 3600);
    var minutesCalculados = Math.floor((longBreakSeconds % 3600) / 60);
    var secondsCalculados = longBreakSeconds % 60;
    var secondsLeft = longBreakSeconds;

    intervalID.current = setInterval(() => {
      if (
        !(hoursCalculadas > 0) &&
        !(minutesCalculados > 0) &&
        !(secondsCalculados > 0)
      ) {
        stopTime(intervalID.current);
        return;
      }

      if (secondsCalculados <= 0) {
        secondsCalculados = 60;
        minutesCalculados--;
      }

      if (minutesCalculados <= 0 && hoursCalculadas > 0) {
        minutesCalculados = 59;
        secondsCalculados = 60;
        hoursCalculadas--;
      }

      setTotalTime((prevtotalTime) => prevtotalTime + 1);
      secondsCalculados--;
      secondsLeft--;

      if (secondsCalculados <= 0 && minutesCalculados <= 0) {
        setCompletedCycle(0);
        secondsLeft = longBreak;
        stopTime(intervalID.current);
        setTimerMode("timerModeFocus");
      }

      setLongBreakSeconds(secondsLeft);
      setHours(hoursCalculadas);
      setMinutes(minutesCalculados);
      setseconds(secondsCalculados);
    }, 1000);
  };

  const startTime = () => {
    if (intervalID.current) return;
    switch (activeTime) {
      case focus:
        focusTime();
        break;

      case shortBreak:
        shortBreakTime();
        break;

      case longBreak:
        longBreakTime();
        break;

      default:
        break;
    }
  };

  const stopTime = (interval: number | undefined = intervalID.current) => {
    clearInterval(interval);
    intervalID.current = undefined;
  };

  const resetTime = () => {
    cycleCountRef.current = 0;
    setTimerMode("");
    setCompletedCycle(0);
    setTotalTime(0);
    setFocusSeconds(focus);
    stopTime(intervalID.current);
    timerFormat(focus, focus, "Focus");
  };

  return {
    startTime,
    timerFormat,
    stopTime,
    resetTime,
    activeTime,
    totalTime,
    completedCycle,
    timerStatus,
    hours,
    minutes,
    seconds,
  };
}
