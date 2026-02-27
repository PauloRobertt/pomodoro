import { useState } from "react";

import type { useTimer } from "../types/useTimer";

export function useTimer(props: useTimer) {
  const [focus, setFocus] = useState(props.focus);
  const [shortBreak, setShortBreak] = useState(props.shortBreak);
  const [longBreak, setLongBreak] = useState(props.longBreak);
  const [cycle, setCycle] = useState(props.cycle);

  const [focusSegundos, setFocusSegundos] = useState(focus);
  const [tempoTotal, setTempoTotal] = useState(0);
  const [timeBreak, setTimeBreak] = useState(0);
  const [ciclosConcluidos, setCiclosConcluidos] = useState(0);

  const [horas, setHoras] = useState(0);
  const [minutos, setMinutos] = useState(0);
  const [segundos, setSegundos] = useState(0);
  const [statusTimer, setStatusTimer] = useState("");

  const [intervalID, setIntervalID] = useState<number | undefined>(undefined);

  const timerFormat = (
    value: number,
    tempoBreak: number,
    statusTimer: string,
  ) => {
    setTimeBreak(tempoBreak);
    setStatusTimer(statusTimer);

    const horasCalculadas = Math.floor(value / 3600);
    const minutosCalculados = Math.floor(value / 60);
    const segundosCalculados = value % 60;

    setHoras(horasCalculadas);
    setMinutos(minutosCalculados);
    setSegundos(segundosCalculados);
  };

  const startTime = () => {
    if (intervalID) return;

    timerFormat(focusSegundos, timeBreak, "Focus");

    var horasCalculadas = horas;
    var minutosCalculados = minutos;
    var segundosCalculados = segundos;
    var teste = focusSegundos;
    var ciclos = ciclosConcluidos;

    var intervalIDTest = setInterval(() => {
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

      setFocusSegundos(teste);
      setHoras(horasCalculadas);
      setMinutos(minutosCalculados);
      setSegundos(segundosCalculados);
    }, 1000);

    setIntervalID(intervalIDTest);
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
