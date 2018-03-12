# movingbrasil-protractor-test
Automação de Teste com Protractor (Workshop Moving Brasil)

<p align="center">
   <i><strong>Projeto base para automação de teste com protractor, cucumber e typescript.
  </strong></i>
<p>

[Link da apresentação](http://www.slideshare.net/slideshow/embed_code/key/eWRY2By6ERDQD3)

<p align="center">
<a href=""><img alt="typescript" src="https://badges.frapsoft.com/typescript/code/typescript.svg?v=101">
<a href="https://opensource.org/licenses/MIT"><img alt="MIT License" src="https://img.shields.io/dub/l/vibe-d.svg"></a>
</p>

---
# movingbrasil-protractor-test

## Introdução
Projeto criado com o intuito de facilitar a automação de testes dos projetos baseados em Angular e não Angular, bem como, demonstrar as melhores práticas e ferramentas para o desenvolvimento e execução dos testes.

#### Funcionalidades:
* ts-node(typescript execução dirigido para node.js) no cucumberOpts;
* todos os scripts escritos em TypeScript e Cucumber 3.0;
* Estruturas de pastas limpas com arquivos js transpilados em pasta de saída separada;
* Implementação com padrão de design PageObject;
* Implementado hooks para BeforeFeature, AfterScenarios, etc.;
* Captura de tela quando houver falha na feature/scenario.

### Protractor
O Protractor é uma estrutura de teste end-to-end (de ponta a ponta) para aplicações Angular e AngularJS. O Protractor é construído em cima do WebDriverJS, que usa eventos nativos e drivers específicos do navegador para interagir com seu aplicativo como um usuário o faria.

[Protractor API](http://www.protractortest.org/#/api)

### TypeScript
TypeScript é uma linguagem para desenvolvimento JavaScript em larga escala. Com TypeScript podemos escrever código utilizando uma estrutura fortemente tipada e ter este código compilado para JavaScript puro. Características: 

* Qualquer navegador;
* Qualquer host;
* Qualquer sistema operacional;
* Código aberto.

[TypeScript Documentation](https://www.typescriptlang.org/docs/home.html)

### Cucumber
O Cucumber é uma ferramenta de teste que suporta Behavior Driven Development quadro (BDD). Ele define o comportamento do aplicativo usando texto em Inglês simples, definido por uma linguagem chamada Gherkin.

Cucumber permite validação funcional de automação que é facilmente lido e compreendido. Cucumber foi inicialmente implementado em Ruby e depois estendido para framework Java.

O BDD em si, serve para criar testes e integrar regras de negócios com a linguagem de programação, focando no comportamento do software. Além disso, ainda melhora a comunicação entre as equipes de desenvolvimento e testes, aumentando o compartilhamento de conhecimento entre elas. Sendo útil em projetos de software ágeis, que são construídos em várias iterações e estão sofrendo alterações ao longo do seu ciclo de vida. Quanto maior o projeto, mais difícil será a comunicação. Entretanto, BDD propõe uma forma eficaz de resolver estes problemas.

[Cucumber Tutorial](http://www.w3ii.com/pt/cucumber/default.html)

## Para começar:
#### Pré-requisito
1. NodeJS instalado globalmente no sistema operacional
https://nodejs.org/en/download/ ;

2. Git instalado;

3. Navegador Chrome ou Firefox instalado;

4. JAVA SDK: http://www.oracle.com/technetwork/java/javase/downloads/jdk9-downloads-3848520.html ; 

4. Editor de texto (Opcional) instalado => Sublime/VSCode/Atom/Sublime

**Editor padrão:** *VSCode (Visual Studio Code). Instalar os plugins [Cucumber (Gherkin)] by Steve Purves e [vscode-icons] by Roberto Huertas.*

#### Setup Scripts:
* Clique no botão [Clone or download] para copiar o link.
**Caso realize o download do arquivo, descompacte na pasta desejada e abra a pasta raiz no prompt de comando (Para máquinas sem Git).

* Pelo prompt de comando/terminal, acesse a pasta a qual deseja salvar o projeto;

* Pelo prompt de comando/terminal, acesse a pasta com o projeto clonado e execute os seguintes comandos:
```
   npm install -g typescript
```
```
   npm install -g protractor
```
```
   npm i
```
```
   code .
```
* O visual studio code será aberto e poderá ver todas as dependências do package.json instaladas na pasta node_modules

## Executar os Scripts
### Comandos:
Abra o **Prompt de Comando do visual studio code** [menu View >> Integrated Terminal] e execute o comando abaixo, conforme necessidade:

> Comando sem variáveis, utilizará o padrão definido no projeto.
```
npm run test
```
Será solicitado o ambiente em que deseja rodar os teste:
* Remotamente;
* Localmente.

#### Remotamente
> Comando sem variáveis, utilizará o padrão definido no projeto (Para servidores):
```
npm run remote-test
```

Comando com variáveis (Exemplo):
```bash
"./node_modules/.bin/cross-env" BASE_URL='https://www.google.com.br/' TEST_BROWSER_NAME='chrome' SELENIUM_ADDRESS='http://10.0.150.10:4444/wd/hub' SPECS='typescript' npm run remote-test
```

#### Localmente

> Comando sem variáveis, utilizará o padrão definido no projeto:
```bash
npm run local-test
```

Comando com variáveis:
```bash
"./node_modules/.bin/cross-env" BASE_URL='https://www.google.com.br/' TEST_BROWSER_NAME='chrome' SELENIUM_ADDRESS='http://localhost:4444/wd/hub' SPECS='typescript' npm run local-test
```

## Detalhes do projeto
### Escrevendo Features:
```
Feature: Realizar pesquisa no Google
    Como usuario do site de busca do google
    Eu desejo realizar pesquisas sobre ferramentas para teste automatizados
    Para que eu possa ampliar meus conhecimentos sobre o assunto

    @CucumberScenario
    Scenario: Pesquisar Cucumber no Google
        Given que eu estou na pagina de pesquisa do google
        When eu digito o texto "Cucumber" na caixa de pesquisa
        When eu clico no botão de pesquisa do google
        Then eu sou redirecionado a lista de resultados sobre cumcumber
        When eu limpo o texto de pesquisa
```

### Escrevendo Step Definitions:
```
import { browser, protractor } from "protractor";
import { PesquisaPage } from "../pages/pesquisaPage";

const { Given, When, Then } = require("cucumber");

const chai = require("chai").use(require("chai-as-promised"));
const expect = chai.expect;

const search: PesquisaPage = new PesquisaPage();

Given(/^que eu estou na pagina de pesquisa do google$/, async () => {
    await expect(browser.getTitle()).to.eventually.equal("Google");
});
```

### Escrevendo Page Objects:
```
import { $ } from "protractor";

export class PesquisaPage {
    public pesquisaTxt: any;
    public pesquisaBtn: any;

    constructor() {
        this.pesquisaTxt = $("#lst-ib");
        this.pesquisaBtn = $('input[aria-label="Pesquisa Google"]');
    }
}
```

### Cucumber Hooks:
O método seguinte gera um screenshot da falha de cada cenário.

```
After(async function(scenario) {
    if (scenario.result.status === Status.FAILED) {
        // screenShot é uma imagem png
         const screenShot = await browser.takeScreenshot();
         this.attach(screenShot, "image/png");
    }
});
```

### CucumberOpts Tags
Configuração demonstra as tags específicas das features que serão executadas.

```
cucumberOpts: {
    compiler: "ts:ts-node/register",
    format: "json:./reports/json/cucumber_report.json",
    require: ["../../stepdefinitions/*.ts", "../../support/*.ts"],
    strict: true,
    tags: "@TypeScriptScenario or @CucumberScenario or @ProtractorScenario",
},
```

### Variáveis:
Parâmetros básicos do projeto de teste.

#### BASE_URL
Usado para projetos que possua múltiplos ambientes de teste, onde a URL é diferente de cada ambiente em que deseja ser rodado os scripts.

Solução que permite que você crie testes relativos a URL com o conceito de BaseURL, evitando assim, a necessidade de reescrever todos os testes do zero para fazer funcionar em URL's diferentes. 

A propriedade `BASE_URL` é a parte estática da URL definida como uma configuração global para todo o projeto, com isso, o teste poderá ser executado em todos os ambientes.

#### TEST_BROWSER_NAME
Usado pelo servidor selenium para seleção do navegador, podendo ser do tipo: `chrome`, `firefox`, `chrome-headless (modo sem cabeça)`.
Código para configurar o chrome headless no arquivo `config.ts`:
```
capabilities: {
        browserName: (process.env.TEST_BROWSER_NAME || 'chrome')
        chromeOptions: {
            args: [ "--headless", "--disable-gpu", "--window-size=800,600" ]
   }
},
```

#### SELENIUM_ADDRESS
Usado para passar o caminho em que irá iniciar o servidor selenium, podendo ser local ou remoto, conforme a necessidade.

#### SPECS
Usado para determinar o diretório com as fetuares a serem executadas, por padrão, os arquivos com as features estão no primeiro nível do diretório, mas podem ser alteradas, exemplo: 
* /features/pasta1/exemplo1.feature... editarExemplo1.feature... 
* /features/pasta2/exemplo2.feature... excluirExemplo2.feature...

Caso passe o caminho /features/portaria no parâmetro SPECS, apenas os teste contidos neste diretório, serão executados.

### Relatório HTML
Projeto integrado com [cucumber-html-reporter](https://github.com/gkushang/cucumber-html-reporter), que é gerado na pasta `..\reports\html\cucumber_reporter.html` quando executa o comando `npm run remote-test` ou `npm run local-test`.

Podendo ser personalizados de acordo com a necessidade.

### Relatório XML (Junit)
Destinado para gerar os resultados dos testes executados no TFS, no caminho `..\reports\junit\cucumber_report.xml`

Podendo ser personalizados de acordo com a necessidade.
