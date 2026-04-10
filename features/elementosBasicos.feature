# language: pt
Funcionalidade: QA Playground - Elementos Básicos

  Contexto:
    Dado que estou na tela inicial QA Playground

  Cenário: CT-00 - Validação visualizar página inicial
    Então a URL atual deve ser a correta

  Cenário: CT-01 - Interação com o botão Clique aqui
    Quando clico no botão clique aqui
    Então valido que o botão clique aqui possui "1" clique

  Cenário: CT-02 - Interação com o botão Duplo Clique
    Quando clico no botão duplo clique
    Então valido que o botão duplo clique possui "1" clique

  Cenário: CT-03 - Interação com o campo de texto
    Quando escrevo no campo de texto "teste"
    Então valido que o campo de texto possui digitado "teste"

  Cenário: CT-04 - Interação com o dropdown customizado
    Quando seleciono a opcao no dropdown de framework "playwright"
    Então valido que o dropdown de framework exibe a opcao "Playwright"

  Cenário: CT-05 - Interação com o slider de intervalo
    Quando altero o valor do slider para "80"
    Então valido que o slider possui o valor "80"

  Cenário: CT-06 - Interação com o interruptor (switch) ativado
    Quando clico no interruptor
    Então valido que o interruptor esta ativado

  Cenário: CT-07 - Interação com o interruptor (switch) desativado
    Quando clico no interruptor
    Quando clico no interruptor
    Então valido que o interruptor esta desativado