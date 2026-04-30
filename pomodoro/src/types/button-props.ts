export type ButtonProps = {
  text: string;
  styleButton: string;
  icon?: React.ReactNode;
  action?: (...parameters: any) => void;
  onMouseUp?: React.MouseEventHandler;
  onMouseDown?: React.MouseEventHandler;
};
