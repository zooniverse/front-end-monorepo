import PropTypes from 'prop-types'
import React from 'react'
import ProgressiveImage from 'react-progressive-image'
import posed from 'react-pose'
import styled from 'styled-components'
import { Stack } from 'grommet'

import en from './locales/en'
import Placeholder from './components/Placeholder'

const Img = posed.img({
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
})

function ProjectImage ({ imageSrc, projectName }) {
  return (
    <ProgressiveImage
      src={imageSrc}
      placeholder=''
    >
      {(src, loading) => (
        <>
          <Stack fill>
            <Placeholder />
            <Img
              style={{
                display: loading ? 'none' : 'block',
                height: '100%',
                width: '100%',
                objectFit: 'cover'
              }}
              src={src}
              alt={`Background image for ${projectName}`}
              pose={loading ? 'hidden' : 'visible'}
            />
          </Stack>
          <noscript>
            <img src={imageSrc} />
          </noscript>
        </>
      )}
    </ProgressiveImage>
  )
}

ProjectImage.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  projectName: PropTypes.string.isRequired
}

export default ProjectImage
