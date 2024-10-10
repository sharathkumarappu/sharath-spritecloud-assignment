// Static Imports
import { Page } from "@playwright/test";

export class WebActions {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Sample Utility
    async delay(time: number): Promise<void> {
        return new Promise(function (resolve) {
            setTimeout(resolve, time);
        });
    }

    // Sample Utility
    async clickByText(text: string): Promise<void> {
        await this.page.getByText(text, { exact: true }).click(); //Matches locator with exact text and clicks
    }

    // Sample Utility
    async clickElementJS(locator: string): Promise<void> {
        await this.page.$eval(locator, (element: HTMLElement) =>
            element.click()
        );
    }
}
