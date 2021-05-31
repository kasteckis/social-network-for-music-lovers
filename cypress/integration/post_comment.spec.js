/// <reference types="cypress" />

context('Location', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('CYPRESS_BASE_URL') + '/prisijungti')

        cy.get('input[type=text]').first().type('cypress@cypress.dev')
        cy.get('input[type=password]').type('cypress')
        cy.get('button[type=submit]').click()
        cy.wait(1000)
    })

    it('Comment on the post', () => {
        cy.visit(Cypress.env('CYPRESS_BASE_URL') + '/irasai')

        cy.contains('Skaityti daugiau').click()
        cy.get('textarea').first().type('Cypress comment')
        cy.contains('Rašyti').click()

        cy.contains('Cypress comment')
    })
})
