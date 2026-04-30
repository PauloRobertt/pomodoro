import { useEffect, useState, useRef } from "react";

import type { useTimerProps } from "~/types/useTimer-props";
import type { TimerStatus } from "~/types/timer-status";
import type { TimerMode } from "~/types/timer-mode";
import type { TimerConfig } from "~/types/timer-config";
import type { TimerMap } from "~/types/timer-map";
import type { TimerCondition } from "~/types/timer-condition";
import type { EventTimer } from "~/types/event-timer";

export function useTimer(props: useTimerProps) {
  const { focus, shortBreak, longBreak, cycle } = props;

  const [focusSeconds, setFocusSeconds] = useState(focus);
  const [shortBreakSeconds, setShortBreakSeconds] = useState(shortBreak);
  const [longBreakSeconds, setLongBreakSeconds] = useState(longBreak);

  const [totalTime, setTotalTime] = useState(0);
  const [activeTime, setActiveTime] = useState(0);
  const [completedCycle, setCompletedCycle] = useState(0);

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setseconds] = useState(0);
  const [timerStatus, setTimerStatus] = useState<TimerStatus | null>(null);
  const [timerMode, setTimerMode] = useState<TimerMode | null>(null);

  const [event, setEvent] = useState<EventTimer>();

  const intervalID = useRef<number | undefined>(undefined);
  const cycleCountRef = useRef<number>(0);

  useEffect(() => {
    setTotalTime(0);
    stopTime(intervalID.current);
    if (timerMode != null) {
      const config = timerMap[timerMode];
      if (config) {
        timer({
          timerSeconds: config.timerSeconds,
          timeBreak: config.timeBreak,
          timerStatus: config.timerStatus,
          handler: config.handler,
        });
      }
    }
  }, [timerMode]);

  const timeCalculation = (timerSeconds: number) => {
    const hoursCalculated = Math.floor(timerSeconds / 3600);
    const minutesCalculated = Math.floor((timerSeconds % 3600) / 60);
    const secondsCalculated = timerSeconds % 60;

    return { hoursCalculated, minutesCalculated, secondsCalculated };
  };

  const timerFormat = (
    valueSeconds: number,
    timeBreak: number,
    timerStatus: TimerStatus,
  ) => {
    setActiveTime(timeBreak);
    setTimerStatus(timerStatus);

    const { hoursCalculated, minutesCalculated, secondsCalculated } =
      timeCalculation(valueSeconds);

    setHours(hoursCalculated);
    setMinutes(minutesCalculated);
    setseconds(secondsCalculated);
  };

  const timer = ({
    timerSeconds,
    timeBreak,
    timerStatus,
    handler,
  }: TimerConfig) => {
    timerFormat(timerSeconds, timeBreak, timerStatus);

    let { hoursCalculated, minutesCalculated, secondsCalculated } =
      timeCalculation(timerSeconds);
    let secondsLeft = timerSeconds;

    intervalID.current = setInterval(() => {
      if (
        !(hoursCalculated > 0) &&
        !(minutesCalculated > 0) &&
        !(secondsCalculated > 0)
      ) {
        stopTime(intervalID.current);
        return;
      }

      if (secondsCalculated <= 0) {
        secondsCalculated = 60;
        minutesCalculated--;
      }

      if (minutesCalculated <= 0 && hoursCalculated > 0) {
        minutesCalculated = 59;
        secondsCalculated = 60;
        hoursCalculated--;
      }

      setTotalTime((prevtotalTime) => prevtotalTime + 1);
      secondsCalculated--;
      secondsLeft--;

      handler({ minutesCalculated, secondsCalculated, secondsLeft });

      setHours(hoursCalculated);
      setMinutes(minutesCalculated);
      setseconds(secondsCalculated);
    }, 1000);
  };

  const focusTime: TimerCondition = ({
    minutesCalculated,
    secondsCalculated,
    secondsLeft,
  }) => {
    if (
      isTimeFinished(minutesCalculated, secondsCalculated) &&
      cycleCountRef.current < cycle
    ) {
      setEvent("focusEnd");
      setFocusSeconds(focus);
      cycleCountRef.current = cycleCountRef.current + 1;
      setCompletedCycle((prevCiclo) => prevCiclo + 1);
      setTotalTime(0);
      stopTime(intervalID.current);
      setTimerMode("timerModeShort");
      return;
    }

    if (
      isTimeFinished(minutesCalculated, secondsCalculated) &&
      cycleCountRef.current === cycle
    ) {
      setEvent("focusEnd");
      cycleCountRef.current = 0;
      setFocusSeconds(focus);
      setTotalTime(0);
      stopTime(intervalID.current);
      setTimerMode("timerModeLong");
      return;
    }

    setFocusSeconds(secondsLeft);
  };

  const shortBreakTime: TimerCondition = ({
    minutesCalculated,
    secondsCalculated,
    secondsLeft,
  }) => {
    if (isTimeFinished(minutesCalculated, secondsCalculated)) {
      setEvent("shortbreakEnd");
      secondsLeft = shortBreak;
      stopTime(intervalID.current);
      setTimerMode("timerModeFocus");
    }

    setShortBreakSeconds(secondsLeft);
  };

  const longBreakTime: TimerCondition = ({
    minutesCalculated,
    secondsCalculated,
    secondsLeft,
  }) => {
    if (isTimeFinished(minutesCalculated, secondsCalculated)) {
      setEvent("longbreakEnd");
      setCompletedCycle(0);
      secondsLeft = longBreak;
      stopTime(intervalID.current);
      setTimerMode("timerModeFocus");
    }

    setLongBreakSeconds(secondsLeft);
  };

  const timerMap: TimerMap = {
    timerModeFocus: {
      timerSeconds: focusSeconds,
      timeBreak: focus,
      timerStatus: "Focus",
      handler: focusTime,
    },

    timerModeShort: {
      timerSeconds: shortBreakSeconds,
      timeBreak: shortBreak,
      timerStatus: "ShortBreak",
      handler: shortBreakTime,
    },

    timerModeLong: {
      timerSeconds: longBreakSeconds,
      timeBreak: longBreak,
      timerStatus: "LongBreak",
      handler: longBreakTime,
    },
  };

  const isTimeFinished = (
    minutesCalculated: number,
    secondsCalculated: number,
  ) => {
    if (minutesCalculated <= 0 && secondsCalculated <= 0) return true;
    return false;
  };

  const startTime = () => {
    if (intervalID.current) return;
    switch (timerStatus) {
      case "Focus":
        timer({
          timerSeconds: focusSeconds,
          timeBreak: focus,
          timerStatus: "Focus",
          handler: focusTime,
        });
        break;

      case "ShortBreak":
        timer({
          timerSeconds: shortBreakSeconds,
          timeBreak: shortBreak,
          timerStatus: "ShortBreak",
          handler: shortBreakTime,
        });
        break;

      case "LongBreak":
        timer({
          timerSeconds: longBreakSeconds,
          timeBreak: longBreak,
          timerStatus: "LongBreak",
          handler: longBreakTime,
        });
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
    setTimerMode(null);
    setCompletedCycle(0);
    setTotalTime(0);
    setFocusSeconds(focus);
    setShortBreakSeconds(shortBreak);
    setLongBreakSeconds(longBreak);
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
    event,
  };
}
