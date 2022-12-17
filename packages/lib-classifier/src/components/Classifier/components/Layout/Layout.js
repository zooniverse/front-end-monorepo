import PropTypes from 'prop-types'

import { withStores } from '@helpers'
import getLayout from './helpers/getLayout'

function storeMapper(classifierStore) {
  const { layout } = classifierStore.subjectViewer
  return { layout }
}


function Layout({
  layout = 'default'
}) {
  // `getLayout()` will always return the default layout as a fallback
  const CurrentLayout = getLayout(layout)
  return <CurrentLayout />
}

Layout.propTypes = {
  layout: PropTypes.string
}

export default withStores(Layout, storeMapper)
