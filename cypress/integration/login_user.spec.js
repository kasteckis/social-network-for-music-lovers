/// <reference types="cypress" />

context('Location', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('CYPRESS_BASE_URL') + '/')
    })

    it('Login user to the system', () => {
        cy.visit(Cypress.env('CYPRESS_BASE_URL') + '/prisijungti')

        cy.get('input[type=text]').first().type('cypress@cypress.dev')
        cy.get('input[type=password]').type('cypress')
        cy.get('button[type=submit]').click()
        cy.wait(1000)

        cy.url().should('eq', Cypress.env('CYPRESS_BASE_URL') + '/')
    })

    it('Fail login to the system', () => {
        cy.visit(Cypress.env('CYPRESS_BASE_URL') + '/prisijungti')

        cy.get('input[type=text]').first().type('notexistant@user.dev')
        cy.get('input[type=password]').type('passwordwhichdoesntexist')
        cy.get('button[type=submit]').click()
        cy.wait(1000)

        cy.contains('Neteisingi prisijungimo duomenys!');
    })
})
