import React from "react";
import { Minefield } from "./Minefield";
import { fireEvent, render, RenderResult } from "@testing-library/react";
import { MinefieldValue } from "../../../types";

export class MinefieldDriver {
  public component!: RenderResult;
  private value: MinefieldValue;
  private mineNeigbhorsAmount: number;

  constructor() {
    this.value = MinefieldValue.covered;
    this.mineNeigbhorsAmount = 0;
  }

  public given = {
    setFlagIcon: () => {
      this.value = MinefieldValue.flag;
      return this;
    },
    setEmptyIcon: () => {
      this.value = MinefieldValue.empty;
      return this;
    },
    setMineIcon: () => {
      this.value = MinefieldValue.mine;
      return this;
    },
    setQuestionIcon: () => {
      this.value = MinefieldValue.question;
      return this;
    },
    setMineNeigbhorsAmount: (amount: number) => {
      this.mineNeigbhorsAmount = amount;
      return this;
    },
  };

  public when = {
    created: async () => {
      this.component = render(
        <Minefield value={this.value} mineNeigbhorsAmount={this.mineNeigbhorsAmount} index={0} />
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
    minefield: () => this.component!.getByTestId("minefield-item-0"),
  };
}
