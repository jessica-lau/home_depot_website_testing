var webdriver = require("selenium-webdriver"),
  By = webdriver.By;
require("selenium-webdriver/testing");
require("dotenv").config();
var assert = require("assert");
let chrome = require("selenium-webdriver/chrome");

describe("Home Page", () => {
  let driver;

  before(async () => {
    var capabilities = {
      browserName: "Chrome",
      browser_version: "60.0",
      os: "Windows",
      os_version: "10",
      resolution: "1920x1080",
      "browserstack.user": process.env.browserstack_user,
      "browserstack.key": process.env.browserstack_key,
      name: "B Sample Test",
    };
    //Note: run test on browserstacker:

    // var builder = new webdriver.Builder().
    //   usingServer('http://hub-cloud.browserstack.com/wd/hub').
    //   withCapabilities(capabilities);
    // driver = await builder.build();

    //Note: run test on local broswer:
    let localChromeOption = new chrome.Options();
    localChromeOption.addArguments("--start-maximized");

    driver = await new webdriver.Builder()
      .withCapabilities(webdriver.Capabilities.chrome())
      .setChromeOptions(localChromeOption)
      .build();

    console.log("started testing");
    //driver.manage().window().maximize();
    await driver.get("http://www.homedepot.com");
  });

  after(async () => {
    await driver.quit();
  });

  describe("Header", () => {
    it("should exist", async () => {
      let title = await driver.getTitle();
      console.log(assert.strictEqual(title, "The Home Depot"));
    });

    it("giftcards", async () => {
      let giftcards = await driver.findElement(By.linkText(`Gift Cards`));
      let isGiftcardsDisplayed = await giftcards.isDisplayed();
      assert.strictEqual(isGiftcardsDisplayed, 1);
      await giftcards.click();
      await driver.sleep(5000);
    });

    it("purchase giftcards", async () => {
      let buyGiftcards = await driver.findElement(
        By.css(`[alt="Purchase a Gift Card"]`)
      );
      let isBuyGiftcardsDisplayed = await buyGiftcards.isDisplayed();
      assert.strictEqual(isBuyGiftcardsDisplayed, 1);
      await buyGiftcards.click();
      await driver.sleep(5000);
    });

    it("recipient of giftcard", async () => {
      let recipientGiftcard = await driver.findElement(
        By.id(`recipientName-input`)
      );
      await recipientGiftcard.sendKeys("YB Lee");
      let senderGiftcard = await driver.findElement(By.id(`senderName-input`));
      await senderGiftcard.sendKeys("Jessica Lee");
      let pickGiftcard = await driver.findElement(
        By.css(`[data-cashbot-id="recipient-button-submit"]`)
      );
      let isPickGiftcardDisplayed = await pickGiftcard.isDisplayed();
      assert.strictEqual(isPickGiftcardDisplayed, 1);
      await pickGiftcard.click();
      await driver.sleep(5000);
    });

    it("giftcard type", async () => {
      let typeGiftcard = await driver.findElement(
        By.css(`[data-cashbot-id="cardType-btn-button-button"]`)
      );
      let isTypeGiftcardDisplayed = await typeGiftcard.isDisplayed();
      assert.strictEqual(isTypeGiftcardDisplayed, 1);
      await typeGiftcard.click();
      await driver.sleep(3000);
    });

    it("giftcard event and style", async () => {
      let eventGiftcard = await driver.findElement(
        By.id(`selectedGroupOrdinal-2-label`)
      );
      let isEventGiftcardDisplayed = await eventGiftcard.isDisplayed();
      assert.strictEqual(isEventGiftcardDisplayed, 1);
      await eventGiftcard.click();
      await driver.sleep(3000);
      let styleGiftcard = await driver.findElement(By.id(`faceplate-4-label`));
      let isStyleGiftcardDisplayed = await styleGiftcard.isDisplayed();
      assert.strictEqual(isStyleGiftcardDisplayed, 1);
      await styleGiftcard.click();
      await driver.sleep(5000);
    });

    it("giftcard amount & quantity", async () => {
      let amountGiftcard = await driver.findElement(By.css(`[type="submit"]`));
      let isAmountGiftcardDisplayed = await amountGiftcard.isDisplayed();
      assert.strictEqual(isAmountGiftcardDisplayed, 1);
      await amountGiftcard.click();
      await driver.sleep(3000);
    });

    it("giftcard message", async () => {
      let submitMessage = await driver.findElement(By.css(`[type="submit"]`));
      let isSubmitMessageDisplayed = await submitMessage.isDisplayed();
      assert.strictEqual(isSubmitMessageDisplayed, 1);
      await submitMessage.click();
      await driver.sleep(5000);
    });

    it("giftcard delivery email", async () => {
      let deliveryEmailText = await driver.findElement(
        By.className(`field-group__div`)
      );
      let isDeliveryEmailTextDisplayed = await deliveryEmailText.isDisplayed();
      assert.strictEqual(isDeliveryEmailTextDisplayed, 1);
      // let deliveryEmail = await driver.findElement(By.id(`recipientEmail-input`));
      // await deliveryEmail.sendKeys('test@gmail.com');
      await driver.sleep(3000);
      // let addToCart = await driver.findElement(By.css(`[data-cashbot-id="delivery-button-submit"]`));
      // let isAddToCartDisplayed = await addToCart.isDisplayed();
      // assert.equal(isAddToCartDisplayed, 1);
      // await addToCart.click();
      // await driver.sleep(2000);
    });
  });
});
