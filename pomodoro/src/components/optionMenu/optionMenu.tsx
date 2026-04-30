import { useEffect, useState, useRef } from "react";

import styles from "./optionMenu.module.css";
import stylesButton from "~/components/button/button.module.css";

import type { optionMenu } from "~/types/option-menu.ts";

import Button from "~/components/button/button.tsx";

export default function OptionMenu(props: optionMenu) {
  const [defaultValue, setDefaultValue] = useState(props.value);

  const intervalRef = useRef<number>(undefined);

  const handleOnChange = (e: any) => {
    let value = Math.trunc(e.target.value);
    setDefaultValue(() => {
      return props.id !== "cycle" ? Number(value) * 60 : Number(value);
    });
  };

  useEffect(() => {
    props.saveOptionMenu(props.id, defaultValue);
  }, [defaultValue]);

  const inc = () => {
    if (intervalRef.current === undefined) {
      intervalRef.current = setInterval(inc, 100);
    }
    setDefaultValue((prev: number) => {
      if (props.id !== "cycle") return prev > 60 ? (prev += 60) : prev;
      return prev > 1 ? (prev += 1) : prev;
    });
  };

  const dec = () => {
    if (intervalRef.current === undefined) {
      intervalRef.current = setInterval(dec, 100);
    }

    if (defaultValue > 0) {
      setDefaultValue((prev: number) => {
        if (props.id !== "cycle") return prev > 60 ? (prev -= 60) : prev;
        return prev > 1 ? (prev -= 1) : prev;
      });
    }
  };

  const clear = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = undefined;
  };

  return (
    <div className={styles.containerOption}>
      {props.text}
      <div className={styles.containerTimer}>
        <Button
          text="-"
          onMouseUp={clear}
          onMouseDown={dec}
          styleButton={stylesButton.buttonTimeControl}
        />
        <div className={styles.time}>
          <input
            data-testId={`input-${props.id}`}
            type={props.type}
            value={props.id !== "cycle" ? defaultValue / 60 : defaultValue}
            onChange={handleOnChange}
          />
          {props.id !== "cycle" ? "min" : ""}
        </div>
        <Button
          text="+"
          onMouseUp={clear}
          onMouseDown={inc}
          styleButton={stylesButton.buttonTimeControl}
        />
      </div>
    </div>
  );
}
