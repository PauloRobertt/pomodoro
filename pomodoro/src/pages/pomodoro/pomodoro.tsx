import { useEffect, useRef, useState } from "react";

import type { TimerProps } from "../../types/timer";
import { Timer } from "../../class/Timer";

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
}: TimerProps) {
  const [timeFocus, setTimeFocus] = useState(focus);
  const [timeShort, setTimeShort] = useState(shortBreak);
  const [timeLong, setTimeLong] = useState(longBreak);
  const [timeCycle, setTimeCycle] = useState(cycle);

  const [tempoTotal, setTempoTotal] = useState(0);
  const [timeBreak, setTimeBreak] = useState(focus);

  const [ciclosConcluidos, setCiclosConcluidos] = useState(0);
  const [statusTimer, setStatusTimer] = useState("");
  const [isUseTimer, setIsUseTimer] = useState(false);
  const [horas, setHoras] = useState(0);
  const [minutos, setMinutos] = useState(0);
  const [segundos, setSegundos] = useState(0);

  const timerRef = useRef<Timer | null>(null);

  useEffect(() => {
    timerRef.current = new Timer(
      (timerBreak, tempoTotal, ciclosConcluidos, status, hours, min, sec) => {
        setTimeBreak(timerBreak);
        setTempoTotal(tempoTotal);
        setCiclosConcluidos(ciclosConcluidos);
        setStatusTimer(status);
        setHoras(hours);
        setMinutos(min);
        setSegundos(sec);
      },
      timeFocus,
      timeShort,
      timeLong,
      timeCycle,
    );
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
    timerRef.current?.resetTimer();
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
        horas={horas}
        minutos={minutos}
        segundos={segundos}
        statusTimer={statusTimer}
        timeCycle={timeCycle}
        ciclosConcluidos={ciclosConcluidos}
        tempoTotal={tempoTotal}
        timeBreak={timeBreak}
      />

      <div className={styles.containerButtons}>
        {isUseTimer ? (
          <>
            <Button
              action={() => {
                setIsUseTimer(false);
                timerRef.current?.stopTimer();
              }}
              styleButton={stylesButton.mainButton}
              text="Stop"
            />
            <Button
              action={() => {
                setIsUseTimer(false);
                timerRef.current?.resetTimer();
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
                timerRef.current?.startTime();
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
