import { inject, observer } from 'mobx-react'
import { string } from 'prop-types'
import React, { Component } from 'react'

import JoinInButton from './JoinInButton'

function storeMapper (stores) {
  return {
    slug: stores.store.project.slug
  }
}

class JoinInButtonContainer extends Component {
  render () {
    const href = `/projects/${this.props.slug}/talk`
    return (
      <JoinInButton href={href} />
    )
  }
}

JoinInButtonContainer.propTypes = {
  slug: string
}

@inject(storeMapper)
@observer
class WrappedJoinInButtonContainer extends JoinInButtonContainer { }

export default WrappedJoinInButtonContainer
export { JoinInButtonContainer }
