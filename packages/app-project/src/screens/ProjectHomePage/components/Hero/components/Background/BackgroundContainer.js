import { inject, observer } from 'mobx-react'
import { string } from 'prop-types'
import React, { Component } from 'react'

import Background from './Background'

function storeMapper(stores) {
  return {
    backgroundSrc: stores.store.project.background.src
  }
}

class BackgroundContainer extends Component {
  render() {
    return (
      <Background backgroundSrc={this.props.backgroundSrc} />
    )
  }
}

BackgroundContainer.propTypes = {
  backgroundSrc: string
}

@inject(storeMapper)
@observer
class DecoratedBackgroundContainer extends BackgroundContainer { }

export {
  DecoratedBackgroundContainer as default,
  BackgroundContainer
}
