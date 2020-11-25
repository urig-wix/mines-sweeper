import { BoardBodyDriver } from "./BoardBody.driver";

jest.mock("../../../store/minesweeperStore", () => ({
    useStore: () => {
      return {
        getMines: [
            {}
        ],
        getMinefieldIcon: jest.fn()
      };
    },
  }));

describe("Minefield", () => {
  let driver: BoardBodyDriver;


  beforeEach(() => {
    driver = new BoardBodyDriver();
    return driver.when.created();
  });

  it("should renders component", async () => {
    expect(await driver.get.boardBody()).toBeDefined();
  });

  it("should component has 'minefield' class", async () => {
    expect(await driver.get.boardBody().classList).toContainEqual("minefield");
  });
  
  it("should renders mimnefield", async () => {
    expect(await driver.get.minefieldAt(0)).toBeDefined();
  });
});
