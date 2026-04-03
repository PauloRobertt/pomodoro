import Menu from "./menu";
import stylesMenu from "./menu.module.css";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, test, expect, beforeEach, vi } from "vitest";

// Initial Values
const focusDefault = 1800;
const shortBreakDefault = 300;
const longBreakDefault = 900;
const cycleDefault = 2;

describe("Menu", () => {
  const saveConfigMock = vi.fn();

  beforeEach(() => {
    saveConfigMock.mockClear();

    render(
      <Menu
        defaultValueFocus={focusDefault}
        defaultValueShortBreak={shortBreakDefault}
        defaultValueLongBreak={longBreakDefault}
        defaultValueCycle={cycleDefault}
        functionSaveConfig={saveConfigMock}
      />,
    );
  });

  test("deve renderizar corretamente", () => {
    expect(screen.getByText("Long Duration")).toBeInTheDocument();
  });

  test("deve mudar a classe do data-testId 'containerConfigMenu' ao ser clicado", () => {
    const imgConfigMenu = screen.getByRole("img", {
      name: /Icone configuração/i,
    });

    const containerConfigMenu = screen.getByTestId("containerConfigMenu");

    expect(containerConfigMenu).toHaveClass(stylesMenu.containerConfig);

    fireEvent.click(imgConfigMenu);

    expect(containerConfigMenu).toHaveClass(stylesMenu.containerConfigOpen);
  });

  test("deve executar a funcao armazenada na prop 'functionSaveConfig' ao clicar no botao save e verificar seus valores", () => {
    const buttonSave = screen.getByRole("button", { name: /Save/i });

    const inputValueFocus = screen.getByTestId("input-focus");
    const inputValueShort = screen.getByTestId("input-short");
    const inputValueLong = screen.getByTestId("input-long");
    const inputValueCycle = screen.getByTestId("input-cycle");

    // Value tem que ser em minutos
    fireEvent.change(inputValueFocus, { target: { value: "20" } });
    fireEvent.change(inputValueShort, { target: { value: "5" } });
    fireEvent.change(inputValueLong, { target: { value: "10" } });
    fireEvent.change(inputValueCycle, { target: { value: "4" } });

    fireEvent.click(buttonSave);

    expect(saveConfigMock).toHaveBeenCalledTimes(1);

    const call = saveConfigMock.mock.calls[0];

    expect(call[1]).toBe(20 * 60);
    expect(call[2]).toBe(5 * 60);
    expect(call[3]).toBe(10 * 60);
    expect(call[4]).toBe(4);
  });
});
