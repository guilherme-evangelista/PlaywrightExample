import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ElementosBasicosPage extends BasePage {
  

    private readonly elements = {
        btnCliqueAqui: 'button:has-text("Clique aqui")',
        btnDuploClique: 'button:has-text("Duplo clique")',
        inputTexto: 'input[placeholder="Digite algo..."]',
        dropdown: '[data-testid="section-elementos-basicos"] [data-testid="select-input"]',
        slider: 'input[data-testid="range-input"]',
        switchInterruptor: 'button[data-testid="toggle-switch"]',
        opcaoDropdown: (nome: string) => `button[data-testid="select-option-${nome}"]`
    };

    constructor(page: Page) {
        super(page);
    }

    async clicarBotaoSimples(): Promise<void> {
        await this.clickElement(this.elements.btnCliqueAqui);
    }

    async clicarBotaoDuplo(): Promise<void> {
        await this.doubleClickElement(this.elements.btnDuploClique);
    }

    async preencherTexto(texto: string): Promise<void> {
        await this.typeText(this.elements.inputTexto, texto);
    }

    async selecionarDropdown(opcao: string): Promise<void> {
        await this.clickElement(this.elements.dropdown);
        await this.clickElement(this.elements.opcaoDropdown(opcao));
    }

    async alterarSlider(valor: string): Promise<void> {
        await this.setSliderValue(this.elements.slider, valor);
    }

    async clicarInterruptor(): Promise<void> {
        await this.clickElement(this.elements.switchInterruptor);
    }

    async validarQuantidadeCliquesSimples(quantidade: string): Promise<void> {
        await this.validateText(this.elements.btnCliqueAqui, quantidade);
    }

    async validarQuantidadeCliquesDuplo(quantidade: string): Promise<void> {
        await this.validateText(this.elements.btnDuploClique, quantidade);
    }

    async validarValorInput(texto: string): Promise<void> {
        await this.validateValue(this.elements.inputTexto, texto);
    }

    async validarOpcaoDropdown(texto: string): Promise<void> {
        await this.validateText(this.elements.dropdown, texto);
    }

    async validarValorSlider(valor: string): Promise<void> {
        await this.validateValue(this.elements.slider, valor);
    }

    async validarEstadoInterruptor(estadoBooleano: boolean): Promise<void> {
        const estadoString = estadoBooleano ? 'true' : 'false';
        await this.validateAttribute(this.elements.switchInterruptor, 'aria-checked', estadoString);
    }
    
    async validarUrlAtual(): Promise<void> {
        await this.validateUrl('https://playground-for-qa.vercel.app/playground');
    }
}