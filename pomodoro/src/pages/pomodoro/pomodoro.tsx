import { useEffect, useState } from "react";
import styles from "./pomodoro.module.css";

export default function pomodoro() {
  let interval: any;
  const [minutos, setMinutos] = useState(0);
  const [segundos, setSegundos] = useState(55);

  const [timer, setTimer] = useState(
    `${minutos.toString().padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`,
  );

  const startTime = () => {
    console.log("Start");
    interval = setInterval(() => {
      setSegundos((prev) => (prev += 1));
    }, 1000);
  };

  useEffect(() => {
    setTimer(
      `${minutos.toString().padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`,
    );

    if (segundos > 59) {
      setSegundos(55);
      setMinutos((prev) => (prev += 1));
    }
  }, [startTime]);

  return (
    <div>
      <div>{timer}</div>
      <button onClick={startTime}>Start</button>
      <button>Stop</button>
    </div>
  );
}
