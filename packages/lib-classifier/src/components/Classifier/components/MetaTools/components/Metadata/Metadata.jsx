import { useState } from 'react'
import PropTypes from 'prop-types'
import MetadataButton from './components/MetadataButton'
import { MetadataModal } from './components/MetadataModal'

const Metadata = ({
  isThereMetadata = false,
  metadata = {}
}) => {
  const [showMetadataModal, setShowMetadataModal] = useState(false)

  const toggleMetadataModal = () => {
    setShowMetadataModal(!showMetadataModal)
  }

  return (
    <>
      <MetadataButton disabled={!isThereMetadata} onClick={toggleMetadataModal} />
      {isThereMetadata &&
        <MetadataModal
          active={showMetadataModal}
          closeFn={toggleMetadataModal}
          metadata={metadata}
        />}
    </>
  )
}

Metadata.propTypes = {
  isThereMetadata: PropTypes.bool,
  metadata: PropTypes.object
}

export default Metadata
