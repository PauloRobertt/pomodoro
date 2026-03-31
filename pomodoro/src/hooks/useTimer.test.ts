/**
 * @vitest-environment jsdom
 */

import { renderHook, act } from "@testing-library/react";
import { describe, test, expect, vi, afterEach, beforeEach } from "vitest";
import { useTimer } from "./useTimer.ts";

// Initial Values
const focusDefault = 1800;
const shortBreakDefault = 300;
const longBreakDefault = 900;
const cycleDefault = 2;

let result: any;

describe("useTimer", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    const hook = renderHook(() =>
      useTimer({
        focus: focusDefault,
        shortBreak: shortBreakDefault,
        longBreak: longBreakDefault,
        cycle: cycleDefault,
      }),
    );

    result = hook.result;
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("deve implementar os valores do timer com os valores enviados", () => {
    act(() => {
      result.current.timerFormat(focusDefault, focusDefault, "Focus");
    });

    expect(result.current.hours).toBe(0);
    expect(result.current.minutes).toBe(30);
    expect(result.current.seconds).toBe(0);
    expect(result.current.timerStatus).toBe("Focus");
  });

  test("deve iniciar o timer e percorrer 5 minutos", () => {
    act(() => {
      result.current.timerFormat(focusDefault, focusDefault, "Focus");
    });

    act(() => {
      result.current.startTime();
    });

    act(() => {
      vi.advanceTimersByTime(300000);
    });

    expect(result.current.minutes).toBe(25);
  });

  test("deve iniciar o timer e percorrer ate que o tempo de focus acabe", () => {
    act(() => {
      result.current.timerFormat(focusDefault, focusDefault, "Focus");
    });

    act(() => {
      result.current.startTime();
    });

    act(() => {
      vi.advanceTimersByTime(1800000);
    });

    expect(result.current.timerStatus).toBe("ShortBreak");
    expect(result.current.completedCycle).toBe(1);
    expect(result.current.activeTime).toBe(shortBreakDefault);
  });

  test("deve iniciar e percorrer o tempo de focus e short e voltar para o focus", () => {
    act(() => {
      result.current.timerFormat(focusDefault, focusDefault, "Focus");
    });

    act(() => {
      result.current.startTime();
    });

    expect(result.current.timerStatus).toBe("Focus");

    act(() => {
      vi.advanceTimersByTime(1800000);
    });

    expect(result.current.timerStatus).toBe("ShortBreak");

    act(() => {
      vi.advanceTimersByTime(300000);
    });

    expect(result.current.activeTime).toBe(focusDefault);
    expect(result.current.timerStatus).toBe("Focus");
    expect(result.current.completedCycle).toBe(1);
  });

  test("deve percorrer o tempo ate que se inicie o longbreak e reseta", () => {
    act(() => {
      result.current.timerFormat(focusDefault, shortBreakDefault, "Focus");
    });

    act(() => {
      result.current.startTime();
    });

    act(() => {
      vi.advanceTimersByTime(1800000);
    });

    act(() => {
      vi.advanceTimersByTime(300000);
    });

    act(() => {
      vi.advanceTimersByTime(1800000);
    });

    act(() => {
      vi.advanceTimersByTime(300000);
    });

    act(() => {
      vi.advanceTimersByTime(1800000);
    });

    expect(result.current.timerStatus).toBe("LongBreak");
    expect(result.current.activeTime).toBe(longBreakDefault);

    act(() => {
      vi.advanceTimersByTime(900000);
    });

    expect(result.current.activeTime).toBe(focusDefault);
    expect(result.current.timerStatus).toBe("Focus");
    expect(result.current.completedCycle).toBe(0);
  });
});
