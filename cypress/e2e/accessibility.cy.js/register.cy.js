describe('Bedrijfsregistratie Test', () => {
    it('Moet bedrijf registreren met de juiste gegevens', () => {
      cy.visit('https://localhost:44432/registreerbedrijf'); 
      
      // Vul het registratieformulier voor bedrijven in
      cy.get('.input-box input').eq(0).type('Test Bedrijf');
      cy.get('.input-box input').eq(1).type('testbedrijf@test.nl');
      cy.get('.input-box input').eq(2).type('12345678');
      cy.get('.input-box input').eq(3).type('TestWachtwoord1!');
  
      cy.get('.RegistreerButton').click();
  
      // Controleer of de registratiesuccessmessage wordt weergegeven
      cy.url().should('include', 'https://localhost:44432/');
    });
  });

  
  describe('Deskundige Registratie Test', () => {
    it('Moet deskundige registreren met de juiste gegevens', () => {
      cy.visit('https://localhost:44432/registreerdeskundige'); 
  
      // Vul het registratieformulier voor deskundigen in
      cy.get('.input-box input').eq(0).type('Test Voornaam');
      cy.get('.input-box input').eq(1).type('Test Achternaam');
      cy.get('.input-box input').eq(2).type('testdeskundige@test.nl');
      cy.get('.input-box input').eq(3).type('TestWachtwoord1!');
  
      // Verzend het formulier
      cy.get('.RegistreerButton').click();
  
      // Controleer of de registratiesuccessmessage wordt weergegeven
      cy.url().should('include', 'https://localhost:44432/');
    });
  });