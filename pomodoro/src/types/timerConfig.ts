import type { TimerStatus } from "./timerStatus";
import type { TimerCondition } from "./timerCondition";

export type TimerConfig = {
  timerSeconds: number;
  timeBreak: number;
  timerStatus: TimerStatus;
  handler: TimerCondition;
};
