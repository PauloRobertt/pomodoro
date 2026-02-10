import { useEffect, useRef, useState, type HTMLElementType } from "react";
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
  }, [timeFocus]);

  function saveConfig(e: any): void {
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

  useEffect(() => {
    const circleElement = document.getElementById("circle") as HTMLElement;
    const tempoRestante = timeBreak - tempoTotal;
    const percent = (tempoRestante / timeBreak) * 100;
    calcPerimeter(percent, circleElement);
  }, [segundos]);

  function calcPerimeter(percent: number, circleElement: any) {
    const perimeter = 1069;
    const percentual = (percent / 100) * perimeter;
    const result = perimeter - percentual;
    circleElement.style.setProperty("stroke-dashoffset", String(result));
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
        <svg width="200" height="200" className={styles.circleContent}>
          <circle
            className={styles.circle}
            r="170"
            cx="200"
            cy="200"
            fill="white"
            stroke="var(--secundaryColor)"
            strokeWidth="3px"
            strokeDasharray={1069}
          />

          <circle
            className={styles.circle}
            id="circle"
            r="170"
            cx="200"
            cy="200"
            fill="white"
            stroke="var(--primaryColor)"
            strokeWidth="6px"
            strokeDasharray={1069}
          />
        </svg>
        <div className={styles.containerTimer}>
          <h1>
            {horas > 0 ? <>{String(horas).padStart(2, "0")}:</> : <></>}
            {String(minutos).padStart(2, "0")}:
            {String(segundos).padStart(2, "0")}
          </h1>
          <small>{statusTimer}</small>
          <small className={styles.containerCiclos}>
            {Array.from({ length: ciclosConcluidos }, (_, index) => (
              <img
                key={index}
                className={styles.ciclosImg}
                src={OrganizarImgs.pomodoroDefault}
                alt="Imagem padrão do pomodoro"
              />
            ))}
            {Array.from(
              { length: timeCycle - ciclosConcluidos },
              (_, index) => (
                <img
                  key={index}
                  className={styles.ciclosImg}
                  src={OrganizarImgs.pomodoroEmpty}
                  alt="Imagem do pomodoro vazio"
                />
              ),
            )}
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
