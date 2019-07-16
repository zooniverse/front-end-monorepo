import asyncStates from '@zooniverse/async-states'
import counterpart from 'counterpart'
import { inject, observer } from 'mobx-react'
import { bool } from 'prop-types'
import React, { Component } from 'react'

import RecentSubjects from './RecentSubjects'
import MessageBox from './components/MessageBox'
import Placeholder from './components/Placeholder'
import fetchRecentSubjects from './helpers/fetchRecentSubjects'
import en from './locales/en'

counterpart.registerTranslations('en', en)

function storeMapper (stores) {
  return {
    projectId: stores.store.project.id
  }
}

@inject(storeMapper)
@observer
class RecentSubjectsContainer extends Component {
  constructor () {
    super()
    this.state = {
      loading: asyncStates.initialized,
      subjects: []
    }
  }

  componentDidMount () {
    this.setState({ loading: asyncStates.loading })
    fetchRecentSubjects(this.props.projectId)
      .then(subjects => this.setState({
        loading: asyncStates.success,
        subjects: subjects || []
      }))
      .catch(() => this.setState({
        loading: asyncStates.error
      }))
  }

  render () {
    const { show } = this.props
    const { loading, subjects } = this.state
    let result = null

    if (show) {
      if (loading === asyncStates.success) {
        result = (subjects.length < 1)
          ? (<MessageBox children={counterpart('RecentSubjects.noSubjects')} />)
          : (<RecentSubjects subjects={subjects} />)
      } else if (loading === asyncStates.error) {
        result = (<MessageBox children={counterpart('RecentSubjects.error')} />)
      } else {
        result = (<Placeholder />)
      }
    }

    return result
  }
}

RecentSubjectsContainer.propTypes = {
  show: bool
}

RecentSubjectsContainer.defaultProps = {
  show: false
}

export default RecentSubjectsContainer
