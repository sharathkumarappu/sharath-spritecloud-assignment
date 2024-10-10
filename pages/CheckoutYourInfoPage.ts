// Static Imports
import { Page } from '@playwright/test';

export class CheckoutYourInfoPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async fillCustomerInfo(customerInfo: Object): Promise<void> {
        await this.page.getByPlaceholder('First Name').fill(customerInfo['firstName']);
        await this.page.getByPlaceholder('Last Name').fill(customerInfo['lastName']);
        await this.page.getByPlaceholder('Zip/Postal Code').fill(customerInfo['zipCode']);
    }

    async clickContinue(): Promise<void> {
        await this.page.getByText('Continue').click();
    }
}
