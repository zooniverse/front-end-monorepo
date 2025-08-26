import PropTypes from 'prop-types'
import styled, { withTheme } from 'styled-components'
import { Bar } from '@visx/shape'
import { Tooltip } from '@zooniverse/react-components'

export const StyledSvg = styled.svg`
  &:focus, &:hover {
    rect {
      outline: solid 4px ${props => props.focusColor};
    }
  }
`

const DEFAULT_THEME = { 
  dark: false,
  global: {
    colors: {
      brand: '',
      text: {}
    }
  }
}

function Bars ({
  data,
  xAxisLabel = 'x-axis',
  xScale,
  yAxisLabel = 'y-axis',
  yScale,
  yMax,
  theme = DEFAULT_THEME
}) {
  return data.map((datum, index) => {
      const { color, label, value } = datum
      const fill = theme.global.colors[color] || color || theme.global.colors.brand
      const key = `bar-${label}`
      const barHeight = yMax - yScale(value)
      const barWidth = xScale.bandwidth()
      const x = xScale(label)
      const y = yMax - barHeight
      const alt = `${xAxisLabel} ${label}: ${yAxisLabel} ${value}`
      return (
        <Tooltip
          label={value.toString()}
          key={key}
        >
          <StyledSvg
            aria-label={alt}
            tabIndex='0'
            focusable
            focusColor={theme.global.colors[theme.global.colors.focus]}
            role='listitem'
          >
            <Bar
              data-label={label}
              data-value={value}
              fill={fill}
              focusColor={theme.global.colors.focus}
              height={barHeight}
              index={index}
              width={barWidth}
              x={x}
              y={y}
            />
          </StyledSvg>
        </Tooltip>
      )
    })
}

Bars.propTypes = {
  data: PropTypes.array.isRequired,
  theme: PropTypes.object,
  xAxisLabel: PropTypes.string,
  xScale: PropTypes.func.isRequired,
  yAxisLabel: PropTypes.string,
  yScale: PropTypes.func.isRequired,
  yMax: PropTypes.number.isRequired
}

export default withTheme(Bars)
export { Bars }
