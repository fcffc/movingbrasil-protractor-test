import { browser, protractor } from "protractor";
import { PesquisaPage } from "../pages/pesquisaPage";

const { Given, When, Then } = require("cucumber");

const chai = require("chai").use(require("chai-as-promised"));
const expect = chai.expect;

const search: PesquisaPage = new PesquisaPage();

Given(/^que eu estou na pagina de pesquisa do google$/, async () => {
    await expect(browser.getTitle()).to.eventually.equal("Google");
});

When(/^eu digito o texto "(.*?)" na caixa de pesquisa$/, async (texto) => {
    await search.pesquisaTxt.sendKeys(texto);
});

When(/^eu clico no botão de pesquisa do google$/, async () => {
    await browser.actions().sendKeys(protractor.Key.ENTER).perform();
});

When(/^eu limpo o texto de pesquisa$/, async () => {
    await search.pesquisaTxt.clear();
});

Then(/^eu sou redirecionado a lista de resultados sobre cumcumber$/, async () => {
    await expect(browser.getTitle()).to.eventually.equal("Cucumber - Pesquisa Google");
});