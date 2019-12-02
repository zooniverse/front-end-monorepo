import { inject, observer } from 'mobx-react'
import { arrayOf, string } from 'prop-types'
import React, { Component } from 'react'
import asyncStates from '@zooniverse/async-states'

import WideLayout from './components/WideLayout'
import NarrowLayout from './components/NarrowLayout'
import fetchWorkflowsHelper from './helpers/fetchWorkflowsHelper'

function storeMapper (stores) {
  return {
    activeWorkflows: stores.store.project.links['active_workflows'],
    defaultWorkflow: stores.store.project.configuration['default_workflow']
  }
}

class HeroContainer extends Component {
  constructor () {
    super()
    this.state = {
      workflows: {
        loading: asyncStates.initialized,
        data: []
      }
    }
  }

  componentDidMount () {
    return this.fetchWorkflows()
  }

  async fetchWorkflows () {
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
      if (process.browser) {
        console.error(error)
      }
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
    const { isWide } = this.props
    return isWide
      ? <WideLayout workflows={workflows} />
      : <NarrowLayout workflows={workflows} />

  }
}

HeroContainer.propTypes = {
  activeWorkflows: arrayOf(string),
  defaultWorkflow: string,
  language: string
}

HeroContainer.defaultProps = {
  activeWorkflows: [],
  defaultWorkflow: '',
  language: 'en'
}

@inject(storeMapper)
@observer
class DecoratedHeroContainer extends HeroContainer { }

export {
  DecoratedHeroContainer as default,
  HeroContainer
}
