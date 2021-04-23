/// <reference types="cypress" />

context('Location', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('CYPRESS_BASE_URL') + '/')
    })

    it('Comment in the chat box', () => {
        cy.visit(Cypress.env('CYPRESS_BASE_URL') + '/paieska')

        cy.contains('Raktažodžiai').get('input').type('qweqweeqwTIKRAINEEGZISTUOJANTIREIKSMErweqqwe5454wqe54qwe22')
        cy.contains('Ieškoti').click()

        cy.contains('Rezultatų nėra')
    })
})
