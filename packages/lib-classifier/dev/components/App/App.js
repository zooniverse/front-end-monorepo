import React from 'react'
import queryString from 'query-string'
import { panoptes } from '@zooniverse/panoptes-js'
import { createOAuthClient } from '@zooniverse/auth'
import { Button, Grommet, Box } from 'grommet'
import theme from '@zooniverse/grommet-theme'
import Classifier from '../../../src/components/Classifier'

class App extends React.Component {
  constructor() {
    super()

    this.authClient = createOAuthClient({
      clientId: '7532a403edf16f31fb2a210b8a49f59553d45064e6c292679c3eac53631d73d1',
      env: 'staging',
      redirectUri: 'http://localhost:8080/', // The URI you want the user redirected to on completion
      scopes: [
        'classification',
        'collection',
        'group',
        'medium',
        'organization',
        'project',
        'public',
        'subject',
        'translation',
        'user'
      ]
    })

    this.state = {
      authenticated: false,
      loading: false,
      project: null
    }
  }

  componentDidMount () {
    this.initAuthorization()
      .then(() => this.fetchProject())
  }

  initAuthorization() {
    const { access_token, expires_in } = queryString.parse(window.location.hash)
    if (access_token && expires_in) {
      this.setState({ loading: true })
      return this.authClient.completeLogin()
        .then(() => {
          this.setState({ authenticated: !!this.authClient.getUser(), loading: false })
          history.replaceState(null, document.title, location.pathname + location.search)
        })
    }

    return Promise.resolve(null)
  }

  getBearerToken() {
    if (this.authClient && this.authClient.getToken()) {
      const { token } = this.authClient.getToken()
      return `Bearer ${token}`
    }

    return ''
  }

  async fetchProject() {
    let id = '335' // Example project: I Fancy Cats (staging)

    // Optional project override, e.g. localhost:8080?project_id=1862
    if (window.location && window.location.search) {
      const { project } = queryString.parse(window.location.search) // Search the query string for the 'project='
      if (project) {
        id = project
      }
    }

    try {
      const bearerToken = this.getBearerToken()
      const response = await panoptes.get(`/projects/${id}`, {}, bearerToken)
      const project = response.body.projects[0]
      this.setState({ project })
    } catch (error) {
      console.error(`Error fetching project ${id}`, error)
    }
  }

  login() {
    this.authClient.startLogin()
  }

  logout() {
    this.authClient.logout()

    // We trigger a forced update to re-render the Auth status content
    this.setState({ authenticated: false })
  }

  render() {
    if (!this.state.project) {
      return (
        <div>Loading project data...</div>
      )
    }

    return (
      <Grommet theme={theme}>
        <Box tag='header' pad='medium' align='end'>
          {this.state.authenticated
            ? <Button onClick={this.logout.bind(this)} label='Logout' />
            : <Button onClick={this.login.bind(this)} label='Login' />
          }
        </Box>
        <Box tag='section'>
          <Classifier authClient={this.authClient} project={this.state.project} />
        </Box>
      </Grommet>

    )
  }
}

export default App
