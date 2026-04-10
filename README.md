# 🎭 Automação E2E: Playwright + BDD

[![Pipeline Status](https://github.com/guilherme-evangelista/PlaywrightExample/actions/workflows/playwright.yml/badge.svg)](https://github.com/guilherme-evangelista/PlaywrightExample/actions)
[![Playwright Report](https://img.shields.io/badge/Playwright-HTML_Report-2EAD33?logo=playwright)](https://guilherme-evangelista.github.io/PlaywrightExample/)

Automação de interface para [QA Playground](https://playground-for-qa.vercel.app/playground) com **Playwright**, **TypeScript** e **BDD** (`playwright-bdd`). Usa Page Object Model (POM) e `BasePage` abstrata.

## 🚀 Tecnologias
* **Playwright**: Motor do navegador e asserções.
* **TypeScript**: Superconjunto para tipagem segura.
* **Playwright-BDD**: Framework de tradução Gherkin nativo.

## 📁 Estrutura
* `features/`: BDD (`.feature`).
* `src/pages/`: Page Objects.
* `src/steps/`: Step Definitions.
* `playwright.config.ts`: Orquestrador.

## ⚙️ Configuração Inicial
Instale o Node.js, clone e instale as dependências:
```bash
npm install
npx playwright install chromium
```

## ▶️ Executando os Testes
```bash
# Modo Headless (Background)
npx playwright test

# Modo Visual (UI Mode)
npx playwright test --ui
```

## 📊 Relatórios
A configuração global do projeto está parametrizada para capturar o estado da aplicação de forma inteligente (retain-on-failure). O relatório HTML é gerado automaticamente.

Se um teste quebrar, o Playwright anexará automaticamente no relatório:

    📸 Screenshot exata do instante do erro.

    🎥 Vídeo completo da execução do cenário.

    🕵️ Trace Viewer (log DOM, rede e console passo a passo).

Para abrir o painel visual do relatório localmente, utilize:

```bash
npx playwright show-report
```