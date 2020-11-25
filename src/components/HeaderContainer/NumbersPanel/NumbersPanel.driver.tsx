import React from "react";
import { NumbersPanel } from "./NumbersPanel";
import { render, RenderResult } from "@testing-library/react";

export class NumbersPanelDriver {
  public component: RenderResult | undefined;
  private value!: number;

  public given = {
    setValue: (value: number) =>  {
        this.value = value;
        return this;
    }
  };

  public when = {
    created: async () => {
      this.component = render(<NumbersPanel value={this.value} />);
    },
  };

  public get = {
    hundredsDigitOrMinus: () => this.component!.getByTestId("hundreds-digit-or-minus"),
    tensDigit: () => this.component!.getByTestId("tens-digit"),
    onesDigit: () => this.component!.getByTestId("ones-digit"),
  };
}
