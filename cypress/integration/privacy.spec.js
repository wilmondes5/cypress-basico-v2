it.only('Acessa a página de privacidade removendo o target e então clicando no link', function(){
    cy.visit('./src/index.html')
    cy.get('#privacy a')
    .invoke('removeAttr', 'target')
    .click()
    

    cy.contains('CAC TAT - Política de privacidade').should('be.visible')
})