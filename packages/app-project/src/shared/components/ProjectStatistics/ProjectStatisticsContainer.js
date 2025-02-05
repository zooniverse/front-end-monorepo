import { useContext } from 'react'
import { MobXProviderContext, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import ProjectStatistics from './ProjectStatistics'

function useStore() {
  const { store } = useContext(MobXProviderContext)

  return {
    classifications: store?.project?.classifications_count,
    completedSubjects: store?.project?.retired_subjects_count,
    projectName: store?.project?.display_name,
    subjects: store?.project?.subjects_count,
    volunteers: store?.project?.classifiers_count
  }
}

const ProjectStatisticsContainer = ({ className }) => {
  const {
    classifications,
    completedSubjects,
    projectName,
    subjects,
    volunteers
  } = useStore()

  const router = useRouter()
  const owner = router?.query?.owner
  const project = router?.query?.project
  const linkProps = {
    externalLink: true, // A project stats page uses PFE
    href: `/projects/${owner}/${project}/stats`
  }

  return (
    <ProjectStatistics
      className={className}
      classifications={classifications}
      completedSubjects={completedSubjects}
      linkProps={linkProps}
      projectName={projectName}
      subjects={subjects}
      volunteers={volunteers}
    />
  )
}

ProjectStatisticsContainer.propTypes = {
  classifications: PropTypes.number,
  completedSubjects: PropTypes.number,
  subjects: PropTypes.number,
  volunteers: PropTypes.number
}

export default observer(ProjectStatisticsContainer)
