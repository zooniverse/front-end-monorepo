import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import React from 'react'
import ProgressiveImage from 'react-progressive-image'
import posed from 'react-pose'
import { Stack } from 'grommet'

import en from './locales/en'
import Placeholder from './components/Placeholder'

counterpart.registerTranslations('en', en)

const Img = posed.img({
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
})

function ProjectImage ({ imageSrc, projectName }) {
  const alt = counterpart('ProjectImage.alt', { projectName })
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
                objectFit: 'cover',
                objectPosition: '50% 0%',
                width: '100%'
              }}
              src={src}
              alt={alt}
              pose={loading ? 'hidden' : 'visible'}
            />
          </Stack>
          <noscript>
            <img src={imageSrc} alt={alt} />
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
