import React from "react";
import { useStore } from "../../../store/minesweeperStore";
import { MinefieldValue } from "../../../types";
import s from "./Minefield.module.css";

export interface MinefieldProps {
  value: MinefieldValue;
  mineNeigbhorsAmount: number;
  index: number;
}

export function Minefield(props: MinefieldProps) {
  const store = useStore();
  const { value, index, mineNeigbhorsAmount } = props;

  return (
    <div
      data-testid={`minefield-item-${index}`}
      className={`${s["minefield-item"]} ${
        s[getMinefieldContent(value, mineNeigbhorsAmount)]
      }`}
      onContextMenu={(event) => {
        event.preventDefault();
        store.handleMinefieldRightClicked(index);
      }}
      onClick={(event) => {
        event.preventDefault();
        store.handleMinefieldClicked(index);
      }}
      onMouseLeave={(event) => {
        event.preventDefault();
        store.handleHoveredField(-1);
      }}
      onMouseEnter={(event) => {
        event.preventDefault();
        store.handleHoveredField(index);
      }}
    ></div>
  );
}

function getMinefieldContent(
  value: MinefieldValue,
  mineNeigbhorsAmount: number
): string {
  switch (value) {
    case MinefieldValue.covered:
      return "covered";
    case MinefieldValue.mine:
      return "mine";
    case MinefieldValue.flag:
      return "flag";
    case MinefieldValue.question:
      return "question";
  }
  return `mine${mineNeigbhorsAmount}`;
}
