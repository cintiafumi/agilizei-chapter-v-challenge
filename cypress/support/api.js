const getToken = () => window.localStorage.getItem('jwtToken')

export const api = ({
  endpoint,
  method = 'GET',
  body = {}
}) => cy.request({
  headers: {
    Authorization: `Token ${getToken()}`
  },
  url: `https://api.realworld.io/api${endpoint}`,
  method,
  body
})
