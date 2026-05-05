import { OrganizarImgs } from "~/assets/OrganizarImgs";
import styles from "./header.module.css";
import Menu from "~/layout/menu/menu.tsx";

// icons
import { IoVolumeMediumSharp } from "react-icons/io5";
import { IoVolumeMute } from "react-icons/io5";

// types
import type { HeaderProps } from "~/types/header-props";
import { useNotificationContext } from "~/hooks/useNotification/useNotificationContext";

export default function Header(props: HeaderProps) {
  const { isSound, setIsSound } = useNotificationContext();

  return (
    <header className={styles.header}>
      <div className={styles.containerTest}>
        <figure className={styles.figureLogo}>
          <img
            src={OrganizarImgs.pomodoroDefault}
            alt="logo projeto pomodoro"
          />
        </figure>
        <p>Pomodoro Timer</p>
      </div>
      <div className={styles.container}>
        <div className={styles.notificationSound}>
          {isSound ? (
            <IoVolumeMediumSharp
              className={styles.imgNotification}
              onClick={() => setIsSound(!isSound)}
            />
          ) : (
            <IoVolumeMute
              className={styles.imgNotification}
              onClick={() => setIsSound(!isSound)}
            />
          )}
        </div>
        <Menu
          defaultValueFocus={props.ValueFocus}
          defaultValueShortBreak={props.ValueShortBreak}
          defaultValueLongBreak={props.ValueLongBreak}
          defaultValueCycle={props.ValueCycle}
          functionSaveConfig={props.functionSaveConfig}
        />
      </div>
    </header>
  );
}
