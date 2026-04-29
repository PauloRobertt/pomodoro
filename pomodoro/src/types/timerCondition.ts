export type TimerCondition = (params: {
  minutesCalculated: number;
  secondsCalculated: number;
  secondsLeft: number;
}) => void;
