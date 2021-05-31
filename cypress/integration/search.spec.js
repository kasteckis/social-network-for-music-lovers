/// <reference types="cypress" />

context('Location', () => {
    it('Perform search function', () => {
        cy.visit(Cypress.env('CYPRESS_BASE_URL') + '/paieska')

        cy.contains('Raktažodžiai').get('input').type('qweqweeqwTIKRAINEEGZISTUOJANTIREIKSMErweqqwe5454wqe54qwe22')
        cy.contains('Ieškoti').click()

        cy.contains('Rezultatų nėra')
    })
})
