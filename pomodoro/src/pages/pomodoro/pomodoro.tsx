import { useEffect, useRef, useState } from "react";
import type { TimerProps } from "../../types/timer";
import { Timer } from "../../class/Timer";

import { OrganizarImgs } from "../../assets/OrganizarImgs.ts";

import Button from "../../components/button/button.tsx";

import styles from "./pomodoro.module.css";

export default function Pomodoro({
  focus,
  shortBreak,
  longBreak,
  cycle,
}: TimerProps) {
  const [statusTimer, setStatusTimer] = useState("");
  const [isUseTimer, setIsUseTimer] = useState(false);
  const [horas, setHoras] = useState(0);
  const [minutos, setMinutos] = useState(0);
  const [segundos, setSegundos] = useState(0);

  const timerRef = useRef<Timer | null>(null);

  useEffect(() => {
    timerRef.current = new Timer(
      (status, hours, min, sec) => {
        setStatusTimer(status);
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
          <svg width="150" height="150" className={styles.circleContent}>
            <circle
              className={styles.circle}
              r="130"
              cx="150"
              cy="150"
              fill="white"
              stroke="var(--secundaryColor)"
              strokeWidth="5px"
              strokeDasharray="816,4"
            />

            <circle
              className={styles.circle}
              r="130"
              cx="150"
              cy="150"
              fill="white"
              stroke="var(--primaryColor)"
              strokeWidth="5px"
              strokeDasharray="816,4"
            />
          </svg>
          <div className={styles.containerTimer}>
            <h1>
              {horas > 0 ? <>{String(horas).padStart(2, "0")}:</> : <></>}
              {String(minutos).padStart(2, "0")}:
              {String(segundos).padStart(2, "0")}
            </h1>
            <small>{statusTimer}</small>
            <small>
              {Array.from({ length: cycle }, (_, index) => (
                <img
                  className={styles.ciclosImg}
                  src={OrganizarImgs.pomodoroEmpty}
                  alt=""
                />
              ))}
            </small>
          </div>
        </div>

        <div className={styles.containerButtons}>
          {isUseTimer ? (
            <>
              <Button
                action={() => {
                  setIsUseTimer(false);
                  timerRef.current?.stopTimer();
                }}
                text="Stop"
              />
              <Button
                action={() => {
                  setIsUseTimer(false);
                  timerRef.current?.resetTimer();
                }}
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
                text="Start"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
