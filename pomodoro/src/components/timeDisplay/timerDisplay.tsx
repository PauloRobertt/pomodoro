import styles from "./timerDisplay.module.css";
import { OrganizarImgs } from "../../assets/OrganizarImgs";
import type { TimerDisplayProps } from "../../types/timerDisplay";
import { useEffect } from "react";

export default function TimerDisplay(props: TimerDisplayProps) {
  useEffect(() => {
    const circleElement = document.getElementById("circle") as HTMLElement;
    const tempoRestante = props.timeBreak - props.tempoTotal;
    const percent = (tempoRestante / props.timeBreak) * 100;
    calcPerimeter(percent, circleElement);
  }, [props.segundos]);

  function calcPerimeter(percent: number, circleElement: any) {
    const perimeter = 1069;
    const percentual = (percent / 100) * perimeter;
    const result = perimeter - percentual;
    circleElement.style.setProperty("stroke-dashoffset", String(result));
  }

  return (
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
          {props.horas > 0 ? (
            <>{String(props.horas).padStart(2, "0")}:</>
          ) : (
            <></>
          )}
          {String(props.minutos).padStart(2, "0")}:
          {String(props.segundos).padStart(2, "0")}
        </h1>
        <small>{props.statusTimer}</small>
        <small className={styles.containerCiclos}>
          {Array.from({ length: props.ciclosConcluidos }, (_, index) => (
            <img
              key={index}
              className={styles.ciclosImg}
              src={OrganizarImgs.pomodoroDefault}
              alt="Imagem padrão do pomodoro"
            />
          ))}
          {Array.from(
            { length: props.timeCycle - props.ciclosConcluidos },
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
  );
}
