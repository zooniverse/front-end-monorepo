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

function Bars (props) {
  const {
    data,
    xAxisLabel,
    xScale,
    yAxisLabel,
    yScale,
    yMax,
    theme: { global: { colors } }
  } = props

  return data.map((datum, index) => {
      const { color, label, value } = datum
      const fill = colors[color] || color || colors.brand
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
            focusColor={colors[colors.focus]}
            role='listitem'
          >
            <Bar
              data-label={label}
              data-value={value}
              fill={fill}
              focusColor={colors.focus}
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

Bars.defaultProps = {
  theme: {
    dark: false,
    global: {
      colors: {
        brand: '',
        text: {}
      }
    }
  },
  xAxisLabel: 'x-axis',
  yAxisLabel: 'y-axis'
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
