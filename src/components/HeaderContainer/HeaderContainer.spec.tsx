import { cleanup } from "@testing-library/react";
import { HeaderContainerDriver } from "./HeaderContainer.driver";

const mockMinesToFind = 123;
const mockGetClock = 456;
const mockMoves = 789;
const mockInitEmptyBoard = jest.fn();
let mockIsWin = false;
let mockIsLose = false;

jest.mock("../../store/minesweeperStore", () => ({
  useStore: () => {
    return {
      minesToFind: mockMinesToFind,
      getClock: mockGetClock,
      moves: mockMoves,
      isWin: mockIsWin,
      isLose: mockIsLose,
      initEmptyBoard: mockInitEmptyBoard,
    };
  },
}));

describe("Minefield", () => {
  let driver: HeaderContainerDriver;

  beforeEach(() => {
    driver = new HeaderContainerDriver();
    return driver.when.created();
  });

  it("should render component", async () => {
    expect(await driver.get.headerContainer()).toBeDefined();
  });

  it("should present the number of mines to find at left numbers pannel component", async () => {
    expect(
      driver.get.leftNumbersPanel.hundredsDigitOrMinus()?.classList
    ).toContainEqual("d1");
    expect(driver.get.leftNumbersPanel.tensDigit()?.classList).toContainEqual(
      "d2"
    );
    expect(driver.get.leftNumbersPanel.onesDigit()?.classList).toContainEqual(
      "d3"
    );
  });

  it("should present the clock's value at left numbers pannel component", async () => {
    expect(
      driver.get.rightNumbersPanel.hundredsDigitOrMinus()?.classList
    ).toContainEqual("d4");
    expect(driver.get.rightNumbersPanel.tensDigit()?.classList).toContainEqual(
      "d5"
    );
    expect(driver.get.rightNumbersPanel.onesDigit()?.classList).toContainEqual(
      "d6"
    );
  });

  it("should present number of moves at left numbers pannel component after a click", async () => {
    driver.get.rightNumbersPanel.rightNumbersPanel().click();
    expect(
      driver.get.rightNumbersPanel.hundredsDigitOrMinus()?.classList
    ).toContainEqual("d7");
    expect(driver.get.rightNumbersPanel.tensDigit()?.classList).toContainEqual(
      "d8"
    );
    expect(driver.get.rightNumbersPanel.onesDigit()?.classList).toContainEqual(
      "d9"
    );
  });

  it("should call init empty game when clicking smiley button", async () => {
    driver.get.smileyButton().click();
    expect(mockInitEmptyBoard).toHaveBeenCalled();
  });

  it("should change smiley button to sunglasses if winning", async () => {
    cleanup();
    mockIsWin = true;
    driver = new HeaderContainerDriver();
    driver.when.created();
    expect(driver.get.smileyButton().classList).toContainEqual("face-sunglasses");
  });

  it("should change smiley button to face-sad if losing", async () => {
    cleanup();
    mockIsLose = true;
    driver = new HeaderContainerDriver();
    driver.when.created();
    expect(driver.get.smileyButton().classList).toContainEqual("face-sad");
  });
});
