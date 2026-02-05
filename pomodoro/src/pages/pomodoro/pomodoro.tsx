import { useEffect, useRef, useState } from "react";
import type { TimerProps } from "../../types/timer";
import { Timer } from "../../class/Timer";

import { OrganizarImgs } from "../../assets/OrganizarImgs.ts";

import Button from "../../components/button/button.tsx";
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
      timeFocus,
      timeShort,
      timeLong,
      timeCycle,
    );
  }, [timeFocus]);

  function saveConfig(e: any) {
    e.preventDefault();
    const inputFocusValue = document.getElementById(
      "inputFocus",
    ) as HTMLInputElement;
    const inputShortValue = document.getElementById(
      "inputShort",
    ) as HTMLInputElement;
    const inputLongValue = document.getElementById(
      "inputLong",
    ) as HTMLInputElement;

    setTimeFocus(Number(inputFocusValue.value) * 60);
    setTimeShort(Number(inputShortValue.value) * 60);
    setTimeLong(Number(inputLongValue.value) * 60);
  }

  return (
    <div className={styles.containerPomodoro}>
      <Menu
        defaultValueFocus={timeFocus}
        defaultValueShortBreak={timeShort}
        defaultValueLongBreak={timeLong}
        defualtValueCycle={timeCycle}
        functionSaveConfig={saveConfig}
      />
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
