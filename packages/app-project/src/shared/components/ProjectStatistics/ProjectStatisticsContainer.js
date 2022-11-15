import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { Component } from 'react'
import { withRouter } from 'next/router'

import ProjectStatistics from './ProjectStatistics'

function storeMapper (stores) {
  const { project } = stores.store
  return {
    classifications: project['classifications_count'],
    completedSubjects: project['retired_subjects_count'],
    projectName: project['display_name'],
    subjects: project['subjects_count'],
    volunteers: project['classifiers_count']
  }
}

class ProjectStatisticsContainer extends Component {
  getLinkProps () {
    const { router } = this.props
    const owner = router?.query?.owner
    const project = router?.query?.project
    return {
      href: `/${owner}/${project}/stats`
    }
  }

  render () {
    const {
      className,
      classifications,
      completedSubjects,
      projectName,
      subjects,
      volunteers
    } = this.props

    return (
      <ProjectStatistics
        className={className}
        classifications={classifications}
        completedSubjects={completedSubjects}
        linkProps={this.getLinkProps()}
        projectName={projectName}
        subjects={subjects}
        volunteers={volunteers}
      />
    )
  }
}

ProjectStatisticsContainer.propTypes = {
  classifications: PropTypes.number,
  completedSubjects: PropTypes.number,
  subjects: PropTypes.number,
  volunteers: PropTypes.number
}

ProjectStatisticsContainer.defaultProps = {
  classifications: 0,
  completedSubjects: 0,
  subjects: 0,
  volunteers: 0
}

const DecoratedProjectStatisticsContainer = inject(storeMapper)(withRouter(observer(ProjectStatisticsContainer)))

export {
  DecoratedProjectStatisticsContainer as default,
  ProjectStatisticsContainer
}
