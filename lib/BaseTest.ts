// Static Imports
import { test as baseTest } from '@playwright/test';

// Object Imports
import { WebActions } from './WebActions'
import { LoginPage } from '../pages/LoginPage'
import { ProductsPage } from '../pages/ProductsPage';
import { ProductInfoPage } from '../pages/ProductInfoPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutYourInfoPage } from '../pages/CheckoutYourInfoPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';

const test = baseTest.extend<{
    webActions: WebActions;
    loginPage: LoginPage;
    productsPage: ProductsPage;
    productInfoPage: ProductInfoPage;
    cartPage: CartPage;
    checkoutYourInfoPage: CheckoutYourInfoPage;
    checkoutOverviewPage: CheckoutOverviewPage;
}>({
    webActions: async ({ page }, use) => {
        await use(new WebActions(page));
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    productsPage: async ({ page }, use) => {
        await use(new ProductsPage(page));
    },
    productInfoPage: async ({ page }, use) => {
        await use(new ProductInfoPage(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
    checkoutYourInfoPage: async ({ page }, use) => {
        await use(new CheckoutYourInfoPage(page));
    },
    checkoutOverviewPage: async ({ page }, use) => {
        await use(new CheckoutOverviewPage(page));
    }
})

export default test;
