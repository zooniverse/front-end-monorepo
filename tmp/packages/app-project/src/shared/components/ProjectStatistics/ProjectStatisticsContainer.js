import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import ProjectStatistics from './ProjectStatistics'

function storeMapper (stores) {
  const { project } = stores.store
  return {
    classifications: project.classifications_count,
    completedSubjects: project.retired_subjects_count,
    projectName: project.display_name,
    projectSlug: project.slug,
    subjects: project.subjects_count,
    volunteers: project.classifiers_count
  }
}

@inject(storeMapper)
@observer
class ProjectStatisticsContainer extends Component {
  render () {
    const {
      className,
      classifications,
      completedSubjects,
      projectName,
      projectSlug,
      subjects,
      volunteers
    } = this.props

    return (
      <ProjectStatistics
        className={className}
        classifications={classifications}
        completedSubjects={completedSubjects}
        projectName={projectName}
        projectSlug={projectSlug}
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

export default ProjectStatisticsContainer
