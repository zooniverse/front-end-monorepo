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

function DailyClassificationsChart ({ counts, projectName, theme }) {
  const xScale = scaleBand({
    rangeRound: [0, 300],
    domain: counts.map(count => count.longLabel),
    padding: 0.1
  });

  const yScale = scaleLinear({
    rangeRound: [180, 0],
    domain: [0, Math.max(...counts.map(count => count.count))],
    nice: true
  });

  function tickLabelProps () {
    return {
      dx: '-0.25em',
      dy: '0.2em',
      fill: theme.global.colors['light-4'],
      fontFamily: 'Arial',
      fontSize: 10,
      textAnchor: 'middle' }
  } 
  function shortDayLabels (dayName) {
    const count = counts.find(count => count.longLabel === dayName)
    return count.label
  }

  return (
    <>
      <WidgetHeading>
        {`${projectName} daily classification counts`}
      </WidgetHeading>
      <svg
        height="267"
        viewBox="0 0 300 240"
        width="500"
      >
        <AxisLeft
          stroke={theme.global.colors['light-3']}
          hideTicks
          scale={yScale}
          tickLabelProps={tickLabelProps}
          tickValues={yScale.ticks(3)}
        />
        <Group>
          {counts.map(count => {
            const barWidth = xScale.bandwidth();
            const barHeight = 180 - yScale(count.count);
            const barX = xScale(count.longLabel)
            const barY = 180 - barHeight
            return (
              <Bar
                aria-label={count.alt}
                key={count.period}
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
          top={180}
        />
      </svg>
    </>
  )
}

DailyClassificationsChart.propTypes = {
  counts: array,
  projectName: string.isRequired,
  theme: object
}

DailyClassificationsChart.defaultProps = {
  counts: [],
  theme: {
    global: {
      colors: {}
    }
  }
}

export default withTheme(DailyClassificationsChart)
export { DailyClassificationsChart }

