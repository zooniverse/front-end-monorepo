import { arrayOf, string, shape, number } from 'prop-types'
import styled, { css, useTheme } from 'styled-components'
import { AxisBottom, AxisLeft } from '@visx/axis'
import { Group } from '@visx/group'
import { Bar } from '@visx/shape'
import { Text } from '@visx/text'
import { scaleBand, scaleLinear } from '@visx/scale'

const StyledBarGroup = styled(Group)`
  &:hover rect,
  &:focus rect {
    ${props =>
      css`
        fill: ${props.theme.global.colors.brand};
      `}
  }

  &:hover text,
  &:focus text {
    display: block;
  }
`

const StyledBarLabel = styled(Text)`
  display: none; // hide until bar is hovered or focused

  ${props => css`
    fill: ${props.theme.global.colors['neutral-1']};
    font-size: 1rem;
  `}
`

function ClassificationsChart({ stats = [] }) {
  const theme = useTheme()

  const HEIGHT = 300
  const PADDING = 25
  const WIDTH = 500
  const xScale = scaleBand({
    range: [0, WIDTH],
    round: true,
    domain: stats.map(stat => stat.longLabel),
    padding: 0.1
  })

  const yScale = scaleLinear({
    range: [HEIGHT - PADDING, 0],
    round: true,
    domain: [0, Math.max(...stats.map(stat => stat.count), 10)],
    nice: true
  })

  const axisColour = theme.dark
    ? theme.global.colors.white
    : theme.global.colors.black

  const tickLabelProps = {
    'aria-hidden': 'true',
    dx: '-0.25em',
    dy: '0.2em',
    fill: axisColour,
    fontFamily: theme.global.font.family,
    fontSize: '1rem',
    textAnchor: 'middle'
  }

  function shortDayLabels(dayName) {
    const stat = stats.find(stat => stat.longLabel === dayName)
    return stat.label
  }

  return (
    <div>
      <svg
        height={HEIGHT}
        viewBox={`${-PADDING} ${-PADDING} ${WIDTH} ${HEIGHT}`}
        width='100%'
      >
        <AxisLeft
          stroke={axisColour}
          hideTicks
          scale={yScale}
          tickLabelProps={tickLabelProps}
          tickValues={yScale.ticks(3)}
        />
        <Group>
          {stats.map(stat => {
            const barWidth = xScale.bandwidth()
            const barHeight = HEIGHT - PADDING - yScale(stat.count)
            const barX = xScale(stat.longLabel)
            const barY = HEIGHT - PADDING - barHeight
            return (
              <StyledBarGroup focusable key={stat.period} tabIndex={0}>
                <Bar
                  aria-label={stat.alt}
                  role='img'
                  fill={theme.global.colors['accent-1']}
                  height={barHeight}
                  width={barWidth}
                  x={barX}
                  y={barY}
                />
                <StyledBarLabel aria-hidden='true' x={barX + 20} y={barY - 20}>
                  {stat.count}
                </StyledBarLabel>
              </StyledBarGroup>
            )
          })}
        </Group>
        <AxisBottom
          stroke={axisColour}
          hideTicks
          label='Date Range (UTC)'
          labelOffset={30}
          labelProps={{
            fontSize: '1rem',
          }}
          scale={xScale}
          tickFormat={shortDayLabels}
          tickLabelProps={tickLabelProps}
          top={HEIGHT - PADDING}
        />
      </svg>
    </div>
  )
}

ClassificationsChart.propTypes = {
  stats: arrayOf(
    shape({
      alt: string,
      count: number,
      label: string,
      longLabel: string,
      period: string
    })
  )
}

export default ClassificationsChart
