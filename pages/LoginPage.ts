// Static Imports
import { Page, expect } from '@playwright/test';

// Object Imports
import { WebActions } from "../lib/WebActions";

let webActions: WebActions;

export class LoginPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        webActions = new WebActions(this.page);
    }

    async launchURL(): Promise<void> {
        await this.page.goto("/");
        await expect(this.page).toHaveTitle('Swag Labs');
    }

    async loginToApplication(username: string, password: string): Promise<void> {
        await this.page.getByRole('textbox', { name: 'Username' }).fill(username);
        await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
        await this.page.getByRole('button', { name: 'Login' }).click();
        await expect(this.page.locator('div.app_logo')).toBeVisible();
    }

    async logout(): Promise<void> {
        await this.page.getByRole('button', { name: 'Open Menu'}).click();
        await this.page.getByText('Logout').click();
    }
}
