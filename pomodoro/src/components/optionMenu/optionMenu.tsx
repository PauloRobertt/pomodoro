import { useEffect, useState } from "react";

import styles from "./optionMenu.module.css";
import stylesButton from "../../components/button/button.module.css";

import type { optionMenu } from "../../types/optionMenu";

import Button from "../button/button";

export default function OptionMenu(props: optionMenu) {
  const [defaultValue, setDefaultValue] = useState(props.value);

  const handleOnChange = (e: any) => {
    setDefaultValue(() => {
      return props.id !== "cycle"
        ? Number(e.target.value) * 60
        : Number(e.target.value);
    });
  };

  useEffect(() => {
    props.functionTeste(props.id, defaultValue);
  }, [defaultValue]);

  return (
    <div className={styles.containerOption}>
      {props.text}
      <div className={styles.containerTimer}>
        <Button
          text="-"
          action={() => {
            setDefaultValue((prev: number) => {
              if (prev > 1)
                return props.id !== "cycle" ? (prev -= 60) : (prev -= 1);
              return prev;
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
