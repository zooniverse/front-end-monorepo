import { Box, Image } from 'grommet'
import { FormClose } from 'grommet-icons'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

export const StyledFilter = styled(Box)`
  box-shadow: ${
    props => props.focus || props.hover ? 
      `0 0 2px 2px ${props.theme.global.colors.brand};` 
      : '1px 1px 4px 0px rgba(0, 0, 0, 0.10);'
  };
`

const StyledImage = styled(Image)`
  flex: 0 0 auto;
  height: 25px;
  width: 25px;
`

export default function FilterLabel({
  characteristicId = '',
  checked = false,
  focus = false,
  hover = false,
  selected = false,
  valueId = '',
  valueImageSrc = '',
  valueLabel = ''
}) {
  const { t } = useTranslation('plugins')

  const backgroundColor = (checked || selected) ? 'accent-1' : 'neutral-6'
  const containerWidth = selected ? '60px' : '40px'

  return (
    <StyledFilter
      align='center'
      background={{ color: backgroundColor }}
      data-testid={`filter-${characteristicId}-${valueId}`}
      direction='row'
      focus={focus}
      height='40px'
      hover={hover}
      justify='center'
      pad={{
        horizontal: '10px',
        vertical: '5px'
      }}
      round='medium'
      width={containerWidth}
    >
      <StyledImage
        alt={valueLabel}
        fit='contain'
        src={valueImageSrc}
      />
      {selected && (
        <FormClose
          color='neutral-7'
          size='1.3rem'
        />
      )}
    </StyledFilter>
  )
}

FilterLabel.propTypes = {
  characteristicId: PropTypes.string,
  checked: PropTypes.bool,
  focus: PropTypes.bool,
  hover: PropTypes.bool,
  selected: PropTypes.bool,
  valueId: PropTypes.string,
  valueImageSrc: PropTypes.string,
  valueLabel: PropTypes.string
}
