import { MinefieldDriver } from "./Minefield.driver";

const mockHandleMinefieldRightClicked = jest.fn();
const mockHandleMinefieldClicked = jest.fn();
const mockHandleHoveredField = jest.fn();

jest.mock("../../../store/minesweeperStore", () => ({
  useStore: () => {
    return {
      handleMinefieldRightClicked: mockHandleMinefieldRightClicked,
      handleMinefieldClicked: mockHandleMinefieldClicked,
      handleHoveredField: mockHandleHoveredField,
    };
  },
}));

describe("Minefield", () => {
  let driver: MinefieldDriver;

  jest.mock("../../../store/minesweeperStore", () => ({
    useStore: () => {
      return {
        handleMinefieldRightClicked: jest.fn(),
      };
    },
  }));

  beforeEach(() => {
    driver = new MinefieldDriver();
    return driver.when.created();
  });

  it("should renders component", async () => {
    expect(await driver.get.minefield()).toBeDefined();
  });

  it("should handleMinefieldRightClicked be called with the minefield index", async () => {
    const minefield = await driver.get.minefield();
    await driver.when.contextMenu(minefield);
    expect(mockHandleMinefieldRightClicked).toHaveBeenCalledWith(0);
  });

  it("should handleMinefieldClicked be called with the minefield index", async () => {
    const minefield = await driver.get.minefield();
    await minefield.click();
    expect(mockHandleMinefieldClicked).toHaveBeenCalledWith(0);
  });

  it("should HandleHoveredField be called with the minefield index onMouseEnter", async () => {
    const minefield = await driver.get.minefield();
    await driver.when.mouseEnter(minefield);
    expect(mockHandleHoveredField).toHaveBeenCalledWith(0);
  });

  it("should HandleHoveredField be called with -1 onMouseLeave", async () => {
    const minefield = await driver.get.minefield();
    await driver.when.mouseLeave(minefield);
    expect(mockHandleHoveredField).toHaveBeenCalledWith(-1);
  });
});

describe("Minefield icons", () => {
  let driver: MinefieldDriver;

  beforeEach(() => {
    driver = new MinefieldDriver();
  });

  it("should render flag icon", async () => {
    await driver.given.setFlagIcon().when.created();
    const minefield = await driver.get.minefield();
    expect(minefield.classList).toContain("flag");
  });

  it("should render mine icon", async () => {
    await driver.given.setMineIcon().when.created();
    const minefield = await driver.get.minefield();
    expect(minefield.classList).toContain("mine");
  });

  it("should render question icon", async () => {
    await driver.given.setQuestionIcon().when.created();
    const minefield = await driver.get.minefield();
    expect(minefield.classList).toContain("question");
  });

  it("should render empty icon", async () => {
    await driver.given
      .setEmptyIcon()
      .given.setMineNeigbhorsAmount(0)
      .when.created();
    const minefield = await driver.get.minefield();
    expect(minefield.classList).toContain("mine0");
  });

  it("should render 1 neigbhors icon", async () => {
    await driver.given
      .setEmptyIcon()
      .given.setMineNeigbhorsAmount(1)
      .when.created();
    const minefield = await driver.get.minefield();
    expect(minefield.classList).toContain("mine1");
  });
});
