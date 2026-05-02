import { Box, Text } from 'grommet'
import { number, string } from 'prop-types'
import styled from 'styled-components'
import { useTranslation } from '@translations/i18n'
import UNIT_CONVERSIONS from '@helpers/unitConversions'

const ToolCard = styled(Box)`
  border: 2px solid ${props => props.theme.global.colors['light-4']};
  border-radius: 4px;
  box-shadow: 1px 1px 2px 0 rgba(0,0,0,0.5);
  background: ${props => props.theme.dark ? 'transparent' : props.theme.global.colors['light-1']};
`

function FeatureCard({
  lat, 
  lon, 
  radius = null, 
  unit = 'meters' 
}) {
  const { t } = useTranslation('plugins')

  let radiusDisplay = 'N/A'
  if (radius !== null && radius !== undefined) {
    const { factor, label } = UNIT_CONVERSIONS[unit] ?? UNIT_CONVERSIONS.meters
    const value = Math.round(radius * factor * 100) / 100
    radiusDisplay = `${value.toLocaleString()}${label}`
  }

  return (
    <ToolCard pad='small'>
      <Text size='small' weight='bold'>
        {t('GeoDrawingTask.selectedFeature')}
      </Text>
      <Box pad={{ top: 'xsmall' }} gap='xsmall'>
        <Text size='xsmall'>
          {t('GeoDrawingTask.latitude', { lat })}
        </Text>
        <Text size='xsmall'>
          {t('GeoDrawingTask.longitude', { lon })}
        </Text>
        {radius !== null && (
          <Text size='xsmall'>
            {t('GeoDrawingTask.uncertaintyRadius', { radius: radiusDisplay })}
          </Text>
        )}
      </Box>
    </ToolCard>
  )
}

FeatureCard.propTypes = {
  lat: string.isRequired,
  lon: string.isRequired,
  radius: number,
  unit: string
}

export default FeatureCard
