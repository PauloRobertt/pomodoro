//React
import { useState } from "react";

//Styles
import styles from "./menu.module.css";
import stylesButton from "../../components/button/button.module.css";

//types
import type { MenuProps } from "../../types/menu";

//Assets
import { OrganizarImgs } from "../../assets/OrganizarImgs";

//Componentes
import Button from "../../components/button/button";
import OptionMenu from "../../components/optionMenu/optionMenu";

export default function Menu({
  defaultValueFocus,
  defaultValueShortBreak,
  defaultValueLongBreak,
  defaultValueCycle,
  functionSaveConfig,
}: MenuProps) {
  const [isShowMenu, setIsShowMenu] = useState(false);

  const [valueFocus, setValueFocus] = useState(defaultValueFocus);
  const [valueShort, setValueShort] = useState(defaultValueShortBreak);
  const [valueLong, setValueLong] = useState(defaultValueLongBreak);
  const [valueCycle, setValueCycle] = useState(defaultValueCycle);

  const teste = () => {
    setValueFocus(1);
    console.log("Focus", valueFocus);
    console.log("Short", valueShort);
    console.log("Long", valueLong);
    console.log("Cycle", valueCycle);
  };

  return (
    <div className={styles.layoutMenu}>
      <figure className={styles.imgConfig}>
        <img
          onClick={() => {
            setIsShowMenu((prev) => !prev);
          }}
          src={OrganizarImgs.config}
          alt="Icone configuração"
        />
      </figure>
      <div
        className={
          isShowMenu ? styles.containerConfigOpen : styles.containerConfig
        }
      >
        <div className={styles.contentConfig}>
          <div className={styles.opConfig}>
            <div className={styles.containerOption}>
              Focus
              <div className={styles.containerTimer}>
                <Button
                  text="-"
                  action={() => {
                    setValueFocus((prev) => {
                      return (prev -= 300);
                    });
                  }}
                  styleButton={stylesButton.buttonTimeControl}
                />
                <div className={styles.time}>
                  <input
                    type="number"
                    id="inputFocus"
                    name="valueFocus"
                    value={valueFocus / 60}
                  />
                  min
                </div>
                <Button
                  text="+"
                  action={() => {
                    setValueFocus((prev) => {
                      return (prev += 300);
                    });
                  }}
                  styleButton={stylesButton.buttonTimeControl}
                />
              </div>
            </div>

            <div className={styles.containerOption}>
              ShortBreak Duration
              <div className={styles.containerTimer}>
                <Button
                  text="-"
                  action={() => {
                    setValueShort((prev) => {
                      return (prev -= 300);
                    });
                  }}
                  styleButton={stylesButton.buttonTimeControl}
                />
                <div className={styles.time}>
                  <input
                    type="number"
                    id="inputShort"
                    name="valueShort"
                    value={valueShort / 60}
                  />
                  min
                </div>
                <Button
                  text="+"
                  action={() => {
                    setValueShort((prev) => {
                      return (prev += 300);
                    });
                  }}
                  styleButton={stylesButton.buttonTimeControl}
                />
              </div>
            </div>

            <div className={styles.containerOption}>
              LongBreak Duration
              <div className={styles.containerTimer}>
                <Button
                  text="-"
                  action={() => {
                    setValueLong((prev) => {
                      return (prev -= 300);
                    });
                  }}
                  styleButton={stylesButton.buttonTimeControl}
                />
                <div className={styles.time}>
                  <input
                    type="number"
                    id="inputLong"
                    name="valueLong"
                    value={valueLong / 60}
                  />
                  min
                </div>
                <Button
                  text="+"
                  action={() => {
                    setValueLong((prev) => {
                      return (prev += 300);
                    });
                  }}
                  styleButton={stylesButton.buttonTimeControl}
                />
              </div>
            </div>

            <div className={styles.containerOption}>
              Cycles
              <div className={styles.containerTimer}>
                <Button
                  text="-"
                  action={() => {
                    setValueCycle((prev) => {
                      return (prev -= 1);
                    });
                  }}
                  styleButton={stylesButton.buttonTimeControl}
                />
                <div className={styles.time}>
                  <input
                    type="number"
                    id="inputCycle"
                    name="valueCycle"
                    value={valueCycle}
                  />
                </div>
                <Button
                  text="+"
                  action={() => {
                    setValueCycle((prev) => {
                      return (prev += 1);
                    });
                  }}
                  styleButton={stylesButton.buttonTimeControl}
                />
              </div>
            </div>
          </div>

          <div className={styles.buttonsConfig}>
            <Button
              action={() => {
                setIsShowMenu((prev) => !prev);
              }}
              styleButton={stylesButton.menuButton}
              text="Cancel"
            />
            <Button
              action={functionSaveConfig}
              styleButton={stylesButton.menuButton}
              text="Save"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
