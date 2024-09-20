
describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')   
    })

    it('Preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'Teste, teste, testeTeste, teste, testeTeste, teste, testeTeste, teste, testeTeste, teste, testeTeste, teste, testeTeste, teste, testeTeste, teste, testeTeste, teste, testeTeste, teste, testeTeste, teste, testeTeste, teste, testeTeste, teste, testeTeste, teste, testeTeste, teste, testeTeste, teste, teste'
        cy.get('#firstName').type('Wilmondes')
        cy.get('#lastName').type('Alves')
        cy.get('#email').type('Wilmondes@teste.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.get('button[type="submit"').click()

        cy.get('.success').should('be.visible')
    })

    it('Exibe mensagem de erro ao submeter o formulário com email com formatação inválida', function(){
        cy.get('#firstName').type('Wilmondes')
        cy.get('#lastName').type('Alves')
        cy.get('#email').type('Wilmondes@teste,com')
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"').click()
        cy.get('.error').should('be.visible')
      })

    it('Campo telefone continua vazio quando preenche um valor numerico',function(){
        cy.get('#phone')
            .type('abcdef')
                .should('have.value', '')
    })
    it('Exibe uma mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulario', function(){
        cy.get('#firstName').type('Wilmondes')
        cy.get('#lastName').type('Alves')
        cy.get('#email').type('Wilmondes@teste.com')
        cy.get('#open-text-area').type('poha')
        cy.get('#phone-checkbox').check()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('Preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName').type('will').should('have.value','will').clear().should('have.value','')
        cy.get('#lastName').type('Alves').should('have.value','Alves').clear().should('have.value','')
        cy.get('#email').type('Wilmondes@teste.com').should('have.value','Wilmondes@teste.com').clear().should('have.value','')
        cy.get('#phone').type('61999999999').should('have.value','61999999999').clear().should('have.value','')
        cy.get('#phone').type('123456789').should('have.value', "123456789").clear().should('have.value', '')
    })
    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',function(){
        cy.get('button[type="submit"').click()
        cy.get('.error').should('be.visible')
    })
    it('Envia o formulário com sucesso usando comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')

    })
    it('Verifica se a mensagem de erro está correta', function(){
        cy.get('button[type="submit"').click()
        cy.get('.error').should('be.visible').and('contain.text', 'Valide os campos obrigatórios!')
    })
    it('Seleciona um produto (Youtube) por seu texto', function(){
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })
    it("Seleciona um produto (Mentoria) por seu valor", function(){
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })
    it('Seleciona um produto (Blog) por seu indice',function(){
        cy.get('#product').select(1).should('have.value', 'blog')
    })
    it("Marcando o tipo de atendimento 'feedbacl'",function(){
        cy.get('input[type="radio"][value="feedback"]').check('feedback')
        .should('have.value', 'feedback')
    })

    it('Marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"').should('have.length',3) //tem o cumprimento de 3 rádios
        .each(function($radio){
            cy.wrap($radio).check()//empacota e marca passando por cada um dos elementos do type=radio
            cy.wrap($radio).should('be.checked')//verifica se foram marcados
        })
    })

    it('Marca ambos checkboxes, depois desmarca o último',function(){
        cy.get('input[type=checkbox]').check()//Marca todos os elementos com o type=checkbox
        .last()//Seleciona o último elemento
        .should('be.checked')
        .uncheck()//desmarca
        .should('not.be.checked')
    })
    it('Seleciona um arquivo da pasta fixtures',function(){
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')//Garante que n tem nada enviado
            .selectFile('./cypress/fixtures/example.json')//Onde está localizado o arquivo
            .should(function($input){ //recebe o input do tipo file
                //console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
    it('Seleciona um arquivo simulando um drag-and-drop',function(){
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json',{action: 'drag-drop'})//simula que está arrastando um arquivo pro input
            .should(function($input){
                //console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')
            })

    })
    it("Seleciona um arquivo utilizando uma fixure para qual foi dada um alias", function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    it("Verifica que a política de privacidade abre em outra aba sem a necessidade de um click",function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')//mostra que há o atributo _blank na página
    })
    it('Acessa a página de política de privacidade removendo o target e então clicando no link',function(){
        cy.get('#privacy a')
            .invoke('removeAttr', 'target') //Remove o atributo target abrindo a tela na mesma aba pois não há o atributo _Blank
            .click()
        
        cy.contains('Talking About Testing').should('be.visible')
    })
    it('Teste idependente',function(){
        cy.get('#privacy a')
        .should('have.attr', 'target', '_blank')
            .invoke('removeAttr', 'target')
            .click()
        cy.contains('CAC TAT - Política de privacidade').should('be.visible')
        cy.contains('Não salvamos dados submetidos no formulário da aplicação CAC TAT. Utilzamos as tecnologias HTML, CSS e JavaScript, para simular uma aplicação real. No entanto, a aplicação é um exemplo, sem qualquer persistência de dados, e usada para fins de ensino.').should('be.visible')
    })
    it('Acessa a página de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a')
        .invoke('removeAttr', 'target', '_blank')
        .click()
    })
  }) 
  


