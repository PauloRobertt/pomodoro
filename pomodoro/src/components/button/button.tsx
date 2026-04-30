import styles from "./button.module.css";
import type { ButtonProps } from "~/types/button-props";

export default function Button({
  action,
  text,
  icon,
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
      {icon ? icon : ""}
      {text}
    </button>
  );
}
