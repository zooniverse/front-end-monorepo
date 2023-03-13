import { observer } from 'mobx-react'

import { useStores } from '@hooks'
import getLayout from './helpers/getLayout'

function storeMapper(classifierStore) {
  const workflow = classifierStore.workflows.active

  return {
    layout: workflow?.layout,
    limitSubjectHeight: workflow?.configuration?.limit_subject_height
  }
}


function Layout() {
  // `getLayout()` will always return the default layout as a fallback
  const { limitSubjectHeight, layout } = useStores(storeMapper)
  const CurrentLayout = getLayout(layout)
  return <CurrentLayout limitSubjectHeight={limitSubjectHeight} />
}

export default observer(Layout)
