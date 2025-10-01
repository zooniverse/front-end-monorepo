import { observer, MobXProviderContext } from 'mobx-react'
import { useContext } from 'react'
import { shape, string } from 'prop-types'

import SubjectTalkPage from './SubjectTalkPage'

function useStores() {
  const stores = useContext(MobXProviderContext)
  const { project, user } = stores.store
  return {
    login: user?.login,
    projectDisplayName: project?.display_name,
    projectId: project?.id,
    projectSlug: project?.slug,
    userId: user?.id
  }
}

function SubjectTalkPageConnector({
  subject,
  subjectID
}) {
  const {
    login,
    projectDisplayName,
    projectId,
    projectSlug,
    userId
  } = useStores()

  return (
    <SubjectTalkPage
      login={login}
      projectDisplayName={projectDisplayName}
      projectId={projectId}
      projectSlug={projectSlug}
      subject={subject}
      subjectId={subjectID}
      userId={userId}
    />
  )
}

SubjectTalkPageConnector.propTypes = {
  subject: shape({
    id: string.isRequired
  }),
  subjectID: string.isRequired
}

export default observer(SubjectTalkPageConnector)
