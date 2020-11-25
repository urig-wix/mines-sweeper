import React from "react";
import "./App.css";
import { HeaderContainer } from "./components/HeaderContainer/HeaderContainer";
import { BoardBody } from "./components/BoardBodyComponents/BoardBody/BoardBody";
import mineSweeperStore, { StoreProvider } from "./store/minesweeperStore";

function App(props: {store: mineSweeperStore}) {

  const {store} = props;

  return (
    <StoreProvider value={store}>
      <div data-testid="app" className="container" tabIndex={0} onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => store.handleKeyDown(event)} >
        <HeaderContainer />
        <BoardBody />
      </div>
    </StoreProvider>
  );
}

export default App;
