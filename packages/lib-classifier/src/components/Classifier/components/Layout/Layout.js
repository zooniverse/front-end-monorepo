import { observer } from 'mobx-react'

import { useStores } from '@hooks'
import getLayout from './helpers/getLayout'

function storeMapper(classifierStore) {
  const workflow = classifierStore.workflows.active

  return {
    layout: workflow?.layout,
    displayNaturalDimensions: workflow?.configuration?.display_natural_subject_dimensions
  }
}


function Layout() {
  // `getLayout()` will always return the default layout as a fallback
  const { displayNaturalDimensions, layout } = useStores(storeMapper)
  const CurrentLayout = getLayout(layout)
  return <CurrentLayout displayNaturalDimensions={displayNaturalDimensions} />
}

export default observer(Layout)
