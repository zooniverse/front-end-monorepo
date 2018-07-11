import React from 'react'
import { panoptes } from '@zooniverse/panoptes-js'

import Classifier from '../../../src/components/Classifier'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      project: null
    }
  }

  async componentDidMount () {
    const id = '335'
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
