import { DataChart, ResponsiveContext, Text } from 'grommet'
import { arrayOf, func, number, shape, string } from 'prop-types'
import { useContext } from 'react'
import styled from 'styled-components'

import {
  getDateInterval as defaultGetDateInterval
} from '@utils'

import { getCompleteData as defaultGetCompleteData } from './helpers/getCompleteData'
import getDateRangeLabel from './helpers/getDateRangeLabel'

const TYPE_LABEL = {
  count: 'Classifications',
  session_time: 'Time'
}

const X_AXIS_FREQUENCY = {
  everyOther: 'everyOther',
  everyFourth: 'everyFourth'
}

const StyledDataChart = styled(DataChart)`
  .hidden-period-label {
    display: none;
  }

  // The only way to get to the x-axis bounding div
  &.styled-grommet-barchart > :first-child {

    // Align the x-axis visual label to the first date label
    div:first-of-type > span {
      position: relative;

      &::after {
        content: 'Date range (UTC)';
        position: absolute;
        top: calc(100% + 5px);
        left: -0;
        font-size: 0.75rem;
        width: max-content;
      }
    }
  }
`

function BarChart({
  data = [],
  dateRange,
  getCompleteData = defaultGetCompleteData,
  getDateInterval = defaultGetDateInterval,
  type = 'count'
}) {
  const size = useContext(ResponsiveContext)

  // getDateInterval returns an object with a period property based on the date range, start_date, and end_date
  const dateInterval = getDateInterval(dateRange)

  // getCompleteData returns an array of objects with a period, count, and session_time property,
  // including any periods without stats with a count and session_time of 0
  const completeData = getCompleteData({ data, dateInterval })

  const dateRangeLabel = getDateRangeLabel(dateInterval)
  const typeLabel = TYPE_LABEL[type]

  // with no data set gradient as 'brand'
  let gradient = 'brand'
  // with data set gradient range based on data type (count or session_time) and max value of data type
  if (data.length > 0) {
    const types = data.map((d) => d[type])
    const max = Math.max(...types)
    gradient = [
      { value: 0, color: 'neutral-1' },
      { value: max, color: 'brand' }
    ]
  }

  // set chart options based on screen size and data length
  const chartOptions = {
    color: gradient,
    property: type,
    type: 'bar'
  }

  let xAxisFrequency
  if (completeData.length > 12 && completeData.length < 25) {
    xAxisFrequency = X_AXIS_FREQUENCY.everyOther
  } else if (completeData.length > 24) {
    xAxisFrequency = X_AXIS_FREQUENCY.everyFourth
  }

  if (size !== 'small' && completeData.length < 9) {
    chartOptions.thickness = 'xlarge'
  }
  if (size === 'small') {
    xAxisFrequency = xAxisFrequency || X_AXIS_FREQUENCY.everyOther

    if (completeData.length < 12) {
      chartOptions.thickness = 'small'
    } else if (completeData.length > 11 && completeData.length < 19) {
      chartOptions.thickness = 'xsmall'
    } else {
      chartOptions.thickness = 'hair'
    }
  }

  return (
    <StyledDataChart
      a11yTitle={`Bar chart of ${typeLabel} by ${dateRangeLabel.countLabel} from ${dateRange.startDate} to ${dateRange.endDate}`}
      className='styled-grommet-barchart'
      axis={{
        x: { granularity: 'fine', property: 'period' },
        y: { granularity: 'fine', property: type },
      }}
      chart={chartOptions}
      data={completeData}
      detail={!!completeData?.length}
      guide={{
        y: {
          granularity: 'fine'
        }
      }}
      series={[
        {
          property: 'period',
          label: dateRangeLabel.countLabel,
          render: ((period, datum, datumIndex) => {
            const date = new Date(period)

            if (xAxisFrequency === X_AXIS_FREQUENCY.everyOther && datum?.index % 2 !== 0) {
              return (
                <Text
                  className='hidden-period-label'
                  data-testid='periodLabel'
                  textAlign='center'
                >
                  {date.toLocaleDateString('en-US', dateRangeLabel.tLDS)}
                </Text>
              )
            } else if (xAxisFrequency === X_AXIS_FREQUENCY.everyFourth && datum?.index % 4 !== 0) {
              return (
                <Text
                  className='hidden-period-label'
                  data-testid='periodLabel'
                  textAlign='center'
                >
                  {date.toLocaleDateString('en-US', dateRangeLabel.tLDS)}
                </Text>
              )
            } else {
              return (
                <Text
                  data-testid='periodLabel'
                  textAlign='center'
                >
                  {date.toLocaleDateString('en-US', dateRangeLabel.tLDS)}
                </Text>
              )
            }
          }),
        },
        {
          property: type,
          label: typeLabel,
          render: ((number) => {
            if (type === 'session_time') {
              const time = number / dateRangeLabel.time
              const timeLabelText = dateRangeLabel.timeLabel === 'hrs' ? `${time.toFixed(1).toLocaleString()} ${dateRangeLabel.timeLabel}` : `${time.toFixed(0).toLocaleString()} ${dateRangeLabel.timeLabel}`
              return (
                <Text data-testid='timeLabel'>
                  {timeLabelText}
                </Text>
              )
            } else {
              return (
                <Text data-testid='countLabel'>
                  {number.toLocaleString()}
                </Text>
              )
            }
          }),
        },
      ]}
      size='fill'
    />
  )
}

BarChart.propTypes = {
  data: arrayOf(shape({
    period: string,
    count: number,
    session_time: number
  })),
  dateRange: shape({
    endDate: string,
    startDate: string
  }),
  getCompleteData: func,
  getDateInterval: func,
  type: string
}

export default BarChart
