import { observer, MobXProviderContext } from 'mobx-react'
import { useContext } from 'react'
import { shape, string } from 'prop-types'

import SubjectTalkPage from './SubjectTalkPage'

function useStores() {
  const stores = useContext(MobXProviderContext)
  const { project, user } = stores.store
  return {
    login: user?.login,
    projectId: project?.id,
    projectSlug: project?.slug
  }
}

function SubjectTalkPageConnector({
  subject,
  subjectID
}) {
  const { login, projectId, projectSlug } = useStores()

  return (
    <SubjectTalkPage
      login={login}
      projectId={projectId}
      projectSlug={projectSlug}
      subject={subject}
      subjectId={subjectID}
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
