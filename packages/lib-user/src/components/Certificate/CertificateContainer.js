import { shape, string } from 'prop-types'

import Certificate from './Certificate'

function CertificateContainer({
  authUser,
  selectedDateRange = 'AllTime',
  selectedProject = 'AllProjects'
}) {
  // TODO: pass login from app-root and fetch user data if authUser is not login user
  // TODO: stats request
  // TODO: convert selectedDateRange to start and end dates

  const hours = 123
  const projectsCount = 45

  return (
    <Certificate
      creditedName={authUser?.credited_name}
      displayName={authUser?.display_name}
      hours={hours}
      login={authUser?.login}
      projectsCount={projectsCount}
      selectedDateRange={selectedDateRange}
      selectedProject={selectedProject}
    />
  )
}

CertificateContainer.propTypes = {
  selectedDateRange: string,
  selectedProject: string,
  authUser: shape({
    id: string,
    login: string
  })
}

export default CertificateContainer
