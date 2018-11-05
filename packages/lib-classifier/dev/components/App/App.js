import React from 'react'
import { panoptes } from '@zooniverse/panoptes-js'

import Classifier from '../../../src/components/Classifier'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      project: null
    }
  }

  async componentDidMount () {
    let id = '335' // Example project: I Fancy Cats (staging)

    // Optional project override, e.g. localhost:8080?project_id=1862
    if (window.location && window.location.search) {
      const searchResults = /(?:^\?|&)(?:project=)(\d+)/.exec(window.location.search) // Search the query string for the 'project='
      if (searchResults[1]) {
        id = searchResults[1]
      }
    }

    try {
      const response = await panoptes.get(`/projects/${id}`)
      const project = response.body.projects[0]
      this.setState({ project })
    } catch (error) {
      console.error(`Error fetching project ${id}`, error)
    }
  }

  render () {
    if (!this.state.project) {
      return (
        <div>Loading project data...</div>
      )
    }

    return (
      <Classifier project={this.state.project} />
    )
  }
}

export default App
