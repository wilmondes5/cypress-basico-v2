Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
        cy.get('#firstName').type('Wilmondes')
        cy.get('#lastName').type('Alves')
        cy.get('#email').type('Wilmondes@teste.com')
        cy.get('#open-text-area').type('poha')
        
        cy.contains('button','Enviar').click()
})