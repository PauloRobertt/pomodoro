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

  function saveMenuConfig(typeTimer: string, value: number): void {
    if (value > 0) {
      switch (typeTimer) {
        case "focus":
          setValueFocus(value);
          break;
        case "short":
          setValueShort(value);
          break;
        case "long":
          setValueLong(value);
          break;
        case "cycle":
          setValueCycle(value);
          break;

        default:
          break;
      }
    }
  }

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
            <OptionMenu
              id="focus"
              text="Focus Duration"
              type="number"
              value={valueFocus}
              functionTeste={saveMenuConfig}
            />
            <OptionMenu
              id="short"
              text="Short Duration"
              type="number"
              value={valueShort}
              functionTeste={saveMenuConfig}
            />
            <OptionMenu
              id="long"
              text="Long Duration"
              type="number"
              value={valueLong}
              functionTeste={saveMenuConfig}
            />
            <OptionMenu
              id="cycle"
              text="Cycle Duration"
              type="number"
              value={valueCycle}
              functionTeste={saveMenuConfig}
            />
          </div>
          <div className={styles.buttonsConfig}>
            <Button
              action={() => {
                setIsShowMenu((prev) => !prev);
              }}
              styleButton={stylesButton.menuButtonCancel}
              text="Cancel"
            />
            <Button
              action={(e: React.FormEvent) => {
                functionSaveConfig(
                  e,
                  valueFocus,
                  valueShort,
                  valueLong,
                  valueCycle,
                );
              }}
              styleButton={stylesButton.menuButton}
              text="Save"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
