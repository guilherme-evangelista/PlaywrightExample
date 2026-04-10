import { Page, Locator, expect } from '@playwright/test';

export abstract class BasePage {
    constructor(protected page: Page) {}

    async acessarPagina(): Promise<void> {
        await this.page.goto('https://playground-for-qa.vercel.app/playground', { 
            waitUntil: 'domcontentloaded' 
        });
        await this.page.locator('text="Elementos Básicos"').first().waitFor({ state: 'visible' });
    }

    async stubWindowOpen(actionToTriggerPopup: () => Promise<void>): Promise<Page> {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            actionToTriggerPopup()
        ]);
        return newPage;
    }

    private getLocator(selector: string | Locator): Locator {
        return typeof selector === 'string' ? this.page.locator(selector) : selector;
    }

    async clickElement(selector: string | Locator): Promise<void> {
        const element = this.getLocator(selector);
        await element.waitFor({ state: 'visible' });
        await element.click();
    }

    async doubleClickElement(selector: string | Locator): Promise<void> {
        const element = this.getLocator(selector);
        await element.waitFor({ state: 'visible' });
        await element.dblclick();
    }

    async typeText(selector: string | Locator, text: string): Promise<void> {
        const element = this.getLocator(selector);
        await element.waitFor({ state: 'visible' });
        await element.fill(text);
    }

    async pressKey(selector: string | Locator, keyCommand: string): Promise<void> {
        const element = this.getLocator(selector);
        await element.waitFor({ state: 'visible' });
        await element.press(keyCommand);
    }

    async selectOption(selector: string | Locator, optionValue: string): Promise<void> {
        const element = this.getLocator(selector);
        await element.waitFor({ state: 'visible' });
        await element.selectOption(optionValue);
    }

    async checkElement(selector: string | Locator): Promise<void> {
        const element = this.getLocator(selector);
        await element.waitFor({ state: 'visible' });
        await element.check({ force: true });
    }

    async uncheckElement(selector: string | Locator): Promise<void> {
        const element = this.getLocator(selector);
        await element.waitFor({ state: 'visible' });
        await element.uncheck({ force: true });
    }

    async setSliderValue(selector: string | Locator, targetValue: string): Promise<void> {
        const element = this.getLocator(selector);
        await element.waitFor({ state: 'visible' });

        const box = await element.boundingBox();
        if (box) {
            const percentage = Number(targetValue) / 100;
            const targetMouseX = box.x + (box.width * percentage);
            const targetMouseY = box.y + (box.height / 2);
            await this.page.mouse.click(targetMouseX, targetMouseY);
        }

        let currentValue = Number(await element.inputValue());
        const target = Number(targetValue);

        while (currentValue !== target) {
            await element.press(currentValue < target ? 'ArrowRight' : 'ArrowLeft');
            currentValue = Number(await element.inputValue());
        }
    }

    async clickElementByText(text: string): Promise<void> {
        const element = this.page.getByText(text, { exact: false }).first();
        await element.waitFor({ state: 'visible' });
        await element.click();
    }

    async acceptAlertOrConfirm(): Promise<void> {
        this.page.once('dialog', dialog => dialog.accept());
    }

    async cancelConfirm(): Promise<void> {
        this.page.once('dialog', dialog => dialog.dismiss());
    }

    async typeInPrompt(textToType: string): Promise<void> {
        this.page.once('dialog', dialog => dialog.accept(textToType));
    }

    async validateAlertText(expectedText: string): Promise<void> {
        this.page.once('dialog', dialog => {
            expect(dialog.message()).toContain(expectedText);
            dialog.accept();
        });
    }

    async validateConfirmText(expectedText: string): Promise<void> {
        this.page.once('dialog', dialog => {
            expect(dialog.message()).toContain(expectedText);
            dialog.accept();
        });
    }

    async validateUrl(expectedUrl: string): Promise<void> {
        await expect(this.page).toHaveURL(expectedUrl);
    }

    async validateText(selector: string | Locator, expectedText: string): Promise<void> {
        const element = this.getLocator(selector);
        await expect(element).toContainText(expectedText);
    }

    async validateTextOnScreen(expectedText: string): Promise<void> {
        const element = this.page.getByText(expectedText, { exact: false }).first();
        await expect(element).toBeVisible();
    }

    async validateTextDoesNotExist(expectedText: string): Promise<void> {
        const element = this.page.getByText(expectedText, { exact: false }).first();
        await expect(element).toBeHidden();
    }

    async validateValue(selector: string | Locator, expectedValue: string): Promise<void> {
        const element = this.getLocator(selector);
        await expect(element).toHaveValue(expectedValue);
    }

    async validateAttribute(selector: string | Locator, attribute: string, expectedValue: string): Promise<void> {
        const element = this.getLocator(selector);
        await expect(element).toHaveAttribute(attribute, expectedValue);
    }

    async validateElementIsVisible(selector: string | Locator): Promise<void> {
        const element = this.getLocator(selector);
        await expect(element).toBeVisible();
    }

    async validateElementExists(selector: string | Locator): Promise<void> {
        const element = this.getLocator(selector);
        await expect(element).toBeAttached();
    }

    async validateTextExists(expectedText: string): Promise<void> {
        await this.validateTextOnScreen(expectedText);
    }

    async validateElementDoesNotExist(selector: string | Locator): Promise<void> {
        const element = this.getLocator(selector);
        await expect(element).toBeHidden();
    }

    async validateElementIsChecked(selector: string | Locator): Promise<void> {
        const element = this.getLocator(selector);
        await expect(element).toBeChecked();
    }

    async validateElementIsNotChecked(selector: string | Locator): Promise<void> {
        const element = this.getLocator(selector);
        await expect(element).not.toBeChecked();
    }

    async validateElementDoesNotContainText(selector: string | Locator, text: string): Promise<void> {
        const element = this.getLocator(selector);
        await expect(element).not.toContainText(text);
    }

    async validateQuantityOfElements(selector: string | Locator, expectedQuantity: number): Promise<void> {
        const element = this.getLocator(selector);
        await expect(element).toHaveCount(expectedQuantity);
    }

    async validateInnerTextOfElement(selector: string | Locator, expectedText: string): Promise<void> {
        const element = this.getLocator(selector);
        await expect(element).toHaveText(expectedText);
    }

    async validateTextsInElementsAreSortedByAscendingOrder(selector: string | Locator): Promise<void> {
        const element = this.getLocator(selector);
        const screenTexts = await element.allInnerTexts();
        const expectedSortedTexts = [...screenTexts].sort((a, b) => a.localeCompare(b, 'pt-BR'));
        expect(screenTexts).toEqual(expectedSortedTexts);
    }
}