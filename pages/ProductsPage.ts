// Static Imports
import { Page, expect } from '@playwright/test';

export class ProductsPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async clickProductByName(productName: string): Promise<void> {
        await this.page.locator('a', { has: this.page.getByText(productName, { exact: true }) }).click();
    }

    async clickCartIcon(): Promise<void> {
        await this.page.locator('a.shopping_cart_link').click();
    }

    async validateSortSelection(selectedValue: string): Promise<void> {
        expect(this.page.locator('span.active_option')).toHaveText(selectedValue, {timeout: 5000});
    }

    async selectSortOption(valueToBeSelected: string): Promise<void> {
        await this.page.locator('select.product_sort_container').selectOption({ label: valueToBeSelected }, {force: true});
        await this.validateSortSelection(valueToBeSelected);
    }

    async validateOrderOfProducts(selectedOrder: string): Promise<void> {
        let productNamesDisplayedOrder = await this.page.locator('div.inventory_item div.inventory_item_name').allInnerTexts();
        let productPricesDisplayedOrder = await this.page.locator('div.inventory_item div.inventory_item_price').allInnerTexts();
        switch(selectedOrder) {
            case "Name (A to Z)": {
                for ( let i = 1; i < productNamesDisplayedOrder.length; i++ ) {
                    expect(productNamesDisplayedOrder[i].localeCompare(productNamesDisplayedOrder[i-1])).toBeGreaterThanOrEqual(0);
                }
                break;
            }
            case "Name (Z to A)": {
                for ( let i = 1; i < productNamesDisplayedOrder.length; i++ ) {
                    expect(productNamesDisplayedOrder[i].localeCompare(productNamesDisplayedOrder[i-1])).toBeLessThanOrEqual(0);
                }
                break;
            }
            case "Price (low to high)": {
                for ( let i = 1; i < productPricesDisplayedOrder.length; i++ ) {
                    let currentPrice = Number(productPricesDisplayedOrder[i].substring(productPricesDisplayedOrder[i].indexOf('$') + 1));
                    let previousPrice = Number(productPricesDisplayedOrder[i-1].substring(productPricesDisplayedOrder[i-1].indexOf('$') + 1));
                    expect(currentPrice).toBeGreaterThanOrEqual(previousPrice);
                }
                break;
            }
            case "Price (high to low)": {
                for ( let i = 1; i < productPricesDisplayedOrder.length; i++ ) {
                    let currentPrice = Number(productPricesDisplayedOrder[i].substring(productPricesDisplayedOrder[i].indexOf('$') + 1));
                    let previousPrice = Number(productPricesDisplayedOrder[i-1].substring(productPricesDisplayedOrder[i-1].indexOf('$') + 1));
                    expect(currentPrice).toBeLessThanOrEqual(previousPrice);
                }
                break;
            }
        }
    }
}
