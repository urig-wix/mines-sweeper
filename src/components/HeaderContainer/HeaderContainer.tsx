import { observer } from "mobx-react";
import React, { useState } from "react";
import { useStore } from "../../store/minesweeperStore";
import s from "./HeaderContainer.module.css";
import { NumbersPanel } from "./NumbersPanel/NumbersPanel";

export const HeaderContainer = observer(() => {
  const store = useStore();
  const [isShowClock, setIsShowClock] = useState(true);
  return (
    <div data-testid="header-container" className={s["minesweeper-header-wrapper"]}>
      <div className={s["minesweeper-header-container"]}>
        <div data-testid="left-numbers-panel"><NumbersPanel value={store.minesToFind}></NumbersPanel></div>
        
        <button data-testid="smiley-button"
          className={`${s["minesweeper-reset-button"]} ${s[getSmileyByGameStatus(store.isWin, store.isLose)]}`}
          onClick={() => store.initEmptyBoard()}
        ></button>
        <div data-testid="right-numbers-panel" onClick={() => setIsShowClock(!isShowClock)}><NumbersPanel value={isShowClock ? store.getClock : store.moves}></NumbersPanel></div>
      </div>
    </div>
  );
});

const getSmileyByGameStatus = (isWin: boolean, isLose: boolean): string => {
    if (isWin) {
        return "face-sunglasses";
    }
    if (isLose) {
        return "face-sad"
    }
    return "face-smile"
}
