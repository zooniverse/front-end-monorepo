import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import React from 'react'
import { AxisBottom, AxisLeft } from '@vx/axis'
import { Group } from '@vx/group'
import { Bar } from '@vx/shape'
import { scaleBand, scaleLinear } from '@vx/scale'
import WidgetHeading from '../../../../../../shared/components/WidgetHeading'

import en from './locales/en'

counterpart.registerTranslations('en', en)

function DailyClassificationsChart ({ counts, projectName }) {
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
  return (
    <>
      <WidgetHeading>
        {`${projectName} daily classification counts`}
      </WidgetHeading>
      <svg
        height="267"
        viewBox="0 0 300 200"
        width="500"
      >
        <AxisLeft
          hideTicks
          scale={yScale}
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
                role="image"
                height={barHeight}
                width={barWidth}
                x={barX}
                y={barY}
              />
            )
          })}
        </Group>
        <AxisBottom
          hideTicks
          scale={xScale}
          top={180}
        />
      </svg>
    </>
  )
}

DailyClassificationsChart.propTypes = {
}

DailyClassificationsChart.defaultProps = {
}

export default DailyClassificationsChart
