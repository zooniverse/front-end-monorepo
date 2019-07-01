import { inject, observer } from 'mobx-react'
import { bool } from 'prop-types'
import React, { Component } from 'react'

import ApprovedIcon from './ApprovedIcon'

function storeMapper (stores) {
  return {
    approved: stores.store.project.launch_approved
  }
}

@inject(storeMapper)
@observer
class ApprovedIconContainer extends Component {
  render () {
    return (
      <ApprovedIcon {...this.props} />
    )
  }
}

ApprovedIconContainer.propTypes = {
  approved: bool
}

export default ApprovedIconContainer
