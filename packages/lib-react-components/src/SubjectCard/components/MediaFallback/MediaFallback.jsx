import { Box, Text } from 'grommet'
import { node, number, string } from 'prop-types'

import { useTranslation } from '../../../translations/i18n'

function MediaFallback({
  alt,
  placeholder,
  previewHeight,
  width
}) {
  const { t } = useTranslation()
  const message = t('SubjectCard.MediaFallback.message')

  return (
    <Box
      align='center'
      aria-label={alt}
      height={`${previewHeight}px`}
      justify='center'
      round={{ corner: 'top', size: '8px' }}
      width={`${width}px`}
    >
      {placeholder || (
        <Box align='center' gap='xsmall' pad='small'>
          <Text
            color={{ dark: 'neutral-6', light: 'dark-3' }}
            size='xsmall'
            textAlign='center'
          >
            {message}
          </Text>
        </Box>
      )}
    </Box>
  )
}

MediaFallback.propTypes = {
  alt: string,
  placeholder: node,
  previewHeight: number.isRequired,
  width: number.isRequired
}

export default MediaFallback
