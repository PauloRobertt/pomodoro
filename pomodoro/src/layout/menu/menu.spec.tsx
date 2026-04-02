import Menu from "./menu";
import stylesMenu from "./menu.module.css";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, test, expect, beforeEach } from "vitest";

// Initial Values
const focusDefault = 1800;
const shortBreakDefault = 300;
const longBreakDefault = 900;
const cycleDefault = 2;

function functionTeste() {
  console.log("test");
}

describe("Menu", () => {
  beforeEach(() => {});
  test("deve renderizar corretamente", () => {
    const { getByText } = render(
      <Menu
        defaultValueFocus={focusDefault}
        defaultValueShortBreak={shortBreakDefault}
        defaultValueLongBreak={longBreakDefault}
        defaultValueCycle={cycleDefault}
        functionSaveConfig={functionTeste}
      />,
    );

    expect(getByText("Long Duration")).toBeInTheDocument();
  });

  test("deve mudar a classe do data-testId 'containerConfigMenu' ao ser clicado", () => {
    render(
      <Menu
        defaultValueFocus={focusDefault}
        defaultValueShortBreak={shortBreakDefault}
        defaultValueLongBreak={longBreakDefault}
        defaultValueCycle={cycleDefault}
        functionSaveConfig={functionTeste}
      />,
    );

    const imgConfigMenu = screen.getByRole("img", {
      name: /Icone configuração/i,
    });

    const containerConfigMenu = screen.getByTestId("containerConfigMenu");

    expect(containerConfigMenu).toHaveClass(stylesMenu.containerConfig);

    fireEvent.click(imgConfigMenu);

    expect(containerConfigMenu).toHaveClass(stylesMenu.containerConfigOpen);
  });
});
