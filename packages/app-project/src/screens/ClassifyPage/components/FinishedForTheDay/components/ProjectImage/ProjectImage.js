import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import { withTheme } from 'styled-components'
import { Media, ZooniverseLogo } from '@zooniverse/react-components'

import en from './locales/en'

counterpart.registerTranslations('en', en)

function ProjectImage ({ imageSrc, projectName, theme }) {
  const alt = counterpart('ProjectImage.alt', { projectName })
  return (
    <Media
      alt={alt}
      height={200}
      src={imageSrc}
      placeholder={
        <ZooniverseLogo
          id={`${alt} placeholder`}
          size='38%'
        />
      }
    />
  )
}

ProjectImage.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  projectName: PropTypes.string.isRequired
}

export default withTheme(ProjectImage)
