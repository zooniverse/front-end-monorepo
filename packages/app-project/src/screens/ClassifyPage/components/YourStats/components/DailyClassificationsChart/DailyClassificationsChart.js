import counterpart from 'counterpart'
import { array, object, string } from 'prop-types'
import React from 'react'
import { withTheme } from 'styled-components'
import { AxisBottom, AxisLeft } from '@vx/axis'
import { Group } from '@vx/group'
import { Bar } from '@vx/shape'
import { scaleBand, scaleLinear } from '@vx/scale'
import WidgetHeading from '../../../../../../shared/components/WidgetHeading'

import en from './locales/en'

counterpart.registerTranslations('en', en)

function DailyClassificationsChart ({ stats, projectName, theme }) {
  const HEIGHT = 200
  const PADDING = 20
  const WIDTH = 300
  const xScale = scaleBand({
    rangeRound: [0, WIDTH],
    domain: stats.map(stat => stat.longLabel),
    padding: 0.1
  });

  const yScale = scaleLinear({
    rangeRound: [HEIGHT - PADDING, 0],
    domain: [0, Math.max(...stats.map(stat => stat.count))],
    nice: true
  });

  function tickLabelProps () {
    return {
      dx: '-0.25em',
      dy: '0.2em',
      fill: theme.global.colors['light-4'],
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
        width="100%"
      >
        <AxisLeft
          stroke={theme.global.colors['light-3']}
          hideTicks
          scale={yScale}
          tickLabelProps={tickLabelProps}
          tickValues={yScale.ticks(3)}
        />
        <Group>
          {stats.map(stat => {
            const barWidth = xScale.bandwidth();
            const barHeight = (HEIGHT - PADDING) - yScale(stat.count);
            const barX = xScale(stat.longLabel)
            const barY = (HEIGHT - PADDING) - barHeight
            return (
              <Bar
                aria-label={stat.alt}
                key={stat.period}
                role="image"
                fill={theme.global.colors['accent-2']}
                height={barHeight}
                width={barWidth}
                x={barX}
                y={barY}
              />
            )
          })}
        </Group>
        <AxisBottom
          stroke={theme.global.colors['light-3']}
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
      colors: {}
    }
  }
}

export default withTheme(DailyClassificationsChart)
export { DailyClassificationsChart }

