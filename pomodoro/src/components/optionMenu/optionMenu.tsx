import { useEffect, useState } from "react";

import styles from "./optionMenu.module.css";
import stylesButton from "../../components/button/button.module.css";

import type { optionMenu } from "../../types/optionMenu";

import Button from "../button/button";

export default function OptionMenu(props: optionMenu) {
  const [defaultValue, setDefaultValue] = useState(props.value);

  const handleOnChange = (e: any) => {
    let value = Math.trunc(e.target.value);
    setDefaultValue(() => {
      return props.id !== "cycle" ? Number(value) * 60 : Number(value);
    });
  };

  useEffect(() => {
    props.functionSaveConfig(props.id, defaultValue);
  }, [defaultValue]);

  return (
    <div className={styles.containerOption}>
      {props.text}
      <div className={styles.containerTimer}>
        <Button
          text="-"
          action={() => {
            setDefaultValue((prev: number) => {
              if (props.id !== "cycle") return prev > 60 ? (prev -= 60) : prev;
              return prev > 1 ? (prev -= 1) : prev;
            });
          }}
          styleButton={stylesButton.buttonTimeControl}
        />
        <div className={styles.time}>
          <input
            type={props.type}
            value={props.id !== "cycle" ? defaultValue / 60 : defaultValue}
            onChange={handleOnChange}
          />
          {props.id !== "cycle" ? "min" : ""}
        </div>
        <Button
          text="+"
          action={() => {
            setDefaultValue((prev: number) => {
              if (prev >= 0) {
                return props.id !== "cycle" ? (prev += 60) : (prev += 1);
              }
              return prev;
            });
          }}
          styleButton={stylesButton.buttonTimeControl}
        />
      </div>
    </div>
  );
}
