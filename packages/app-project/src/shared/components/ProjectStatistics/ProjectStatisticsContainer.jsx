import { useContext } from 'react'
import { MobXProviderContext, observer } from 'mobx-react'
import { useRouter } from 'next/router'
import ProjectStatistics from './ProjectStatistics'
import addQueryParams from '@helpers/addQueryParams'

function useStore() {
  const { store } = useContext(MobXProviderContext)

  return {
    classifications: store?.project?.classifications_count,
    completedSubjects: store?.project?.retired_subjects_count,
    completeness: store?.project?.completeness,
    launchDate: store?.project?.launch_date,
    projectName: store?.project?.display_name,
    subjects: store?.project?.subjects_count,
    volunteers: store?.project?.classifiers_count
  }
}

const ProjectStatisticsContainer = ({ className, hideLink = false, titleLevel = 2 }) => {
  const {
    classifications,
    completedSubjects,
    completeness,
    launchDate,
    projectName,
    subjects,
    volunteers
  } = useStore()

  const router = useRouter()
  const owner = router?.query?.owner
  const project = router?.query?.project
  const linkProps = {
    externalLink: true, // A project stats page uses PFE
    href: addQueryParams(`/projects/${owner}/${project}/stats`)
  }

  return (
    <ProjectStatistics
      className={className}
      classifications={classifications}
      completedSubjects={completedSubjects}
      completeness={completeness}
      hideLink={hideLink}
      launchDate={launchDate}
      linkProps={linkProps}
      projectName={projectName}
      subjects={subjects}
      titleLevel={titleLevel}
      volunteers={volunteers}
    />
  )
}

export default observer(ProjectStatisticsContainer)
