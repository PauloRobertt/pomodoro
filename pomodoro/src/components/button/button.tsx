import styles from "./button.module.css";
import type { ButtonProps } from "../../types/button";

export default function Button({ action, text, styleButton }: ButtonProps) {
  return (
    <button
      className={`${styles.buttonDefault} ${styleButton}`}
      onClick={action}
    >
      {text}
    </button>
  );
}
