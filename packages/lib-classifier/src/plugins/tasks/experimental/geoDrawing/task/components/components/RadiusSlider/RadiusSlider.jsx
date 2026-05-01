import { Box, RangeInput, Text } from 'grommet'
import { func, number, string, bool } from 'prop-types'
import styled from 'styled-components'

import { useTranslation } from '@translations/i18n'

const RangeContainer = styled(Box)`
  border-top: 1px solid ${props => props.theme.global.colors['light-3']};
  margin-top: 8px;
  padding-top: 8px;
`

function RadiusSlider({
  disabled = false,
  maxRadius,
  onChange,
  unitLabel,
  value
}) {
  const { t } = useTranslation('plugins')

  return (
    <RangeContainer>
      <Text size='small'>
        {t('GeoDrawingTask.adjustRadius', { unit: unitLabel })}
      </Text>
      <RangeInput
        disabled={disabled}
        value={value}
        min={0}
        max={maxRadius}
        step={1}
        onChange={function handleChange(event) {
          onChange(Math.round(Number(event.target.value)))
        }}
      />
    </RangeContainer>
  )
}

RadiusSlider.propTypes = {
  disabled: bool,
  maxRadius: number.isRequired,
  onChange: func.isRequired,
  unitLabel: string.isRequired,
  value: number.isRequired
}

export default RadiusSlider
