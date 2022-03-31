import zooTheme from '@zooniverse/grommet-theme'
import { panoptes } from '@zooniverse/panoptes-js'
import { Button, CheckBox, Grommet, Box, base as baseTheme } from 'grommet'
import _ from 'lodash'
import oauth from 'panoptes-client/lib/oauth'
import queryString from 'query-string'
import React from 'react'

import Classifier from '../../../src/components/Classifier'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.selectWorkflow = this.selectWorkflow.bind(this)

    this.state = {
      cachePanoptesData: false,
      dark: false,
      loading: false,
      project: null,
      user: null,
      workflowID: props.workflowID,
      workflows: []
    }
  }

  componentDidMount () {
    addEventListener('popstate', this.onPopState.bind(this))
    this.initAuthorization()
      .then(() => {
        this.fetchProject()
      })
  }

  onPopState({ state }) {
    const url = new URL(window.location)
    const { searchParams } = url
    const workflowID = searchParams.get('workflow')
    this.setState({ workflowID })
  }

  onError (error, info) {
    console.error(error)
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
    let slug

    // Optional project override, e.g. localhost:8080?project=1862
    if (window.location && window.location.search) {
      const { project } = queryString.parse(window.location.search) // Search the query string for the 'project='
      if (parseInt(project)) {
        id = parseInt(project, 10)
      } else {
        slug = project
      }
    }

    try {
      const bearerToken = await this.getBearerToken()
      let response
      if (slug) {
        response = await panoptes.get(`/projects?slug=${slug}`, {}, { authorization: bearerToken })
      } else {
        response = await panoptes.get(`/projects/${id}`, {}, { authorization: bearerToken })
      }
      const project = response.body.projects[0]
      this.fetchWorkflows(project)
      this.setState({ project })
    } catch (error) {
      console.error(`Error fetching project ${id}`, error)
    }
  }

  async fetchWorkflows(project) {
    const activeWorkflows = project.links.active_workflows
    const query = {
      fields: 'completeness,configuration,display_name,grouped',
      id: activeWorkflows.join(',')
    }
    const response = await panoptes.get('/workflows', query)
    const { workflows } = response.body
    this.setState({ workflows })
  }

  login () {
    oauth.signIn(window.location.origin)
  }

  logout () {
    oauth.signOut()
      .then(user => {
        this.setState({ user })
        // Remove this once the effect hook in the classifier is properly setup with the user id
        const seenThisSession = (window) ? window.sessionStorage.getItem("subjectsSeenThisSession") : null

        if (seenThisSession) {
          window.sessionStorage.removeItem("subjectsSeenThisSession")
        }
      })
  }

  selectWorkflow(event) {
    const { value: workflowID } = event.target
    this.setState({ workflowID })
    const url = new URL(window.location)
    const { searchParams } = url
    const newParams = new URLSearchParams()
    for (const [key, value] of searchParams.entries()) {
      newParams.set(key, value)
    }
    if (!workflowID) {
      newParams.delete('workflow')
    } else {
      newParams.set('workflow', workflowID)
    }
    history.pushState({ workflowID }, '', `/?${newParams.toString()}`)
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

    const { project, workflows } = this.state
    const { active_workflows } = project.links
    const [singleActiveWorkflow] = (active_workflows.length === 1) ? active_workflows : []
    const workflowID = this.state.workflowID ?? singleActiveWorkflow
    const mergedThemes = _.merge({}, baseTheme, zooTheme, { dark: this.state.dark })
    const key = this.state.cachePanoptesData ? 'cachedClassifier' : 'classifier'

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
            <label htmlFor="workflows">Change workflow</label>
            <select id="workflows" defaultValue={workflowID} onChange={this.selectWorkflow}>
              <option value=''>None</option>
              {workflows.map(workflow => <option key={workflow.id} value={workflow.id}>{workflow.display_name} {workflow.id}</option>)}
            </select>
            <CheckBox
              checked={this.state.cachePanoptesData}
              label="Cache Panoptes data"
              onChange={() => this.setState({ cachePanoptesData: !this.state.cachePanoptesData })}
            />
            <Button onClick={this.toggleTheme.bind(this)} label='Toggle theme' />
            {this.state.user
              ? <Button onClick={this.logout.bind(this)} label='Logout' />
              : <Button onClick={this.login.bind(this)} label='Login' />
            }
          </Box>
          <Box as='section'>
            <Classifier
              key={key}
              authClient={oauth}
              cachePanoptesData={this.state.cachePanoptesData}
              onAddToCollection={(subjectId) => console.log(subjectId)}
              onCompleteClassification={(classification, subject) => console.log('onComplete', classification, subject)}
              onError={this.onError}
              project={this.state.project}
              showTutorial
              subjectID={this.props.subjectID}
              subjectSetID={this.props.subjectSetID}
              workflowID={workflowID}
            />
          </Box>
        </Box>
      </Grommet>
    )
  }
}

export default App
