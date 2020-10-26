import counterpart from 'counterpart'
import { array, object, string } from 'prop-types'
import React from 'react'
import styled, { css, withTheme } from 'styled-components'
import { AxisBottom, AxisLeft } from '@vx/axis'
import { Group } from '@vx/group'
import { Bar } from '@vx/shape'
import { Text } from '@vx/text'
import { scaleBand, scaleLinear } from '@vx/scale'
import WidgetHeading from '@shared/components/WidgetHeading'

import en from './locales/en'

counterpart.registerTranslations('en', en)

const StyledBarGroup = styled(Group)`
  text {
    display: none;
    ${props => css`
      fill: ${props.theme.global.colors['light-1']};
      font-size: ${props.theme.text.small.size}
    `}
  }
  
  &:hover rect,
  &:focus rect {
    ${props => css`fill: ${props.theme.global.colors.brand};`}
  }

  &:hover text,
  &:focus text {
    display: inline-block;
  }
`

function DailyClassificationsChart ({ stats, projectName, theme }) {
  const HEIGHT = 200
  const PADDING = 20
  const WIDTH = 300
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
    ? theme.global.colors.text.dark
    : theme.global.colors.text.light

  function tickLabelProps () {
    return {
      'aria-hidden': 'true',
      dx: '-0.25em',
      dy: '0.2em',
      fill: axisColour,
      fontFamily: theme.global.font.family,
      fontSize: 10,
      textAnchor: 'middle' }
  }
  function shortDayLabels (dayName) {
    const stat = stats.find(stat => stat.longLabel === dayName)
    return stat.label
  }
  return (
    <>
      <WidgetHeading>
        {counterpart('DailyClassificationsChart.title', { projectName })}
      </WidgetHeading>
      <svg
        height={HEIGHT + PADDING}
        viewBox={`${-PADDING} ${-PADDING} ${WIDTH + PADDING} ${HEIGHT + PADDING}`}
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
            const barHeight = (HEIGHT - PADDING) - yScale(stat.count)
            const barX = xScale(stat.longLabel)
            const barY = (HEIGHT - PADDING) - barHeight
            return (
              <StyledBarGroup
                focusable
                key={stat.period}
                tabIndex={0}
              >
                <Bar
                  aria-label={stat.alt}
                  role='img'
                  fill={theme.global.colors['accent-2']}
                  height={barHeight}
                  width={barWidth}
                  x={barX}
                  y={barY}
                />
                <Text
                  aria-hidden='true'
                  textAnchor='middle'
                  x={barX + 20}
                  y={barY + 20}
                >
                  {stat.count}
                </Text>
              </StyledBarGroup>
            )
          })}
        </Group>
        <AxisBottom
          stroke={axisColour}
          hideTicks
          scale={xScale}
          tickFormat={shortDayLabels}
          tickLabelProps={tickLabelProps}
          top={HEIGHT - PADDING}
        />
      </svg>
    </>
  )
}

DailyClassificationsChart.propTypes = {
  stats: array,
  projectName: string.isRequired,
  theme: object
}

DailyClassificationsChart.defaultProps = {
  stats: [],
  theme: {
    global: {
      colors: {
        text: {}
      }
    },
    text: {
      small: {}
    }
  }
}

export default withTheme(DailyClassificationsChart)
export { DailyClassificationsChart }
