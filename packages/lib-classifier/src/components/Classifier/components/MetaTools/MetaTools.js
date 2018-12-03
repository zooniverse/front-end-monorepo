import React from 'react'
import PropTypes from 'prop-types'
import { Box } from 'grommet'
import { inject, observer } from 'mobx-react'
import MetadataButton from './components/MetadataButton'
import MetadataModal from './components/MetadataModal'

function storeMapper(stores) {
  const { active: subject, isThereMetadata } = stores.classifierStore.subjects
  return {
    isThereMetadata,
    subject
  }
}

@inject(storeMapper)
@observer
export default class MetaTools extends React.Component {
  constructor () {
    super()

    this.state = {
      showMetadataModal: false
    }
  }

  toggleMetadataModal () {
    this.setState((prevState) => { return { showMetadataModal: !prevState.showMetadataModal } })
  }

  render () {
    const { className, isThereMetadata, subject } = this.props
    // Grommet's Button determines disabled state by whether or not onClick is defined
    const onClick = (isThereMetadata) ? this.toggleMetadataModal.bind(this) : undefined
    return (
      <Box className={className} direction="row">
        {isThereMetadata &&
          <MetadataButton onClick={onClick} />}
        {isThereMetadata &&
          <MetadataModal
            active={this.state.showMetadataModal}
            closeFn={this.toggleMetadataModal.bind(this)}
            metadata={subject.metadata}
          />}
      </Box>
    )
  }

}