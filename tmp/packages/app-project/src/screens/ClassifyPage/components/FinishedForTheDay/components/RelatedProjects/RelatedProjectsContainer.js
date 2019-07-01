import React, { Component } from 'react'

import RelatedProjectsButton from './components/RelatedProjectsButton'
import RelatedProjectsModal from './components/RelatedProjectsModal'

class RelatedProjectsContainer extends Component {
  state = {
    modalActive: false
  }

  closeModal = () => this.setState({ modalActive: false })

  openModal = () => this.setState({ modalActive: true })

  render () {
    return (
      <>
        <RelatedProjectsButton onClick={this.openModal} />
        <RelatedProjectsModal
          active={this.state.modalActive}
          closeFn={this.closeModal}
        />
      </>
    )
  }
}

export default RelatedProjectsContainer
