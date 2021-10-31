import { api } from './api'
import { USER as user } from './constants'
import { randomTitle, randomDescription, randomBody, randomTags } from './utils'

Cypress.Commands.add('auth', () => {
  const { email, password } = user
  return api({
    endpoint: '/users/login',
    method: 'POST',
    body: {
      user: { email, password }
    }
  })
})

Cypress.Commands.add('login', () => {
  cy.auth().then(({ body }) =>
    localStorage.setItem('jwtToken', body.user.token)
  )
})

Cypress.Commands.add('logout', () => {
  localStorage.clear()
  cy.reload()
})

Cypress.Commands.add('createRandomArticle', (n = 1) => {
  if (n > 0 && Number.isInteger(n)) {
    for (let i = 0; i < n; i++) {
      api({
        endpoint: '/articles',
        method: 'POST',
        body: {
          article: {
            title: randomTitle(),
            description: randomDescription(),
            body: randomBody(),
            tagList: randomTags()
          }
        }
      })
    }
  }
})

Cypress.Commands.add('getArticles', () => {
  return api({ endpoint: '/articles' }).then(({ articles }) => {
    localStorage.setItem('articles', articles)
    return articles
  })
})

Cypress.Commands.add('deleteAllArticles', () =>
  api({ endpoint: '/articles' }).then(({ body }) => {
    const { articles, articlesCount } = body

    if (articlesCount) {
      const dozens = Math.floor(articlesCount / 10)
      const remainder = articlesCount % 10

      if (remainder) {
        for (let i = 0; i < remainder; i++) {
          const { slug } = articles[i]
          cy.deleteArticle(slug)
        }
      }

      if (dozens) {
        for (let offset = (dozens - 1) * 10; offset >= 0; offset -= 10) {
          api({ endpoint: `/articles?limit=10&offset=${offset}` }).then(({ body }) => {
            const { articles } = body
            for (let i = 0; i < 10; i++) {
              const { slug } = articles[i]
              cy.deleteArticle(slug)
            }
          })
        }
      }
    }
  })
)

Cypress.Commands.add('deleteArticle', (id) =>
  api({
    endpoint: `/articles/${id}`,
    method: 'DELETE'
  })
)
