import type { TimerStatus } from "./timer-status";
import type { TimerCondition } from "./timer-condition";

export type TimerConfig = {
  timerSeconds: number;
  timeBreak: number;
  timerStatus: TimerStatus;
  handler: TimerCondition;
};
