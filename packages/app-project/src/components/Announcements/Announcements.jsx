import AuthenticationInvitation from './components/AuthenticationInvitation'
import ProjectAnnouncement from './components/ProjectAnnouncement'
import FinishedAnnouncement from './components/FinishedAnnouncement'

function Announcements () {
  return (
    <>
      <AuthenticationInvitation />
      <FinishedAnnouncement />
      <ProjectAnnouncement />
    </>
  )
}

export default Announcements
