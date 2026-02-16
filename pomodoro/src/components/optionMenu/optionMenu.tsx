import { useEffect, useState } from "react";

import styles from "./optionMenu.module.css";
import stylesButton from "../../components/button/button.module.css";

import type { optionMenu } from "../../types/optionMenu";

import Button from "../button/button";

export default function OptionMenu(props: optionMenu) {
  const [defaultValue, setDefaultValue] = useState(props.value);

  const handleOnChange = (e: any) => {
    setDefaultValue(() => {
      return props.text !== "Cycle" ? e.target.value * 60 : e.target.value;
    });
  };

  useEffect(() => {
    props.functionTeste(props.text, defaultValue);
  }, [defaultValue]);

  return (
    <div className={styles.containerOption}>
      {props.text}
      <div className={styles.containerTimer}>
        <Button
          text="-"
          action={() => {
            setDefaultValue((prev: number) => {
              if (prev > 0)
                return props.text !== "Cycle" ? (prev -= 60) : (prev -= 1);
              return prev;
            });
          }}
          styleButton={stylesButton.buttonTimeControl}
        />
        <div className={styles.time}>
          <input
            type={props.type}
            value={props.text !== "Cycle" ? defaultValue / 60 : defaultValue}
            onChange={handleOnChange}
          />
          {props.text !== "Cycle" ? "min" : ""}
        </div>
        <Button
          text="+"
          action={() => {
            setDefaultValue((prev: number) => {
              if (prev >= 0)
                return props.text !== "Cycle" ? (prev += 60) : (prev += 1);
              return prev;
            });
          }}
          styleButton={stylesButton.buttonTimeControl}
        />
      </div>
    </div>
  );
}
