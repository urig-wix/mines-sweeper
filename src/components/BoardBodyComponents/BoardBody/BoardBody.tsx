import React from "react";
import { useStore } from "../../../store/minesweeperStore";
import { Minefield } from "../Minefield/Minefield";
import s from "./BoardBody.module.css";
import { observer } from "mobx-react";

export const BoardBody = observer(() => {
  const store = useStore();

  return (
    <div data-testid="board-body" className={s["minefield"]}>
      {store.getMines.map((m, i) => (
        <Minefield
          mineNeigbhorsAmount={m.mineNeigbhorsCount}
          index={i}
          key={i}
          value={store.getMinefieldIcon(m)}
        />
      ))}
    </div>
  );
});
