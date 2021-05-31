/// <reference types="cypress" />

context('Location', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('CYPRESS_BASE_URL') + '/prisijungti')

        cy.get('input[type=text]').first().type('cypress@cypress.dev')
        cy.get('input[type=password]').type('cypress')
        cy.get('button[type=submit]').click()
        cy.wait(1000)
    })

    it('Comment in the chat box', () => {
        cy.visit(Cypress.env('CYPRESS_BASE_URL') + '/pokalbiai')

        cy.get('textarea').first().type('Cypress žinutė')
        cy.contains('Rašyti').click()

        cy.contains('Cypress žinutė')
    })
})
