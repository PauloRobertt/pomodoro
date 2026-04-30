export type MenuProps = {
  defaultValueFocus: number;
  defaultValueShortBreak: number;
  defaultValueLongBreak: number;
  defaultValueCycle: number;
  functionSaveConfig: (
    e: React.FormEvent,
    valueFocus: number,
    valueShort: number,
    valueLong: number,
    valueCycle: number,
  ) => void;
};
