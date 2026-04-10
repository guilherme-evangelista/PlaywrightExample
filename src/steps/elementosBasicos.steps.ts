import { createBdd } from 'playwright-bdd';
import { ElementosBasicosPage } from '../pages/ElementosBasicosPage';

const { Given, When, Then } = createBdd();

let elementosBasicosPage: ElementosBasicosPage;

Given('que estou na tela inicial QA Playground', async ({ page }) => {
    elementosBasicosPage = new ElementosBasicosPage(page);
    await elementosBasicosPage.acessarPagina();
});

When('clico no botão clique aqui', async () => {
    await elementosBasicosPage.clicarBotaoSimples();
});

When('clico no botão duplo clique', async () => {
    await elementosBasicosPage.clicarBotaoDuplo();
});

When('escrevo no campo de texto {string}', async ({}, texto: string) => {
    await elementosBasicosPage.preencherTexto(texto);
});

When('seleciono a opcao no dropdown de framework {string}', async ({}, framework: string) => {
    await elementosBasicosPage.selecionarDropdown(framework);
});

When('altero o valor do slider para {string}', async ({}, valor: string) => {
    await elementosBasicosPage.alterarSlider(valor);
});

When('clico no interruptor', async () => {
    await elementosBasicosPage.clicarInterruptor();
});

Then('a URL atual deve ser a correta', async () => {
    await elementosBasicosPage.validarUrlAtual();
});

Then('valido que o botão clique aqui possui {string} clique', async ({}, quantidade: string) => {
    await elementosBasicosPage.validarQuantidadeCliquesSimples(quantidade);
});

Then('valido que o botão duplo clique possui {string} clique', async ({}, quantidade: string) => {
    await elementosBasicosPage.validarQuantidadeCliquesDuplo(quantidade);
});

Then('valido que o campo de texto possui digitado {string}', async ({}, textoValidacao: string) => {
    await elementosBasicosPage.validarValorInput(textoValidacao);
});

Then('valido que o dropdown de framework exibe a opcao {string}', async ({}, textoEsperado: string) => {
    await elementosBasicosPage.validarOpcaoDropdown(textoEsperado);
});

Then('valido que o slider possui o valor {string}', async ({}, valor: string) => {
    await elementosBasicosPage.validarValorSlider(valor);
});

Then('valido que o interruptor esta ativado', async () => {
    await elementosBasicosPage.validarEstadoInterruptor(true);
});

Then('valido que o interruptor esta desativado', async () => {
    await elementosBasicosPage.validarEstadoInterruptor(false);
});