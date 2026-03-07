import { useEffect, useState, useRef } from "react";

import type { useTimer } from "../types/useTimer";

export function useTimer(props: useTimer) {
  const [focus, setFocus] = useState(props.focus);
  const [shortBreak, setShortBreak] = useState(props.shortBreak);
  const [longBreak, setLongBreak] = useState(props.longBreak);
  const [cycle, setCycle] = useState(props.cycle);

  const [focusSegundos, setFocusSegundos] = useState(focus);
  const [shortSegundos, setShortSegundos] = useState(shortBreak);
  const [longSegundos, setLongSegundos] = useState(longBreak);

  const [tempoTotal, setTempoTotal] = useState(0);
  const [timeBreak, setTimeBreak] = useState(0);
  const [ciclosConcluidos, setCiclosConcluidos] = useState(0);

  const [horas, setHoras] = useState(0);
  const [minutos, setMinutos] = useState(0);
  const [segundos, setSegundos] = useState(0);
  const [statusTimer, setStatusTimer] = useState("");

  const intervalID = useRef<number | undefined>(undefined);
  const ciclosFeitos = useRef<number>(0);

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
    var teste = focusSegundos;

    intervalID.current = setInterval(() => {
      if (
        !(horasCalculadas > 0) &&
        !(minutosCalculados > 0) &&
        !(segundosCalculados > 0)
      ) {
        stopTime(intervalID.current);
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

      if (
        minutosCalculados <= 0 &&
        segundosCalculados <= 0 &&
        ciclosFeitos.current < cycle
      ) {
        ciclosFeitos.current = ciclosFeitos.current + 1;
        setFocusSegundos(focus);
        setCiclosConcluidos((prevCiclo) => prevCiclo + 1);
        setTempoTotal(0);
        stopTime(intervalID.current);
        shortBreakTime();
        return;
      }

      if (
        minutosCalculados <= 0 &&
        segundosCalculados <= 0 &&
        ciclosFeitos.current === cycle
      ) {
        setFocusSegundos(focus);
        setTempoTotal(0);
        stopTime(intervalID.current);
        longBreakTime();
        return;
      }

      setFocusSegundos(teste);
      setHoras(horasCalculadas);
      setMinutos(minutosCalculados);
      setSegundos(segundosCalculados);
    }, 1000);
  };

  const shortBreakTime = () => {
    timerFormat(shortSegundos, shortBreak, "ShortBreak");

    var horasCalculadas = Math.floor(shortSegundos / 3600);
    var minutosCalculados = Math.floor(shortSegundos / 60);
    var segundosCalculados = shortSegundos % 60;
    var teste = shortSegundos;

    intervalID.current = setInterval(() => {
      if (
        !(horasCalculadas > 0) &&
        !(minutosCalculados > 0) &&
        !(segundosCalculados > 0)
      ) {
        stopTime(intervalID.current);
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
        stopTime(intervalID.current);
        focusTime();
      }

      setShortSegundos(teste);
      setHoras(horasCalculadas);
      setMinutos(minutosCalculados);
      setSegundos(segundosCalculados);
    }, 1000);
  };

  const longBreakTime = () => {
    timerFormat(longSegundos, longBreak, "LongBreak");

    var horasCalculadas = Math.floor(longSegundos / 3600);
    var minutosCalculados = Math.floor(longSegundos / 60);
    var segundosCalculados = longSegundos % 60;
    var teste = longSegundos;

    intervalID.current = setInterval(() => {
      if (
        !(horasCalculadas > 0) &&
        !(minutosCalculados > 0) &&
        !(segundosCalculados > 0)
      ) {
        stopTime(intervalID.current);
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
        setCiclosConcluidos(0);
        teste = longBreak;
        setTempoTotal(0);
        stopTime(intervalID.current);
        focusTime();
      }

      setLongSegundos(teste);
      setHoras(horasCalculadas);
      setMinutos(minutosCalculados);
      setSegundos(segundosCalculados);
    }, 1000);
  };

  const startTime = () => {
    if (intervalID.current) return;
    switch (timeBreak) {
      case focus:
        focusTime();
        break;

      case shortBreak:
        shortBreakTime();
        break;

      case longBreak:
        longBreakTime();
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
    ciclosFeitos.current = 0;
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
