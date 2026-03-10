import { useEffect, useRef, useState } from "react";

import { useTimer } from "../../hooks/useTimer.ts";
import type { useTimerProps } from "../../types/useTimer.ts";

import Button from "../../components/button/button.tsx";
import TimerDisplay from "../../components/timeDisplay/timerDisplay.tsx";
import Menu from "../../layout/menu/menu.tsx";

import styles from "./pomodoro.module.css";
import stylesButton from "../../components/button/button.module.css";

export default function Pomodoro({
  focus,
  shortBreak,
  longBreak,
  cycle,
}: useTimerProps) {
  const [timeFocus, setTimeFocus] = useState(focus);
  const [timeShort, setTimeShort] = useState(shortBreak);
  const [timeLong, setTimeLong] = useState(longBreak);
  const [timeCycle, setTimeCycle] = useState(cycle);
  const [isUseTimer, setIsUseTimer] = useState(false);

  const {
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
  } = useTimer({
    focus: timeFocus,
    shortBreak: timeShort,
    longBreak: timeLong,
    cycle: timeCycle,
  });

  useEffect(() => {
    timerFormat(timeFocus, timeFocus, "Focus");
  }, [timeFocus, timeShort, timeLong, timeCycle]);

  function saveConfig(
    e: React.FormEvent,
    inputFocusValue: number,
    inputShortValue: number,
    inputLongValue: number,
    inputCycleValue: number,
  ): void {
    e.preventDefault();
    setTimeFocus(inputFocusValue);
    setTimeShort(inputShortValue);
    setTimeLong(inputLongValue);
    setTimeCycle(inputCycleValue);
    setIsUseTimer(false);
    resetTime();
  }

  return (
    <div className={styles.containerPomodoro}>
      <Menu
        defaultValueFocus={timeFocus}
        defaultValueShortBreak={timeShort}
        defaultValueLongBreak={timeLong}
        defaultValueCycle={timeCycle}
        functionSaveConfig={saveConfig}
      />

      <TimerDisplay
        horas={hours}
        minutos={minutes}
        segundos={seconds}
        statusTimer={timerStatus}
        timeCycle={timeCycle}
        ciclosConcluidos={completedCycle}
        tempoTotal={totalTime}
        timeBreak={activeTime}
      />

      <div className={styles.containerButtons}>
        {isUseTimer ? (
          <>
            <Button
              action={() => {
                setIsUseTimer(false);
                stopTime();
              }}
              styleButton={stylesButton.mainButton}
              text="Stop"
            />
            <Button
              action={() => {
                setIsUseTimer(false);
                resetTime();
              }}
              styleButton={stylesButton.mainButton}
              text="Reset"
            />
          </>
        ) : (
          <>
            <Button
              action={() => {
                setIsUseTimer(true);
                startTime();
              }}
              styleButton={stylesButton.mainButton}
              text="Start"
            />
          </>
        )}
      </div>
    </div>
  );
}
