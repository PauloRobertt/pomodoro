import { useEffect, useRef, useState } from "react";
import type { TimerProps } from "../../types/timer";
import { Timer } from "../../class/Timer";

import Button from "../../components/button/button.tsx";

import styles from "./pomodoro.module.css";

export default function Pomodoro({
  focus,
  shortBreak,
  longBreak,
  cycle,
}: TimerProps) {
  const [horas, setHoras] = useState(0);
  const [minutos, setMinutos] = useState(0);
  const [segundos, setSegundos] = useState(0);

  const timerRef = useRef<Timer | null>(null);

  useEffect(() => {
    timerRef.current = new Timer(
      (hours, min, sec) => {
        setHoras(hours);
        setMinutos(min);
        setSegundos(sec);
      },
      focus,
      shortBreak,
      longBreak,
      cycle,
    );
  }, []);

  return (
    <div className={styles.containerBackground}>
      <div className={styles.containerPomodoro}>
        <div className={styles.circleWrapper}>
          <svg width="200" height="200" className={styles.circleContent}>
            <circle
              className={styles.circle}
              r="90"
              cx="100"
              cy="100"
              fill="white"
              stroke="var(--secundaryColor)"
              strokeWidth="5px"
              strokeDasharray="565.49"
            />

            <circle
              className={styles.circle}
              r="90"
              cx="100"
              cy="100"
              fill="white"
              stroke="var(--primaryColor)"
              strokeWidth="5px"
              strokeDasharray="565.49"
            />
          </svg>
          <h1>
            {horas > 0 ? <>{String(horas).padStart(2, "0")}:</> : <></>}
            {String(minutos).padStart(2, "0")}:
            {String(segundos).padStart(2, "0")}
          </h1>
        </div>

        <div className={styles.containerButtons}>
          <Button
            action={() => {
              timerRef.current?.startTime();
            }}
            text="Start"
          />

          <Button action={() => timerRef.current?.stopTimer()} text="Stop" />

          <Button action={() => timerRef.current?.resetTimer()} text="Reset" />
        </div>
      </div>
    </div>
  );
}
