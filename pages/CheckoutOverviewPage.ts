// Static Imports
import { Page, expect } from '@playwright/test';

export class CheckoutOverviewPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async validateProductsAdded(products: Array<Object>): Promise<void> {
        for (let product of products) {
            expect(this.page.locator('div.cart_item').getByText(product['name'])).toBeVisible();
        }
    }

    async validateItemTotal(products: Array<Object>): Promise<number> {
        let expectedItemTotal = 0;
        for (let product of products) {
            expectedItemTotal = expectedItemTotal + Number(product['price'].substring(1));
        }
        let displayedItemTotal = await this.page.locator('div.summary_subtotal_label').innerText();
        let itemTotalNumber = Number(displayedItemTotal.substring(displayedItemTotal.indexOf('$') + 1));
        expect(itemTotalNumber).toBe(expectedItemTotal);
        return itemTotalNumber;
    }

    async validatePriceTotal(itemTotal: number): Promise<void> {
        let expectedPriceTotal = itemTotal * 1.08; // PriceTotal = Item Total + 8% tax
        expectedPriceTotal = Number(expectedPriceTotal.toFixed(2));
        let displayedPriceTotal = await this.page.locator('div.summary_total_label').innerText();
        let priceTotalNumber = Number(displayedPriceTotal.substring(displayedPriceTotal.indexOf('$') + 1));
        expect(priceTotalNumber).toBe(expectedPriceTotal);
    }

    async clickFinish(): Promise<void> {
        await this.page.getByRole('button', { name: 'Finish' }).click();
    }

    async validateConfirmationMessage(): Promise<void> {
        await expect(this.page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
        await expect(this.page.getByText('Your order has been dispatched, and will arrive just as fast as the pony can get there!')).toBeVisible();
    }

    async validateConfirmationMessageAbsence(): Promise<void> {
        await expect(this.page.getByRole('heading', { name: 'Thank you for your order!' })).not.toBeVisible({ timeout: 10000 });
    }
}
