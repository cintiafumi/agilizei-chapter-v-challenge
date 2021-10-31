import { ELEMENTS as el } from './elements'
import { USER as user } from '../../constants'

class SignIn {
  accessPage () {
    cy.visit('login')
  }

  fillEmail () {
    cy.get(el.emailInput).type(user.email)
  }

  fillPassword () {
    cy.get(el.passwordInput).type(user.password)
  }

  submitForm () {
    cy.get(el.submitButton).click()
  }

  checkLoggedUser () {
    cy.contains(user.name).should('be.visible')
  }
}

export default new SignIn()
