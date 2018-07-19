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
    const CurrentLayout = getLayout(this.props.layout)
    return CurrentLayout ? <CurrentLayout /> : CurrentLayout
  }
}

Layout.propTypes = {
  layout: PropTypes.string
}

Layout.defaultProps = {
  layout: 'default'
}

export default Layout
