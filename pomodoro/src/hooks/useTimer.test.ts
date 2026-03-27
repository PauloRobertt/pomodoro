import { describe, it, expect } from "vitest";
import { useTimer } from "../hooks/useTimer";

describe("useTimer", () => {
  it("utilização do useTimer", () => {
    const focusDefault = 1800;
    const shortBreakDefault = 300;
    const longBreakDefault = 900;
    const cycleDefault = 4;

    const { hours, minutes, seconds } = useTimer({
      focus: focusDefault,
      shortBreak: shortBreakDefault,
      longBreak: longBreakDefault,
      cycle: cycleDefault,
    });

    var hoursCalculadas = Math.floor(focusDefault / 3600);
    var minutesCalculados = Math.floor((focusDefault % 3600) / 60);
    var secondsCalculados = focusDefault % 60;

    expect(hours).toBe(hoursCalculadas);
  });
});
