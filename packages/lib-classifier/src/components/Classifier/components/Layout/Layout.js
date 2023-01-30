import { observer } from 'mobx-react'
import PropTypes from 'prop-types'

import { useStores } from '@hooks'
import getLayout from './helpers/getLayout'

function storeMapper(classifierStore) {
  const workflow = classifierStore.workflows.active

  return {
    layout: workflow?.layout
  }
}


function Layout() {
  // `getLayout()` will always return the default layout as a fallback
  const { layout } = useStores(storeMapper)
  const CurrentLayout = getLayout(layout)
  return <CurrentLayout />
}

export default observer(Layout)
