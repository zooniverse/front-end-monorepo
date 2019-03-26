import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import React from 'react'
import { Media, ZooniverseLogo } from '@zooniverse/react-components'
import zooTheme from '@zooniverse/grommet-theme'

import en from './locales/en'

counterpart.registerTranslations('en', en)

const StyledZooniverseLogo = styled(ZooniverseLogo)`
  fill: ${zooTheme.global.colors.lightTeal};
  stroke: ${zooTheme.global.colors.lightTeal};
`

function ProjectImage ({ imageSrc, projectName }) {
  const alt = counterpart('ProjectImage.alt', { projectName })
  return (
    <Media
      alt={alt}
      height={"auto"}
      src={imageSrc}
      placeholder={<StyledZooniverseLogo id={`${alt} placeholder`} size='38%' />}
    />
  )
}

ProjectImage.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  projectName: PropTypes.string.isRequired
}

export default ProjectImage
