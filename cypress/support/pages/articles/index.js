import { ELEMENTS as el } from './elements'
import { randomTitle } from '../../utils'

const articleTitle = randomTitle()

class Articles {
  accessForm () {
    cy.get(el.newArticleLink).click()
  }

  fillTitle () {
    cy.get(el.inputTitle).type(articleTitle)
  }

  fillDescription () {
    cy.get(el.inputDescription).type('Article description')
  }

  fillBody () {
    cy.get(el.inputBody).type('Article body')
  }

  fillTags () {
    cy.get(el.inputTag).type('cypress')
  }

  fillForm () {
    this.fillTitle()
    this.fillDescription()
    this.fillBody()
    this.fillTags()
  }

  submitForm () {
    cy.contains('button', 'Publish Article').click()
  }

  checkPublication () {
    cy.contains(articleTitle).should('be.visible')

    cy.get('h1').should('have.text', articleTitle)
  }

  checkEmptyTitle () {
    cy.contains("title can't be blank").should('be.visible')
  }

  checkEmptyDescription () {
    cy.contains("description can't be blank").should('be.visible')
  }

  checkEmptyBody () {
    cy.contains("body can't be blank").should('be.visible')
  }
}

export default new Articles()
