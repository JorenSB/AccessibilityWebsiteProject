  describe('Inloggen Test', () => {
    it('Moet inloggen met test@test.nl en Test404!', () => {
      cy.visit('https://localhost:44432/login'); 
  
      // Vul het inlogformulier in
      cy.get('.inputLogin:first').type('test@gmail.com');
      cy.get('.inputLogin:last').type('Test123!');
  
      // Verzend het formulier
      cy.get('.LoginButton').click();
  
      // Controleer of de juiste pagina wordt geladen na succesvol inloggen
      cy.url().should('include', '/deskundige/profiel');
    });
  });

