import { bool, object } from 'prop-types'
import { useState } from 'react'

import MetadataButton from './components/MetadataButton'
import MetadataModal from './components/MetadataModal'
import filterByLabel, { filters as defaultFilters } from './components/MetadataModal/filterByLabel'

function MetadataIconButton({
  disabled = false,
  metadata = {},
  ...props
}) {
  const [showMetadataModal, setShowMetadataModal] = useState(false)

  const hasVisibleMetadata = Object.keys(metadata).some(function hasVisibleKey(label) {
    return filterByLabel(label, defaultFilters)
  })

  function toggleMetadataModal() {
    setShowMetadataModal(!showMetadataModal)
  }

  return (
    <>
      <MetadataButton
        disabled={disabled || !hasVisibleMetadata}
        onClick={toggleMetadataModal}
        {...props}
      />
      {hasVisibleMetadata && (
        <MetadataModal
          active={showMetadataModal}
          closeFn={toggleMetadataModal}
          metadata={metadata}
        />
      )}
    </>
  )
}

MetadataIconButton.propTypes = {
  disabled: bool,
  metadata: object
}

export default MetadataIconButton
