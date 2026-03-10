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
  const [timeBreak, setTimeBreak] = useState(0);
  const [completedCycle, setCompletedCycle] = useState(0);

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setseconds] = useState(0);
  const [timerStatus, setTimerStatus] = useState("");
  const [mode, setMode] = useState("");

  const intervalID = useRef<number | undefined>(undefined);
  const ciclosFeitos = useRef<number>(0);

  useEffect(() => {
    switch (mode) {
      case "modeFocus":
        setTotalTime(0);
        stopTime(intervalID.current);
        focusTime();
        break;
      case "modeShort":
        setTotalTime(0);
        stopTime(intervalID.current);
        shortBreakTime();
        break;
      case "modeLong":
        setTotalTime(0);
        stopTime(intervalID.current);
        longBreakTime();
        break;

      default:
        break;
    }
  }, [mode]);

  const timerFormat = (
    valueSeconds: number,
    tempoBreak: number,
    timerStatus: string,
  ) => {
    setTimeBreak(tempoBreak);
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
    var teste = focusSeconds;

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
      teste--;

      if (
        minutesCalculados <= 0 &&
        secondsCalculados <= 0 &&
        ciclosFeitos.current < cycle
      ) {
        setFocusSeconds(focus);
        ciclosFeitos.current = ciclosFeitos.current + 1;
        setCompletedCycle((prevCiclo) => prevCiclo + 1);
        setTotalTime(0);
        stopTime(intervalID.current);
        setMode("modeShort");
        return;
      }

      if (
        minutesCalculados <= 0 &&
        secondsCalculados <= 0 &&
        ciclosFeitos.current === cycle
      ) {
        ciclosFeitos.current = 0;
        setFocusSeconds(focus);
        setTotalTime(0);
        stopTime(intervalID.current);
        setMode("modeLong");
        return;
      }

      setFocusSeconds(teste);
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
    var teste = shortBreakSeconds;

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
      teste--;

      if (secondsCalculados <= 0 && minutesCalculados <= 0) {
        teste = shortBreak;
        stopTime(intervalID.current);
        setMode("modeFocus");
      }

      setShortBreakSeconds(teste);
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
    var teste = longBreakSeconds;

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
      teste--;

      if (secondsCalculados <= 0 && minutesCalculados <= 0) {
        setCompletedCycle(0);
        teste = longBreak;
        stopTime(intervalID.current);
        setMode("modeFocus");
      }

      setLongBreakSeconds(teste);
      setHours(hoursCalculadas);
      setMinutes(minutesCalculados);
      setseconds(secondsCalculados);
    }, 1000);
  };

  const startTime = () => {
    if (intervalID.current) return;
    switch (timeBreak) {
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
    ciclosFeitos.current = 0;
    setMode("");
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
    timeBreak,
    totalTime,
    completedCycle,
    timerStatus,
    hours,
    minutes,
    seconds,
  };
}
