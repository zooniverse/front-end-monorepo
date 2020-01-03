import React from 'react'
import PropTypes from 'prop-types'
import styled, { withTheme } from 'styled-components'
import { Box } from 'grommet'
import { Bar } from '@vx/shape'
import Tippy from '@tippy.js/react'
import { SpacedText } from '@zooniverse/react-components'
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

const StyledTippy = styled(Tippy)`
  background-color: black !important;
  border-radius: 0 !important;

  .tippy-content {
    padding: 0;
  }

  &[data-placement^=bottom] {
    .tippy-arrow {
      border-bottom-color: black !important;
    }
  }

  &[data-placement^='top'] {
    .tippy-arrow {
      border-top-color: black !important;
    }
  }
`

export function TooltipContent ({ className, label }) {
  return (
    <Box
      background={{ color: 'black', dark: true }}
      className={className}
      elevation='medium'
      pad={{ horizontal: 'medium', vertical: 'xsmall' }}
      responsive={false}
    >
      <SpacedText weight='bold'>{label}</SpacedText>
    </Box>
  )
}

const StyledTooltipContent = styled(TooltipContent)`
  font-family: ${props => props.fontFamily};
`

function Bars (props) {
  const {
    data,
    xAxisLabel,
    xScale,
    yAxisLabel,
    yScale,
    yMax,
    theme: { global: { colors, font } }
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
        <StyledTippy
          arrow={true}
          animation='scale'
          content={<StyledTooltipContent fontFamily={font.family} label={value.toString()} />}
          key={key}
          placement='top'
          trigger='mouseenter focus'
        >
          <svg
            tabIndex='0'
          >
            <Bar
              aria-label={alt}
              data-label={label}
              data-value={value}
              fill={fill}
              focusable
              height={barHeight}
              index={index}
              role='list item'
              width={barWidth}
              x={x}
              y={y}
            />
          </svg>
        </StyledTippy>
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
      },
      font: {}
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