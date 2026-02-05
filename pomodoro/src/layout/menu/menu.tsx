import { useState } from "react";
import styles from "./menu.module.css";
import type { MenuProps } from "../../types/menu";
import { OrganizarImgs } from "../../assets/OrganizarImgs";
import Button from "../../components/button/button";

export default function Menu({
  defaultValueFocus,
  defaultValueShortBreak,
  defaultValueLongBreak,
  functionSaveConfig,
}: MenuProps) {
  const [isShowMenu, setIsShowMenu] = useState(false);

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
            <div className={styles.op}>
              Focus
              <div className={styles.time}>
                <input
                  type="number"
                  id="inputFocus"
                  name="valueFocus"
                  defaultValue={defaultValueFocus / 60}
                />
                min
              </div>
            </div>
            <div className={styles.op}>
              ShortBreak
              <div className={styles.time}>
                <input
                  type="number"
                  id="inputShort"
                  name="valueShort"
                  defaultValue={defaultValueShortBreak / 60}
                />
                min
              </div>
            </div>
            <div className={styles.op}>
              LongBreak
              <div className={styles.time}>
                <input
                  type="number"
                  id="inputLong"
                  name="valueLong"
                  defaultValue={defaultValueLongBreak / 60}
                />
                min
              </div>
            </div>
          </div>

          <div className={styles.buttonsConfig}>
            <Button
              action={() => {
                setIsShowMenu((prev) => !prev);
              }}
              text="Cancel"
            />
            <Button action={functionSaveConfig} text="Save" />
          </div>
        </div>
      </div>
    </div>
  );
}
