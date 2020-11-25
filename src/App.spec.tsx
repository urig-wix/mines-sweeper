import { AppDriver } from "./App.driver";

describe("App", () => {
  let driver: AppDriver;

  beforeEach(() => {
    driver = new AppDriver();
    return driver.given.setDefaultStore().when.created();
  });

  it("should renders app", async () => {
    expect(await driver.get.app()).toBeDefined();
  });

  it("should hover a minefield and press space mark a flag", async () => {
    const app = await driver.get.app();
    const minefield = await driver.get.minefieldAt(0);
    await driver.when.mouseEnter(minefield);
    await driver.when.keyDown(app, " ");
    expect(minefield.classList).toContain("flag");
  });

  it("should hover a minefield and press space twice mark a question", async () => {
    const app = await driver.get.app();
    const minefield = await driver.get.minefieldAt(0);
    await driver.when.mouseEnter(minefield);
    await driver.when.keyDown(app, " ");
    await driver.when.keyDown(app, " ");
    expect(minefield.classList).toContain("question");
  });

  it("should rightclicking a minefield mark a flag", async () => {
    const app = await driver.get.app();
    const minefield = await driver.get.minefieldAt(0);
    await driver.when.contextMenu(minefield);
    expect(minefield.classList).toContain("flag");
  });

  it("should rightclicking twice a minefield mark a question amrk", async () => {
    const app = await driver.get.app();
    const minefield = await driver.get.minefieldAt(0);
    await driver.when.contextMenu(minefield);
    await driver.when.contextMenu(minefield);
    expect(minefield.classList).toContain("question");
  });
});

describe("App check store logic", () => {
  let driver: AppDriver;

  beforeEach(() => {
    driver = new AppDriver();
  });

  it("should click a mine change the smiley be sad", async () => {
    await driver.given
      .withOneFieldOneMineBoard()
      .given.setCustomizedStore()
      .when.created();
    await driver.get.minefieldAt(0).click();
    expect(driver.get.smileyButton().classList).toContainEqual("face-sad");
  });

  it("should click a marked field do nothing", async () => {
    await driver.given
      .withTwoFieldsOneMineBoard()
      .given.withFreshGame()
      .given.setCustomizedStore()
      .when.created();
      const minefield = await driver.get.minefieldAt(0);
      await driver.when.contextMenu(minefield);
      minefield.click();
      expect(driver.get.smileyButton().classList).toContainEqual(
      "face-smile"
    );
  });

  it("should click a covered field after winning do nothing", async () => {
    await driver.given
      .withTwoFieldsOneMineBoard()
      .given.witWinnedGame()
      .given.setCustomizedStore()
      .when.created();
      const minefield = await driver.get.minefieldAt(0);
      minefield.click();
      expect(minefield.classList).toContainEqual(
      "covered"
    );
  });

  it("should right click a covered field after winning do nothing", async () => {
    await driver.given
      .withTwoFieldsOneMineBoard()
      .given.witWinnedGame()
      .given.setCustomizedStore()
      .when.created();
      const minefield = await driver.get.minefieldAt(0);
      await driver.when.contextMenu(minefield);
      expect(minefield.classList).toContainEqual(
      "covered"
    );
  });

  it("should click a covered field after losing do nothing", async () => {
    await driver.given
      .withTwoFieldsOneMineBoard()
      .given.witLosedGame()
      .given.setCustomizedStore()
      .when.created();
      const minefield = await driver.get.minefieldAt(0);
      minefield.click();
      expect(minefield.classList).toContainEqual(
      "covered"
    );
  });

  it("should click a covered field expouse niegbhors", async () => {
    await driver.given
      .withFourFieldsOneMineBoard()
      .given.setCustomizedStore()
      .when.created();
      const minefieldToClick = await driver.get.minefieldAt(0);
      const neigbhor = await driver.get.minefieldAt(1);
      minefieldToClick.click();
      expect(neigbhor.classList).toContainEqual(
      "mine0"
    );
  });
});
