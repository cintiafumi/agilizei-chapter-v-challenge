/// <reference types="cypress" />

import articles from '../support/pages/articles'

describe('Articles', () => {
  beforeEach(() => {
    cy.login()

    cy.visit('/')
  })

  afterEach(() => {
    cy.deleteAllArticles()
    cy.logout()
  })

  it('should create a new article by UI interaction', () => {
    articles.accessForm()

    articles.fillForm()

    articles.submitForm()

    articles.checkPublication()
  })

  it('should not create a new article with empty title', () => {
    articles.accessForm()

    articles.submitForm()

    articles.checkEmptyTitle()
  })

  it('should not create a new article with empty description', () => {
    articles.accessForm()

    articles.fillTitle()

    articles.submitForm()

    articles.checkEmptyDescription()
  })

  it('should not create a new article with empty body', () => {
    articles.accessForm()

    articles.fillTitle()
    articles.fillDescription()

    articles.submitForm()

    articles.checkEmptyBody()
  })

  it('should create 15 new articles and check the first article', () => {
    cy.createRandomArticle(15)

    cy.visit('/')
    cy.contains('Global Feed').click()
    cy.get('.active > .page-link').should('have.css', 'background-color', 'rgb(92, 184, 92)')
    cy.get('.page-item').should('have.length', 2)

    cy.get('h1[ng-bind$=title]').should('be.visible').should('have.length', 10)
    cy.get(':nth-child(10) > .article-preview > .preview-link').should('exist')

    cy.get(':nth-child(1) > .article-preview > .preview-link').click()
    cy.contains('Edit Article').should('be.visible')
    cy.contains('Delete Article').should('be.visible')
    cy.get('.tag-list').find('li').should('have.length', 2)
  })
})
