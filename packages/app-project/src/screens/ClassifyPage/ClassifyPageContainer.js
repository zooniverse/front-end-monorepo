import { inject, observer } from 'mobx-react'
import { string } from 'prop-types'
import React, { Component } from 'react'

import ClassifyPage from './ClassifyPage'
import CollectionsModal from './components/CollectionsModal'

function storeMapper (stores) {
  const { mode } = stores.store.ui
  return {
    mode
  }
}

@inject(storeMapper)
@observer
class ClassifyPageContainer extends Component {
  render () {
    return (
      <React.Fragment>
        <ClassifyPage {...this.props} />
        <CollectionsModal
          subjectId='123'
        />
      </React.Fragment>
    )
  }
}

ClassifyPageContainer.propTypes = {
  mode: string
}

ClassifyPageContainer.defaultProps = {
  mode: 'light'
}

export default ClassifyPageContainer
