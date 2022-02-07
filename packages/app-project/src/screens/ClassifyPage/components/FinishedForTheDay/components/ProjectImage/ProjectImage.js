import PropTypes from 'prop-types'
import { withTheme } from 'styled-components'
import { Media, ZooniverseLogo } from '@zooniverse/react-components'
import { useTranslation } from 'next-i18next'

function ProjectImage ({ imageSrc, projectName, theme }) {
  const { t } = useTranslation('screens')
  const alt = t('Classify.FinishedForTheDay.ProjectImage.alt', { projectName })
  return (
    <Media
      alt={alt}
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
