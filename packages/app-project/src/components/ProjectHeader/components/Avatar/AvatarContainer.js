import { string } from 'prop-types'
import { useContext } from 'react'
import { observer, MobXProviderContext } from 'mobx-react'

import Avatar from './Avatar'

function storeMapper (store) {
  const {
    project: {
      avatar: {
        src: avatarSrc
      },
      display_name: projectTitle,
      launch_approved: approved
    }
  } = store

  return {
    approved,
    avatarSrc,
    projectTitle
  }
}

function useStores() {
  const stores = useContext(MobXProviderContext)
  return storeMapper(stores.store)
}

function AvatarContainer({ isNarrow }) {
  const {
    approved,
    avatarSrc,
    projectTitle
  } = useStores()

  return (
    <Avatar
      approved={approved}
      isNarrow={isNarrow}
      projectTitle={projectTitle}
      avatarSrc={avatarSrc}
    />
  )
}

AvatarContainer.propTypes = {
  avatarSrc: string
}

export default observer(AvatarContainer)
export { AvatarContainer }
