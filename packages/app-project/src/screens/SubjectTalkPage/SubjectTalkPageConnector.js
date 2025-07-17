import { observer, MobXProviderContext } from 'mobx-react'
import { useContext } from 'react'
import { shape, string } from 'prop-types'

import SubjectTalkPage from './SubjectTalkPage'

function useStores(mockStore) {
  const stores = useContext(MobXProviderContext)
  const store = mockStore || stores.store
  const { project, user } = store
  return {
    project,
    user
  }
}

function SubjectTalkPageConnector({
  subject,
  subjectID
}) {
  const { project, user } = useStores()

  return (
    <SubjectTalkPage
      project={project}
      subject={subject}
      subjectID={subjectID}
      user={user}
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
export { SubjectTalkPageConnector }
