import { useEffect, useState } from "react";

import { useTimer } from "../../hooks/useTimer/useTimer.ts";
import { useNotification } from "~/hooks/useNotification/useNotification.ts";
import type { useTimerProps } from "../../types/useTimer.ts";

import Button from "../../components/button/button.tsx";
import TimerDisplay from "../../components/timeDisplay/timerDisplay.tsx";
import Menu from "../../layout/menu/menu.tsx";

import styles from "./pomodoro.module.css";
import stylesButton from "../../components/button/button.module.css";

import { OrganizarImgs } from "../../assets/OrganizarImgs.ts";

//icons
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { LuTimerReset } from "react-icons/lu";
import { FaRocket } from "react-icons/fa";
import { FaRegHourglass } from "react-icons/fa6";
import { RiSofaLine } from "react-icons/ri";

export default function Pomodoro({
  focus,
  shortBreak,
  longBreak,
  cycle,
}: useTimerProps) {
  const [timeFocus, setTimeFocus] = useState(
    Number(localStorage.getItem("timeFocus")) || focus,
  );
  const [timeShort, setTimeShort] = useState(
    Number(localStorage.getItem("timeShort")) || shortBreak,
  );
  const [timeLong, setTimeLong] = useState(
    Number(localStorage.getItem("timeLong")) || longBreak,
  );
  const [timeCycle, setTimeCycle] = useState(
    Number(localStorage.getItem("timeCycle")) || cycle,
  );
  const [isUseTimer, setIsUseTimer] = useState(false);
  const { sendNotification, askNotification } = useNotification();

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
    isFinished,
  } = useTimer({
    focus: timeFocus,
    shortBreak: timeShort,
    longBreak: timeLong,
    cycle: timeCycle,
  });

  useEffect(() => {
    if (!localStorage.getItem("timeFocus"))
      localStorage.setItem("timeFocus", String(timeFocus));
    if (!localStorage.getItem("timeShort"))
      localStorage.setItem("timeShort", String(timeShort));
    if (!localStorage.getItem("timeLong"))
      localStorage.setItem("timeLong", String(timeLong));
    if (!localStorage.getItem("timeCycle"))
      localStorage.setItem("timeCycle", String(timeCycle));
    timerFormat(timeFocus, timeFocus, "Focus");
  }, []);

  useEffect(() => {
    timerFormat(timeFocus, timeFocus, "Focus");
  }, [timeFocus]);

  useEffect(() => {
    if (isFinished) {
      sendNotification("Tempo finalizado!");
    }
  }, [isFinished]);

  function saveConfig(
    e: React.FormEvent,
    inputFocusValue: number,
    inputShortValue: number,
    inputLongValue: number,
    inputCycleValue: number,
  ): void {
    e.preventDefault();
    if (timeFocus !== inputFocusValue) {
      localStorage.setItem("timeFocus", String(inputFocusValue));
      setTimeFocus(inputFocusValue);
    }
    if (timeShort !== inputShortValue) {
      localStorage.setItem("timeShort", String(inputShortValue));
      setTimeShort(inputShortValue);
    }
    if (timeLong !== inputLongValue) {
      localStorage.setItem("timeLong", String(inputLongValue));
      setTimeLong(inputLongValue);
    }
    if (timeCycle !== inputCycleValue) {
      localStorage.setItem("timeCycle", String(inputCycleValue));
      setTimeCycle(inputCycleValue);
    }
    setIsUseTimer(false);
    resetTime();
  }

  return (
    <div className={styles.containerPomodoro}>
      <header className={styles.header}>
        <figure className={styles.figureLogo}>
          <img
            src={OrganizarImgs.pomodoroDefault}
            alt="logo projeto pomodoro"
          />
        </figure>
        <p>Pomodoro Timer</p>
        <Menu
          defaultValueFocus={timeFocus}
          defaultValueShortBreak={timeShort}
          defaultValueLongBreak={timeLong}
          defaultValueCycle={timeCycle}
          functionSaveConfig={saveConfig}
        />
      </header>

      <main>
        <TimerDisplay
          horas={hours}
          minutos={minutes}
          segundos={seconds}
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
                icon={<FaPause color="white" size={20} />}
              />
              <Button
                action={() => {
                  setIsUseTimer(false);
                  resetTime();
                }}
                styleButton={stylesButton.mainButton}
                text="Reset"
                icon={<LuTimerReset color="white" size={20} />}
              />
            </>
          ) : (
            <>
              <Button
                action={() => {
                  askNotification();
                  setIsUseTimer(true);
                  startTime();
                }}
                styleButton={stylesButton.mainButton}
                text="Start"
                icon={<FaPlay color="white" size={20} />}
              />
            </>
          )}
        </div>
      </main>

      <div className={styles.containerStatusTimer}>
        <div
          className={`${styles.status} ${timerStatus == "Focus" ? styles.statusActive : ""}`}
        >
          <div className={styles.contentStatus}>
            <h3>Focus</h3>
            <p>{timeFocus / 60} min</p>
          </div>
          <div className={styles.statusimg}>
            <FaRocket />
          </div>
        </div>

        <div
          className={`${styles.status} ${timerStatus == "ShortBreak" ? styles.statusActive : ""}`}
        >
          <div className={styles.contentStatus}>
            <h3>Short</h3>
            <p>{timeShort / 60} min</p>
          </div>
          <div className={styles.statusimg}>
            <FaRegHourglass />
          </div>
        </div>

        <div
          className={`${styles.status} ${timerStatus == "LongBreak" ? styles.statusActive : ""}`}
        >
          <div className={styles.contentStatus}>
            <h3>Long</h3>
            <p>{timeLong / 60} min</p>
          </div>
          <div className={styles.statusimg}>
            <RiSofaLine />
          </div>
        </div>
      </div>
    </div>
  );
}
