import { NumbersPanelDriver } from "./NumbersPanel.driver";

describe("Minefield", () => {
  let driver: NumbersPanelDriver;

  beforeEach(() => {
    driver = new NumbersPanelDriver();
  });

  it("should render a positive number least then 999", async () => {
    await driver.given.setValue(123).when.created();
    expect(await driver.get.hundredsDigitOrMinus().classList).toContainEqual("d1");
    expect(await driver.get.tensDigit().classList).toContainEqual("d2");
    expect(await driver.get.onesDigit().classList).toContainEqual("d3");
  });

  it("should render 999 for a number which is greater then 999", async () => {
    await driver.given.setValue(10000).when.created();
    expect(await driver.get.hundredsDigitOrMinus().classList).toContainEqual("d9");
    expect(await driver.get.tensDigit().classList).toContainEqual("d9");
    expect(await driver.get.onesDigit().classList).toContainEqual("d9");
  });

  it("should render negative number for a number which is in range -99 < number < -1", async () => {
    await driver.given.setValue(-6).when.created();
    expect(await driver.get.hundredsDigitOrMinus().classList).toContainEqual("dm");
    expect(await driver.get.tensDigit().classList).toContainEqual("d0");
    expect(await driver.get.onesDigit().classList).toContainEqual("d6");
  });

  it("should render -99 for a number which is least then -99", async () => {
    await driver.given.setValue(-1000).when.created();
    expect(await driver.get.hundredsDigitOrMinus().classList).toContainEqual("dm");
    expect(await driver.get.tensDigit().classList).toContainEqual("d9");
    expect(await driver.get.onesDigit().classList).toContainEqual("d9");
  });
});
