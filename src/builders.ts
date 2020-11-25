import { MinefieldItem } from "./types";

export class minefieldItemBuilder {
  private isCovered = true;
  private isMine = false;
  private isQuestionMark = false;
  private isMarkedAsMine = false;
  private mineNeigbhorsCount = 0;

  public get = () => {
    return {
        isCovered: this.isCovered,
        isMine: this.isMine,
        isQuestionMark: this.isQuestionMark,
        isMarkedAsMine: this.isMarkedAsMine,
        mineNeigbhorsCount: this.mineNeigbhorsCount,
    };
  };
  public withIsCovered = (isCovered: boolean) => {
    this.isCovered = isCovered;
    return this;
  };
  public withIsMine = (isMine: boolean) => {
    this.isMine = isMine;
    return this;
  };
  public withIsQuestionMark = (isQuestionMark: boolean) => {
    this.isQuestionMark = isQuestionMark;
    return this;
  };
  public withIsMarkedAsMine = (isMarkedAsMine: boolean) => {
    this.isMarkedAsMine = isMarkedAsMine;
    return this;
  };
  public withMineNeigbhorsCount = (mineNeigbhorsCount: 0) => {
    this.mineNeigbhorsCount = mineNeigbhorsCount;
    return this;
  };
}
