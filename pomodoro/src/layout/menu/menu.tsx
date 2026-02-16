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
    switch (typeTimer) {
      case "Focus":
        setValueFocus(value);
        break;
      case "Short":
        setValueShort(value);
        break;
      case "Long":
        setValueLong(value);
        break;
      case "Cycle":
        setValueCycle(value);
        break;

      default:
        break;
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
          isShowMenu ? styles.containerConfigOpen : styles.containerConfigOpen
        }
      >
        <div className={styles.contentConfig}>
          <div className={styles.opConfig}>
            <OptionMenu
              text="Focus"
              type="number"
              value={valueFocus}
              functionTeste={saveMenuConfig}
            />
            <OptionMenu
              text="Short"
              type="number"
              value={valueShort}
              functionTeste={saveMenuConfig}
            />
            <OptionMenu
              text="Long"
              type="number"
              value={valueLong}
              functionTeste={saveMenuConfig}
            />
            <OptionMenu
              text="Cycle"
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
              styleButton={stylesButton.menuButton}
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
