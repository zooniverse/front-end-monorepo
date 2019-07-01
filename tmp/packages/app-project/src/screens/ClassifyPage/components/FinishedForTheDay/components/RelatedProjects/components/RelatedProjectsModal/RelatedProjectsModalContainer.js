import { inject, observer } from 'mobx-react'
import { string } from 'prop-types'
import React, { Component } from 'react'

import RelatedProjectsModal from './RelatedProjectsModal'

function storeMapper (stores) {
  return {
    projectTitle: stores.store.project['display_name']
  }
}

@inject(storeMapper)
@observer
class RelatedProjectsModalContainer extends Component {
  render () {
    const { projectTitle } = this.props
    return (
      <RelatedProjectsModal
        projectTitle={projectTitle}
        {...this.props}
      />
    )
  }
}

RelatedProjectsModalContainer.propTypes = {
  projectTitle: string.isRequired
}

export default RelatedProjectsModalContainer
