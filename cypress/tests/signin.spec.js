/// <reference types="cypress" />

import signIn from '../support/pages/signin'

describe('SignIn', () => {
  it('should not sign in with an empty email', () => {
    cy.intercept(
      {
        method: 'POST',
        path: '/api/users/login'
      },
      {
        statusCode: 500,
        fixture: 'signin-empty-email-error'
      }
    ).as('postLoginUserWithEmptyEmail')

    signIn.accessPage()

    signIn.submitForm()

    cy.contains('Sign in').should('be.visible')
  })

  it('should not sign in with an empty password', () => {
    cy.intercept(
      {
        method: 'POST',
        path: '/api/users/login'
      },
      {
        statusCode: 500,
        fixture: 'signin-empty-password-error'
      }
    ).as('postLoginUserWithEmptyPassword')

    signIn.accessPage()

    signIn.fillEmail()

    signIn.submitForm()

    cy.contains('Sign in').should('be.visible')
  })

  it('should sign in with email and password', () => {
    cy.intercept(
      {
        method: 'POST',
        path: '/api/users/login'
      },
      {
        statusCode: 200,
        fixture: 'signin-success'
      }
    ).as('postLoginUserWithEmailAndPassword')

    signIn.accessPage()

    signIn.fillEmail()
    signIn.fillPassword()

    signIn.submitForm()

    signIn.checkLoggedUser()
  })
})
