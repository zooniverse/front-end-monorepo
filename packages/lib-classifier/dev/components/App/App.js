import React from 'react'
import queryString from 'query-string'
import _ from 'lodash'
import { panoptes } from '@zooniverse/panoptes-js'
import oauth from 'panoptes-client/lib/oauth'
import { Button, Grommet, Box, base as baseTheme } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'
import Classifier from '../../../src/components/Classifier'

class App extends React.Component {
  constructor () {
    super()

    this.state = {
      loading: false,
      project: null,
      user: null
    }
  }

  componentDidMount () {
    this.initAuthorization()
      .then(() => this.fetchProject())
  }

  initAuthorization () {
    this.setState({ loading: true })
    return oauth.init('7532a403edf16f31fb2a210b8a49f59553d45064e6c292679c3eac53631d73d1')
      .then((user) => {
        this.setState({ loading: false, user })
        history.replaceState(null, document.title, location.pathname + location.search)
      })
  }

  async getBearerToken () {
    const token = await oauth.checkBearerToken()
    if (token) {
      return `Bearer ${token.access_token}`
    }

    return ''
  }

  async fetchProject () {
    let id = '335' // Example project: I Fancy Cats (staging)

    // Optional project override, e.g. localhost:8080?project=1862
    if (window.location && window.location.search) {
      const { project } = queryString.parse(window.location.search) // Search the query string for the 'project='
      if (project) {
        id = project
      }
    }

    try {
      const bearerToken = await this.getBearerToken()
      const response = await panoptes.get(`/projects/${id}`, {}, { authorization: bearerToken })
      const project = response.body.projects[0]
      this.setState({ project })
    } catch (error) {
      console.error(`Error fetching project ${id}`, error)
    }
  }

  login () {
    oauth.signIn('http://localhost:8080/')
  }

  logout () {
    oauth.signOut()
      .then((user) => {
        this.setState({ user })
      })
  }

  render () {
    if (!this.state.project) {
      return (
        <div>Loading project data...</div>
      )
    }

    const mergedThemes = _.merge({}, baseTheme, zooTheme)

    return (
      <Grommet theme={mergedThemes}>
        <Box as='main' background={zooTheme.global.colors['light-1']}>
          <Box as='header' pad='medium' align='end'>
            {this.state.user
              ? <Button onClick={this.logout.bind(this)} label='Logout' />
              : <Button onClick={this.login.bind(this)} label='Login' />
            }
          </Box>
          <Box as='section'>
            <Classifier
              authClient={oauth}
              onAddToCollection={(subjectId) => console.log(subjectId)}
              onCompleteClassification={(classification, subject) => console.log('onComplete', classification, subject)}
              project={this.state.project}
            />
          </Box>
        </Box>
      </Grommet>

    )
  }
}

export default App
