import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import asyncStates from '@zooniverse/async-states'

import Hero from './Hero'
import fetchWorkflowsHelper from './helpers/fetchWorkflowsHelper'

function storeMapper(stores) {
  return {
    activeWorkflows: stores.store.project.links['active_workflows'],
    defaultWorkflow: stores.store.project.configuration['default_workflow'],
    language: stores.store.ui.language
  }
}

@inject(storeMapper)
@observer
class HeroContainer extends Component {
  constructor() {
    super()
    this.state = {
      workflows: {
        loading: asyncStates.initialized,
        data: []
      }
    }
  }

  componentDidMount () {
    this.fetchWorkflows()
  }

  async fetchWorkflows() {
    this.setState(state => ({
      workflows: {
        ...state.workflows,
        loading: asyncStates.loading
      }
    }))
    try {
      const { activeWorkflows, defaultWorkflow, language } = this.props
      const workflows = await fetchWorkflowsHelper(language, activeWorkflows, defaultWorkflow)
      this.setState({
        workflows: {
          loading: asyncStates.success,
          data: workflows
        }
      })
    } catch (error) {
      console.error(error)
      this.setState(state => ({
        workflows: {
          ...state.workflows,
          loading: asyncStates.error
        }
      }))
    }
  }

  render () {
    const { workflows } = this.state
    return (
      <Hero workflows={workflows} />
    )
  }
}

HeroContainer.propTypes = {
}

HeroContainer.defaultProps = {
}

export default HeroContainer
