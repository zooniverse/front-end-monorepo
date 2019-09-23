import asyncStates from '@zooniverse/async-states'
import counterpart from 'counterpart'
import { inject, observer } from 'mobx-react'
import { bool } from 'prop-types'
import React, { Component } from 'react'

import RecentSubjects from './RecentSubjects'
import RecentSubjectsCarousel from './RecentSubjectsCarousel'
import MessageBox from './components/MessageBox'
import fetchRecentSubjects from './helpers/fetchRecentSubjects'
import en from './locales/en'

counterpart.registerTranslations('en', en)

function storeMapper (stores) {
  return {
    projectId: stores.store.project.id,
    slug: stores.store.project.slug
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
      .catch(error => {
        console.error(error)
        this.setState({
          loading: asyncStates.error
        })
      })
  }

  render () {
    const { carousel } = this.props
    const { loading, subjects } = this.state
    const href = `/projects/${this.props.slug}/talk`
    let result = null
    const ThumbnailComponent = carousel ? RecentSubjectsCarousel : RecentSubjects

    if (loading === asyncStates.error) {
      result = (<MessageBox children={counterpart('RecentSubjects.error')} />)
    } else {
      result = (loading === asyncStates.success && subjects.length < 1)
        ? (<MessageBox children={counterpart('RecentSubjects.noSubjects')} />)
        : (<ThumbnailComponent href={href} subjects={subjects} />)
    }

    return result
  }
}

RecentSubjectsContainer.propTypes = {
  carousel: bool
}

RecentSubjectsContainer.defaultProps = {
  carousel: false
}

export default RecentSubjectsContainer
