import { Component } from 'react';
import PropTypes from 'prop-types'
import MetadataButton from './components/MetadataButton'
import { MetadataModal } from './components/MetadataModal'

export default class Metadata extends Component {
  constructor () {
    super()

    this.state = {
      showMetadataModal: false
    }

    this.toggleMetadataModal = this.toggleMetadataModal.bind(this)
  }

  toggleMetadataModal () {
    this.setState((prevState) => { return { showMetadataModal: !prevState.showMetadataModal } })
  }

  render () {
    const { isThereMetadata, metadata } = this.props
    return (
      <>
        <MetadataButton disabled={!isThereMetadata} onClick={this.toggleMetadataModal} />
        {isThereMetadata &&
          <MetadataModal
            active={this.state.showMetadataModal}
            closeFn={this.toggleMetadataModal}
            metadata={metadata}
          />}
      </>
    )
  }
}

Metadata.defaultProps = {
  isThereMetadata: false,
  metadata: {}
}

Metadata.propTypes = {
  isThereMetadata: PropTypes.bool,
  metadata: PropTypes.object
}
