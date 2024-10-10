// Static Imports
import { Page, expect } from '@playwright/test';

export class CartPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async validateProductsAdded(products: Array<Object>) {
        for (let product of products) {
            expect(this.page.locator('div.cart_item').getByText(product['name'])).toBeVisible();
        }
    }
    
    async clickCheckout(): Promise<void> {
        await this.page.getByRole('button', { name: 'Checkout' }).click();
    }
}
