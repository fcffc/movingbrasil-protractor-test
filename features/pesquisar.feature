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
    
    
    

    