/// <reference types="cypress" />

context('Location', () => {

    it('Access admin dashboard and then redirect to admin login', () => {
        cy.request({
            url: Cypress.env('CYPRESS_BASE_URL') + '/admin',
            followRedirect: false,
        }).then((resp) => {
            expect(resp.status).to.eq(302)
            expect(resp.redirectedToUrl).to.eq(Cypress.env('CYPRESS_BASE_URL') + '/admin/login')
        })
    })

    it('Login to admin panel as non admin and throw 403', () => {
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        })

        cy.visit(Cypress.env('CYPRESS_BASE_URL') + '/admin/login');

        cy.get('input[type=email]').first().type('cypress@cypress.dev')
        cy.get('input[type=password]').type('cypress')
        cy.get('button[type=submit]').click()

        cy.request({
            url: Cypress.env('CYPRESS_BASE_URL') + '/admin',
            followRedirect: false,
            failOnStatusCode: false
        }).then((resp) => {
            expect(resp.status).to.eq(403)
        })
    })
})
