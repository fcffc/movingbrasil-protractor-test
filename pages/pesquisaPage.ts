import { $ } from "protractor";

export class PesquisaPage {
    public pesquisaTxt: any;
    public pesquisaBtn: any;

    constructor() {
        this.pesquisaTxt = $("#lst-ib");
        this.pesquisaBtn = $('input[aria-label="Pesquisa Google"]');
    }
}