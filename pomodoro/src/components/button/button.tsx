import styles from "./button.module.css";
import type { ButtonProps } from "../../types/button";

export default function Button({
  action,
  text,
  styleButton,
  onMouseUp,
  onMouseDown,
}: ButtonProps) {
  return (
    <button
      onMouseUp={onMouseUp}
      onMouseDown={onMouseDown}
      className={`${styles.buttonDefault} ${styleButton}`}
      onClick={action}
    >
      {text}
    </button>
  );
}
