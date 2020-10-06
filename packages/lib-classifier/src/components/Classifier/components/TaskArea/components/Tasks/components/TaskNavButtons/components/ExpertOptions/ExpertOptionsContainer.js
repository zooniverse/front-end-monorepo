import React, { useEffect, useState } from 'react'
import { MobXProviderContext, observer } from 'mobx-react'
import ExpertOptions from './ExpertOptions'

function useStores() {
  const stores = React.useContext(MobXProviderContext)

  const {
    authClient
  } = stores.classifierStore
  return {
    authClient
  }
}

function ExpertOptionsContainer (props) {
  const { authClient } = useStores()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    authClient.checkCurrent().then((user) => {
      if (user) {
        setIsAdmin(user.admin)
      } else {
        setIsAdmin(false)
      }
    }).catch((error) => { console.error(error) })

    return setIsAdmin(false)
  }, [])

  if (isAdmin) {
    return (
      <ExpertOptions
        {...props}
      />
    )
  }

  return null
}

export default observer(ExpertOptionsContainer)