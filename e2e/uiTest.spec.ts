// Dynamic imports
import test from "./../lib/BaseTest";
import * as uiTestData from "./../testData/uiTestData.json";

let loggedIn: boolean;
test.beforeEach(async ({ loginPage }, testInfo) => {
    console.log(`Running Test Case -> ${testInfo.title}`);
    await test.step("Launch application", async () => {
        loggedIn = false;
        await loginPage.launchURL();
    });
});

test.afterEach(async ({ loginPage }, testInfo) => {
    console.log(`Wrapping up Test Case -> ${testInfo.title}`);
    await test.step("Logout of application", async () => {
        if (loggedIn) {
            await loginPage.logout();
        }
    });
});

test.describe("UI TESTS - Sauce Demo Positive scenarios", { tag: '@positive' }, async () => {
    test("TEST CASE 1 - Complete the end-to-end flow of a product order with 2 products", async ({ loginPage, productsPage, productInfoPage, cartPage, checkoutYourInfoPage, checkoutOverviewPage }) => {
        let products = uiTestData.products;
        let customerInfo = uiTestData.customerInfo;
        await loginPage.loginToApplication(
            process.env.STANDARD_USER!,
            process.env.PASSWORD!
        );
        loggedIn = true;
        for (let product of products) {
            await productsPage.clickProductByName(product.name);
            await productInfoPage.validateProductInfo(product);
            let cartQtyBefore = await productInfoPage.clickAddToCart();
            await productInfoPage.validateIncrementInCart(cartQtyBefore);
            await productInfoPage.clickBackToProducts();
        }
        await productsPage.clickCartIcon();
        await cartPage.validateProductsAdded(products);
        await cartPage.clickCheckout();
        await checkoutYourInfoPage.fillCustomerInfo(customerInfo);
        await checkoutYourInfoPage.clickContinue();
        await checkoutOverviewPage.validateProductsAdded(products);
        let itemTotal = await checkoutOverviewPage.validateItemTotal(products);
        await checkoutOverviewPage.validatePriceTotal(itemTotal);
        await checkoutOverviewPage.clickFinish();
        await checkoutOverviewPage.validateConfirmationMessage();
    });

    test("TEST CASE 2 - Validate the sort section of the Products page", async ({ loginPage, productsPage }) => {
        await loginPage.loginToApplication(
            process.env.STANDARD_USER!,
            process.env.PASSWORD!
        );
        loggedIn = true;
        const sortOptions = ['Name (A to Z)', 'Name (Z to A)', 'Price (low to high)', 'Price (high to low)']
        await productsPage.validateSortSelection('Name (A to Z)'); // Validate default selection
        for (const sortOption of sortOptions) {
            await productsPage.selectSortOption(sortOption);
            await productsPage.validateOrderOfProducts(sortOption);
        }
    });
});

test.describe("UI TESTS - Sauce Demo Negative scenarios", { tag: '@negative' }, async () => {
    test("TEST CASE 3 - Error User - Validate the non appearance confirmation message", async ({ loginPage, productsPage, productInfoPage, cartPage, checkoutYourInfoPage, checkoutOverviewPage }) => {
        let products = uiTestData.products;
        let customerInfo = uiTestData.customerInfo;
        await loginPage.loginToApplication(
            process.env.ERROR_USER!,
            process.env.PASSWORD!
        );
        loggedIn = true;
        for (let product of products) {
            await productsPage.clickProductByName(product.name);
            let cartQtyBefore = await productInfoPage.clickAddToCart();
            await productInfoPage.validateIncrementInCart(cartQtyBefore);
            await productInfoPage.clickBackToProducts();
        }
        await productsPage.clickCartIcon();
        await cartPage.validateProductsAdded(products);
        await cartPage.clickCheckout();
        await checkoutYourInfoPage.fillCustomerInfo(customerInfo);
        await checkoutYourInfoPage.clickContinue();
        await checkoutOverviewPage.validateProductsAdded(products);
        let itemTotal = await checkoutOverviewPage.validateItemTotal(products);
        await checkoutOverviewPage.validatePriceTotal(itemTotal);
        await checkoutOverviewPage.clickFinish();
        await checkoutOverviewPage.validateConfirmationMessageAbsence();
    });
});
