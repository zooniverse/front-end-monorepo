import { SpacedText } from '@zooniverse/react-components'
import { Box, Text } from 'grommet'
import { shape, string } from 'prop-types'

import { useTranslation } from '@translations/i18n'

function ReferenceData({ data }) {
  if (!data || Object.keys(data).length === 0) {
    return null
  }
  
  const { t } = useTranslation('components')

  return (
    <Box
      a11yTitle={t('SubjectViewer.GeoMapViewer.ReferenceData')}
      as='section'
      flex={false}
      pad={{ horizontal: 'small', vertical: 'xsmall' }}
      tabIndex={0}
    >
      <SpacedText
        margin={{ bottom: 'xsmall' }}
        weight='bold'
      >
        {t('SubjectViewer.GeoMapViewer.ReferenceData')}
      </SpacedText>
      <Box gap='xsmall'>
        {Object.entries(data).map(([key, value]) => (
          <Text
            key={key}
            size='1rem'
          >
            <Text
              size='1rem'
              weight='bold'
            >
              {key}:</Text> {value}
          </Text>
        ))}
      </Box>
    </Box>
  )
}

ReferenceData.propTypes = {
  data: shape({
    [string]: string
  })
}

export default ReferenceData
