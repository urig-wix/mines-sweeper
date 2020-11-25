import React from "react";
import { HeaderContainer } from "./HeaderContainer";
import { fireEvent, render, RenderResult } from "@testing-library/react";

export class HeaderContainerDriver {
  public component!: RenderResult;


  public given = {

  };

  public when = {
    created: async () => {
      this.component = render(
        <HeaderContainer />
      );
    },
    mouseEnter: (obj: any) => {
      fireEvent.mouseEnter(obj);
    },
    mouseLeave: (obj: any) => {
      fireEvent.mouseLeave(obj);
    },
    contextMenu: (obj: any) => {
      fireEvent.contextMenu(obj);
    },
  };

  public get = {
    headerContainer: () => this.component!.getByTestId("header-container"),
    leftNumbersPanel: {
        hundredsDigitOrMinus: () => this.component!.getByTestId("left-numbers-panel").querySelector("div[data-testid=hundreds-digit-or-minus]"),
        tensDigit: () => this.component!.getByTestId("left-numbers-panel").querySelector("div[data-testid=tens-digit]"),
        onesDigit: () => this.component!.getByTestId("left-numbers-panel").querySelector("div[data-testid=ones-digit]"),
    },
    rightNumbersPanel: {
        rightNumbersPanel: () => this.component!.getByTestId("right-numbers-panel"),
        hundredsDigitOrMinus: () => this.component!.getByTestId("right-numbers-panel").querySelector("div[data-testid=hundreds-digit-or-minus]"),
        tensDigit: () => this.component!.getByTestId("right-numbers-panel").querySelector("div[data-testid=tens-digit]"),
        onesDigit: () => this.component!.getByTestId("right-numbers-panel").querySelector("div[data-testid=ones-digit]"),
    },
    smileyButton: () => this.component!.getByTestId("smiley-button"),
  };
}
