import { useEffect, useState } from "react";

import type { useTimer } from "../types/useTimer";

export function useTimer(props: useTimer) {
  const [focus, setFocus] = useState(props.focus);
  const [shortBreak, setShortBreak] = useState(props.shortBreak);
  const [longBreak, setLongBreak] = useState(props.longBreak);
  const [cycle, setCycle] = useState(props.cycle);

  const [focusSegundos, setFocusSegundos] = useState(focus);
  const [shortSegundos, setShortSegundos] = useState(shortBreak);

  const [tempoTotal, setTempoTotal] = useState(0);
  const [timeBreak, setTimeBreak] = useState(0);
  const [ciclosConcluidos, setCiclosConcluidos] = useState(0);

  const [horas, setHoras] = useState(0);
  const [minutos, setMinutos] = useState(0);
  const [segundos, setSegundos] = useState(0);
  const [statusTimer, setStatusTimer] = useState("");

  const [intervalID, setIntervalID] = useState<number | undefined>(undefined);

  const timerFormat = (
    valueSeconds: number,
    tempoBreak: number,
    statusTimer: string,
  ) => {
    setTimeBreak(tempoBreak);
    setStatusTimer(statusTimer);

    const horasCalculadas = Math.floor(valueSeconds / 3600);
    const minutosCalculados = Math.floor(valueSeconds / 60);
    const segundosCalculados = valueSeconds % 60;

    setHoras(horasCalculadas);
    setMinutos(minutosCalculados);
    setSegundos(segundosCalculados);
  };

  const focusTime = () => {
    timerFormat(focusSegundos, focus, "Focus");

    var horasCalculadas = Math.floor(focusSegundos / 3600);
    var minutosCalculados = Math.floor(focusSegundos / 60);
    var segundosCalculados = focusSegundos % 60;
    var tempoTotalCalculado = tempoTotal;
    var teste = focusSegundos;

    var intervalIDFocus = setInterval(() => {
      if (
        !(horasCalculadas > 0) &&
        !(minutosCalculados > 0) &&
        !(segundosCalculados > 0)
      ) {
        stopTime(intervalIDFocus);
        return;
      }

      if (segundosCalculados <= 0) {
        segundosCalculados = 60;
        minutosCalculados--;
      }

      if (minutosCalculados <= 0 && horasCalculadas > 0) {
        segundosCalculados = 60;
        horasCalculadas--;
      }

      setTempoTotal((prevTempoTotal) => prevTempoTotal + 1);
      segundosCalculados--;
      teste--;

      if (segundosCalculados <= 0 && minutosCalculados <= 0) {
        teste = focus;
        setCiclosConcluidos((prevCiclo) => prevCiclo + 1);
        setTempoTotal(0);
        stopTime(intervalIDFocus);
        shortBreakTime();
      }

      setFocusSegundos(teste);
      setHoras(horasCalculadas);
      setMinutos(minutosCalculados);
      setSegundos(segundosCalculados);
    }, 1000);

    setIntervalID(intervalIDFocus);
  };

  const shortBreakTime = () => {
    timerFormat(shortSegundos, shortBreak, "ShortBreak");

    var horasCalculadas = Math.floor(shortSegundos / 3600);
    var minutosCalculados = Math.floor(shortSegundos / 60);
    var segundosCalculados = shortSegundos % 60;
    var tempoTotalCalculado = tempoTotal;
    var teste = shortSegundos;

    var intervalIDShort = setInterval(() => {
      if (
        !(horasCalculadas > 0) &&
        !(minutosCalculados > 0) &&
        !(segundosCalculados > 0)
      ) {
        stopTime(intervalIDShort);
        return;
      }

      if (segundosCalculados <= 0) {
        segundosCalculados = 60;
        minutosCalculados--;
      }

      if (minutosCalculados <= 0 && horasCalculadas > 0) {
        segundosCalculados = 60;
        horasCalculadas--;
      }

      setTempoTotal((prevTempoTotal) => prevTempoTotal + 1);
      segundosCalculados--;
      teste--;

      if (segundosCalculados <= 0 && minutosCalculados <= 0) {
        teste = shortBreak;
        setTempoTotal(0);
        stopTime(intervalIDShort);
        focusTime();
      }

      setShortSegundos(teste);
      setHoras(horasCalculadas);
      setMinutos(minutosCalculados);
      setSegundos(segundosCalculados);
    }, 1000);

    setIntervalID(intervalIDShort);
  };

  const startTime = () => {
    if (intervalID) return;
    switch (timeBreak) {
      case focus:
        focusTime();
        break;

      case shortBreak:
        shortBreakTime();
        break;

      default:
        break;
    }
  };

  const stopTime = (interval: number | undefined = intervalID) => {
    clearInterval(interval);
    setIntervalID(undefined);
  };

  const resetTime = () => {
    setCiclosConcluidos(0);
    setTempoTotal(0);
    setFocusSegundos(focus);
    stopTime();
    timerFormat(focus, focus, "Focus");
  };

  return {
    startTime,
    timerFormat,
    stopTime,
    resetTime,
    timeBreak,
    tempoTotal,
    ciclosConcluidos,
    statusTimer,
    horas,
    minutos,
    segundos,
  };
}
