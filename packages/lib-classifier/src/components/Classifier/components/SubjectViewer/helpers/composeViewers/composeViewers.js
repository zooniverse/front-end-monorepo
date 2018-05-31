import React from 'react'

function isImageViewer (viewer) {
  return viewer.type.name === 'ImageViewer'
}

function composeViewers (viewers) {
  // Single image subject
  if (viewers.length === 1 && isImageViewer(viewers[0])) {
    return (
      <svg>
        {viewers[0]}
      </svg>
    )
  }
}

export default composeViewers
