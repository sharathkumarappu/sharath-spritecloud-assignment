// Static Imports
import { Page, expect } from '@playwright/test';

export class ProductInfoPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async validateProductInfo(product: Object): Promise<void> {
        expect(this.page.locator('[data-test=inventory-item-name]')).toHaveText(product['name']);
        expect(this.page.locator('[data-test=inventory-item-desc]')).toHaveText(product['description']);
        expect(this.page.locator('[data-test=inventory-item-price]')).toHaveText(product['price']);
    }

    async clickBackToProducts(): Promise<void> {
        await this.page.getByRole('button', { name: 'Back to products' }).click();
    }

    async clickAddToCart(): Promise<number> {
        let numberBefore: number;
        if (await this.page.locator('span.shopping_cart_badge').isVisible()) {
            numberBefore = Number(await this.page.locator('span.shopping_cart_badge').innerText());
        } else {
            numberBefore = 0;
        }
        await this.page.getByRole('button', { name: 'Add to cart'}).click();
        return numberBefore;
    }

    async validateIncrementInCart(cartQtyBefore: number): Promise<void> {
        expect(Number(await this.page.locator('span.shopping_cart_badge').innerText())).toBe(cartQtyBefore + 1);
    }
}
