import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'

import getLayout from './helpers/getLayout'

function storeMapper (stores) {
  const { layout } = stores.classifierStore.classifier
  return { layout }
}

@inject(storeMapper)
@observer
class Layout extends React.Component {
  render () {
    // `getLayout()` will always return the default layout as a fallback
    const CurrentLayout = getLayout(this.props.layout)
    return <CurrentLayout />
  }
}

Layout.propTypes = {
  layout: PropTypes.string
}

Layout.defaultProps = {
  layout: 'default'
}

export default Layout
