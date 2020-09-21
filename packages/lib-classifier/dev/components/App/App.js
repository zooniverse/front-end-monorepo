import zooTheme from '@zooniverse/grommet-theme'
import { panoptes } from '@zooniverse/panoptes-js'
import { Button, Grommet, Box, base as baseTheme } from 'grommet'
import _ from 'lodash'
import oauth from 'panoptes-client/lib/oauth'
import queryString from 'query-string'
import React from 'react'

import Classifier from '../../../src/components/Classifier'

class App extends React.Component {
  constructor () {
    super()

    this.state = {
      dark: false,
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
      .then(user => this.setState({ user }))
  }

  toggleTheme () {
    this.setState(state => ({ dark: !state.dark }))
  }

  render () {
    if (!this.state.project) {
      return (
        <div>Loading project data...</div>
      )
    }

    const mergedThemes = _.merge({}, baseTheme, zooTheme, { dark: this.state.dark })

    return (
      <Grommet 
        background={{
          dark: 'dark-1',
          light: 'light-1'
        }}
        theme={mergedThemes} 
        themeMode={(this.state.dark) ? 'dark' : 'light'}
      >
        <Box as='main'>
          <Box as='header' pad='medium' justify='end' gap='medium' direction='row'>
            <Button onClick={this.toggleTheme.bind(this)} label='Toggle theme' />
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
              subjectSetID={this.props.subjectSetID}
              workflowID={this.props.workflowID}
            />
          </Box>
        </Box>
      </Grommet>
    )
  }
}

export default App
