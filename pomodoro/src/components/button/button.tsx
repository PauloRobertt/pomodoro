import styles from "./button.module.css";
import type { ButtonProps } from "../../types/button";

export default function Button({ action, text }: ButtonProps) {
  return (
    <button className={styles.buttonDefault} onClick={action}>
      {text}
    </button>
  );
}
