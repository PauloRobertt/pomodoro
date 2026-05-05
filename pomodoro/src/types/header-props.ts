export type HeaderProps = {
  ValueFocus: number;
  ValueShortBreak: number;
  ValueLongBreak: number;
  ValueCycle: number;
  functionSaveConfig: (
    e: React.FormEvent,
    valueFocus: number,
    valueShort: number,
    valueLong: number,
    valueCycle: number,
  ) => void;
};
