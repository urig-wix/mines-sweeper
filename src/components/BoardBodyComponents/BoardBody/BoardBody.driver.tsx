import React from "react";
import { BoardBody } from "./BoardBody";
import { render, RenderResult } from "@testing-library/react";

export class BoardBodyDriver {
  public component!: RenderResult;

  public given = {
    
  };

  public when = {
    created: async () => {
      this.component = render(
        <BoardBody />
      );
    },
  };

  public get = {
    boardBody: () => this.component!.getByTestId("board-body"),
    minefieldAt: (index: number) => this.component!.getByTestId(`minefield-item-${index}`),
  };
}
