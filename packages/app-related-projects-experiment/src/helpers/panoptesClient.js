const Frisbee = require('Frisbee')

const api = new Frisbee({
  baseURI: 'https://www.zooniverse.org/api',
  headers: {
    'Accept': 'application/vnd.api+json; version=1',
    'Content-Type': 'application/json'
  }
})

api.interceptor.register({
  response: response => {
    if (response.err) {
      console.info(response.err)
      return false
    }

    const { links, meta, projects } = JSON.parse(response.body)
    return {
      links,
      meta: meta.projects,
      projects
    }
  }
})

module.exports = api
