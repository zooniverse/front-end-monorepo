import { inject, observer } from 'mobx-react'
import { string } from 'prop-types'
import { Component } from 'react'

import RelatedProjectsModal from './RelatedProjectsModal'

function storeMapper (stores) {
  return {
    projectTitle: stores.store.project['display_name']
  }
}

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

export default inject(storeMapper)(observer(RelatedProjectsModalContainer))
