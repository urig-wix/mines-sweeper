import React from "react";
import App from "./App";
import { fireEvent, render, RenderResult } from "@testing-library/react";
import mineSweeperStore from "./store/minesweeperStore";
import { MinefieldItem } from "./types";
import { minefieldItemBuilder } from "./builders";

export class AppDriver {
  public component: RenderResult | undefined;
  public store!: mineSweeperStore;
  private mines: MinefieldItem[];
  private clock: number;
  private moves: number;
  private isGameRunning: boolean;
  private isWin: boolean;
  private isLose: boolean;
  private minesAmount = 10;
  private numOfRows = 10;
  private numOfColumns = 10;

  constructor() {
    this.mines = [new minefieldItemBuilder().get()];
    this.clock = 0;
    this.isGameRunning = true;
    this.moves = 0;
    this.isWin = false;
    this.isLose = false;
    this.minesAmount = 10;
    this.numOfRows = 10;
    this.numOfColumns = 10;
  }

  public given = {
    withOneFieldOneMineBoard: () => {
      this.mines = [new minefieldItemBuilder().withIsMine(true).get()];
      this.numOfRows = 1;
      this.numOfColumns = 1;
      this.minesAmount = 1;
      return this;
    },
    withTwoFieldsOneMineBoard: () => {
      this.mines = [
        new minefieldItemBuilder().withIsMine(false).get(),
        new minefieldItemBuilder().withIsMine(true).get(),
      ];
      this.numOfRows = 1;
      this.numOfColumns = 2;
      this.minesAmount = 1;
      return this;
    },
    withFourFieldsOneMineBoard: () => {
      this.mines = [
        new minefieldItemBuilder().withIsMine(false).get(),
        new minefieldItemBuilder().withIsMine(false).get(),
        new minefieldItemBuilder().withIsMine(false).get(),
        new minefieldItemBuilder().withIsMine(true).get(),
      ];
      this.numOfRows = 1;
      this.numOfColumns = 3;
      this.minesAmount = 1;
      return this;
    },
    withFreshGame: () => {
      this.isGameRunning = false;
      return this;
    },
    witWinnedGame: () => {
      this.isWin = true;
      return this;
    },
    witLosedGame: () => {
      this.isLose = true;
      return this;
    },
    setCustomizedStore: () => {
      this.store = new mineSweeperStore();
      this.store.loadToStore(
        this.mines,
        this.clock,
        this.isGameRunning,
        this.isWin,
        this.isLose,
        this.moves,
        this.minesAmount,
        this.numOfRows,
        this.numOfColumns
      );
      return this;
    },
    setDefaultStore: () => {
      this.store = new mineSweeperStore();
      this.store.initEmptyBoard();
      return this;
    },
  };

  public when = {
    created: async () => {
      this.component = render(<App store={this.store} />);
    },
    mouseEnter: (obj: any) => {
      fireEvent.mouseEnter(obj);
    },
    keyDown: (obj: any, key: string) => {
      fireEvent.keyDown(obj, {
        key: key,
        code: "space",
      });
    },
    contextMenu: (obj: any) => {
      fireEvent.contextMenu(obj);
    },
  };

  public get = {
    app: () => this.component!.getByTestId("app"),
    minefieldAt: (id: number) =>
      this.component!.getByTestId(`minefield-item-${id}`),
    smileyButton: () => this.component!.getByTestId(`smiley-button`),
  };
}
