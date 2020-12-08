import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import FieldGuideButton from './components/FieldGuideButton'
import FieldGuide from './components/FieldGuide'

function storeMapper (stores) {
  const { setModalVisibility, showModal } = stores.classifierStore.fieldGuide
  return {
    setModalVisibility,
    showModal
  }
}

@inject(storeMapper)
@observer
class FieldGuideContainer extends React.Component {
  onClose () {
    const { setModalVisibility } = this.props
    setModalVisibility(false)
  }

  render () {
    const {
      showModal
    } = this.props

    return (
      <>
        <FieldGuideButton />
        {showModal && <FieldGuide onClose={this.onClose.bind(this)} />}
      </>
    )
  }
}

FieldGuideContainer.wrappedComponent.defaultProps = {
  showModal: false
}

FieldGuideContainer.wrappedComponent.propTypes = {
  setModalVisibility: PropTypes.func.isRequired,
  showModal: PropTypes.bool
}

export default FieldGuideContainer
