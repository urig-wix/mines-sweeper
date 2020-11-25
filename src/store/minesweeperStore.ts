import { action, computed, makeObservable, observable } from "mobx";
import { useContext } from "react";
import { createContext } from "react";
import { MinefieldItem, MinefieldValue } from "../types";

export default class mineSweeperStore {
  constructor() {
    makeObservable(this);
  }

  @observable public mines: MinefieldItem[] = [];
  @observable public clock = 0;
  @observable public isGameRunning = false;
  @observable public isWin = false;
  @observable public isLose = false;
  @observable public moves = 0;

  private minesAmount = 10;
  private numOfRows = 10;
  private numOfColumns = 10;

  private clockInterval = 0;
  private hoveredField = -1;

  public get getMines() {
    return this.mines;
  }

  public get getClock() {
    return this.clock;
  }

  @action
  public loadToStore(
    mines: MinefieldItem[],
    clock: number,
    isGameRunning: boolean,
    isWin: boolean,
    isLose: boolean,
    moves: number,
    minesAmount: number,
    numOfRows: number,
    numOfColumns: number
  ) {
    this.mines = mines;
    this.clock = clock;
    this.isGameRunning = isGameRunning;
    this.isWin = isWin;
    this.isLose = isLose;
    this.moves = moves;
    this.minesAmount = minesAmount;
    this.numOfRows = numOfRows;
    this.numOfColumns = numOfColumns;
  }

  @computed
  public get minesToFind() {
    return this.minesAmount - this.mines.filter((m) => m.isMarkedAsMine).length;
  }

  @action
  public handleHoveredField(index: number) {
    this.hoveredField = index;
  }

  public handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === " " && this.hoveredField !== -1) {
      this.handleMinefieldRightClicked(this.hoveredField);
    }
  }

  public getMinefieldIcon(minefiledItem: MinefieldItem): MinefieldValue {
    const covered =
      minefiledItem.isCovered &&
      !minefiledItem.isMarkedAsMine &&
      !minefiledItem.isQuestionMark;
    const flag =
      minefiledItem.isCovered &&
      minefiledItem.isMarkedAsMine &&
      !minefiledItem.isQuestionMark;
    const question =
      minefiledItem.isCovered &&
      !minefiledItem.isMarkedAsMine &&
      minefiledItem.isQuestionMark;
    const markedAsMine =
      !minefiledItem.isCovered && minefiledItem.isMarkedAsMine;
    const mine = !minefiledItem.isCovered && minefiledItem.isMine;

    if (covered) {
      return MinefieldValue.covered;
    }
    if (flag) {
      return MinefieldValue.flag;
    }
    if (question) {
      return MinefieldValue.question;
    }
    if (mine) {
      return MinefieldValue.mine;
    }
    if (markedAsMine) {
      return MinefieldValue.flag;
    }
    return MinefieldValue.empty;
  }

  @action
  public handleMinefieldRightClicked(index: number) {
    if (this.isLose || this.isWin) {
      return;
    }
    const minefield = this.mines[index];
    if (!minefield.isCovered) {
      return;
    }
    this.moves++;
    if (minefield.isMarkedAsMine) {
      minefield.isMarkedAsMine = false;
      minefield.isQuestionMark = true;
      return;
    }
    if (minefield.isQuestionMark) {
      minefield.isQuestionMark = false;
      return;
    }
    minefield.isMarkedAsMine = true;
  }

  @action
  public handleMinefieldClicked = (index: number) => {
    if (this.isLose || this.isWin) {
      return;
    }
    if (!this.isGameRunning) {
      this.initGame(index);
    }
    const minefield = this.mines[index];
    if (
      !minefield.isCovered ||
      minefield.isMarkedAsMine ||
      minefield.isQuestionMark
    ) {
      return;
    }
    this.moves++;
    minefield.isCovered = false;
    if (minefield.isMine) {
      this.onClickMine();
    }
    this.uncoverFieldNeigborsIfNeeded(index);
    if (
      this.minesToFind + this.mines.filter((m) => m.isMine).length ===
      this.mines.length
    ) {
      this.isWin = true;
    }
  };

  @action
  public onClickMine() {
    this.isGameRunning = false;
    this.isLose = true;
    this.stopClock();
  }

  @action
  public initClock() {
    this.clockInterval = window.setInterval(() => {
      if (this.clock === 999) {
        this.stopClock();
        return;
      }
      this.clock++;
    }, 1000);
  }

  @action
  public initGame(indexOfClickedField: number) {
    this.isGameRunning = true;
    let settedMines = 0;
    const set = new Set();
    set.add(indexOfClickedField);
    while (settedMines < this.minesAmount) {
      const index = Math.floor(
        Math.random() * this.numOfColumns * this.numOfRows
      );
      if (!set.has(index)) {
        this.mines[index].isMine = true;
        set.add(index);
        settedMines++;
      }
    }
    this.mines.forEach((m, i) => {
      m.mineNeigbhorsCount = this.countMineNeigbhors(i);
    });
    this.initClock();
  }

  @action
  private uncoverFieldNeigborsIfNeeded(index: number) {
    const neigbhorsIndexes = [index];
    while (neigbhorsIndexes.length) {
      const fieldIndex = neigbhorsIndexes.pop()!;
      this.mines[fieldIndex].isCovered = false;
      const neigbhorsToOpen = this.getFieldNeigbhorsIndexes(fieldIndex).filter(
        (neigbhorIndex) =>
          this.mines[neigbhorIndex].isCovered &&
          !this.mines[neigbhorIndex].isMine &&
          !this.mines[neigbhorIndex].isQuestionMark &&
          !this.mines[neigbhorIndex].isMarkedAsMine &&
          !this.mines[neigbhorIndex].mineNeigbhorsCount
      );
      neigbhorsIndexes.push(...neigbhorsToOpen);
    }
  }

  private countMineNeigbhors(index: number): number {
    const res1 = this.getFieldNeigbhorsIndexes(index);
    const res2 = res1.filter(
      (neigbhorIndex) => this.mines[neigbhorIndex].isMine
    );
    return res2.length;
    // const res = this.getFieldNeigbhorsIndexes(index).filter(
    //   (neigbhorIndex) => this.mines[neigbhorIndex].isMine
    // ).length;

    return this.getFieldNeigbhorsIndexes(index)?.filter(
      (neigbhorIndex) => this.mines[neigbhorIndex].isMine
    ).length;
  }

  private getFieldNeigbhorsIndexes(index: number) {
    const leftNeigbhor = index - 1;
    const rightNeigbhor = index + 1;
    const upperNeigbhor = index - this.numOfColumns;
    const bottomNeigbhor = index + this.numOfColumns;
    const leftUpperDiagonalNeigbhor = index - this.numOfColumns - 1;
    const rightUpperDiagonalNeigbhor = index - (this.numOfColumns - 1);
    const leftBottomDiagonalNeigbhor = index + (this.numOfColumns - 1);
    const rightBottomDiagonalNeigbhor = index + this.numOfColumns + 1;
    let potentialNeigbhors: number[] = [
      leftNeigbhor,
      rightNeigbhor,
      upperNeigbhor,
      bottomNeigbhor,
      leftUpperDiagonalNeigbhor,
      rightUpperDiagonalNeigbhor,
      leftBottomDiagonalNeigbhor,
      rightBottomDiagonalNeigbhor,
    ];

    const isRightmostColumn =
      index % this.numOfColumns === this.numOfColumns - 1;
    const isLeftmostColumn = index % this.numOfColumns === 0;
    const isHighestRow = index < this.numOfColumns;
    const isLowestRow = index >= this.numOfColumns * (this.numOfRows - 1);

    if (isRightmostColumn) {
      potentialNeigbhors = potentialNeigbhors.filter(
        (item) =>
          [
            rightNeigbhor,
            rightUpperDiagonalNeigbhor,
            rightBottomDiagonalNeigbhor,
          ].indexOf(item) === -1
      );
    }
    if (isLeftmostColumn) {
      potentialNeigbhors = potentialNeigbhors.filter(
        (item) =>
          [
            leftNeigbhor,
            leftUpperDiagonalNeigbhor,
            leftBottomDiagonalNeigbhor,
          ].indexOf(item) === -1
      );
    }
    if (isHighestRow) {
      potentialNeigbhors = potentialNeigbhors.filter(
        (item) =>
          [
            upperNeigbhor,
            leftUpperDiagonalNeigbhor,
            rightUpperDiagonalNeigbhor,
          ].indexOf(item) === -1
      );
    }
    if (isLowestRow) {
      potentialNeigbhors = potentialNeigbhors.filter(
        (item) =>
          [
            bottomNeigbhor,
            leftBottomDiagonalNeigbhor,
            rightBottomDiagonalNeigbhor,
          ].indexOf(item) === -1
      );
    }
    return potentialNeigbhors.filter(
      (n) => n >= 0 && n <= this.numOfColumns * this.numOfRows
    );
  }

  public stopClock() {
    window.clearInterval(this.clockInterval);
    this.clockInterval = 0;
  }

  @action
  public initEmptyBoard() {
    this.stopClock();
    this.clock = 0;
    this.mines = [];
    this.isGameRunning = false;
    this.isLose = false;
    this.isWin = false;
    this.moves = 0;
    for (let i = 0; i < this.numOfColumns * this.numOfRows; i++) {
      this.mines.push({
        isCovered: true,
        isMine: false,
        isQuestionMark: false,
        isMarkedAsMine: false,
        mineNeigbhorsCount: 0,
      });
    }
  }
}

export const StoreContext = createContext<mineSweeperStore>(
  {} as mineSweeperStore
);
export const StoreProvider = StoreContext.Provider;
export const useStore = (): mineSweeperStore => useContext(StoreContext);
