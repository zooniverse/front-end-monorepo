import { observer } from 'mobx-react'

import { useStores } from '@hooks'
import getLayout from './helpers/getLayout'

function storeMapper(classifierStore) {
  const workflow = classifierStore.workflows.active
  const limitSubjectHeight = workflow?.configuration?.limit_subject_height
  const layout = limitSubjectHeight ? 'centered' : workflow?.layout

  return {
    layout
  }
}

function Layout() {
  // `getLayout()` will always return the default layout as a fallback
  const { layout } = useStores(storeMapper)
  const CurrentLayout = getLayout(layout)
  return <CurrentLayout />
}

export default observer(Layout)
