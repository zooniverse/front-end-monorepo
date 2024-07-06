import { DataChart, ResponsiveContext, Text } from 'grommet'
import { arrayOf, func, number, shape, string } from 'prop-types'
import { useContext } from 'react'

import {
  getDateInterval as defaultGetDateInterval
} from '@utils'

import { getCompleteData as defaultGetCompleteData } from './helpers/getCompleteData'
import getDateRangeLabel from './helpers/getDateRangeLabel'

function BarChart({
  data = [],
  dateRange,
  getCompleteData = defaultGetCompleteData,
  getDateInterval = defaultGetDateInterval,
  type = 'count'
}) {
  const size = useContext(ResponsiveContext)
  
  // getDateInterval returns an object with a period and time property,
  // i.e. 'Last7Days' returns { end_date: '2021-09-30', period: 'day', start_date: '2021-09-24' }
  const dateInterval = getDateInterval(dateRange)

  // getCompleteData returns an array of objects with a period, count, and session_time property,
  // including any periods without stats with a count and session_time of 0
  const completeData = getCompleteData({ data, dateInterval })
  
  const period = dateInterval?.period
  const dateRangeLabel = getDateRangeLabel({ dateRange, period })
  const readableDateRange = dateRange
    .replace(/([A-Z])/g, ' $1')
    .replace(/([0-9]+)/g, ' $1')
    .trim()
  const typeLabel = type === 'count' ? 'Classifications' : 'Time'
  
  // set gradient range based on data type (count or session_time) and max value of data type
  const types = data.map((d) => d[type])
  const max = Math.max(...types)
  const gradient = [
    { value: 0, color: 'neutral-1' },
    { value: max, color: 'brand' }
  ]

  // set chart options based on screen size and data length
  const chartOptions = {
    color: gradient,
    property: type,
    type: 'bar'
  }

  if (size !== 'small' && completeData.length < 9) {
    chartOptions.thickness = 'xlarge'
  }
  if (size === 'small') {
    if (completeData.length < 12) {
      chartOptions.thickness = 'small'
    } else if (completeData.length > 11 && completeData.length < 19) {
      chartOptions.thickness = 'xsmall'
    } else {
      chartOptions.thickness = 'hair'
    }
  }

  // set x axis granularity based on data length
  let xAxisGranularity = 'fine'
  if (completeData.length > 12) {
    xAxisGranularity = 'medium'
  }

  return (
    <DataChart
      a11yTitle={`Bar chart of ${typeLabel} by ${dateRangeLabel.countLabel} for ${readableDateRange}`}
      axis={{
        x: { granularity: xAxisGranularity, property: 'period' },
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
          render: (period) => {
            const date = new Date(period)
            return (
              <Text data-testid='periodLabel' textAlign='center'>
                {date.toLocaleDateString('en-US', dateRangeLabel.tLDS)}
              </Text>
            )
          },
        },
        {
          property: type,
          label: typeLabel,
          render: ((number) => {
            if (type === 'session_time') {
              const time = number / dateRangeLabel.time  
              return (
                <Text data-testid='timeLabel'>
                  {`${time.toFixed(0)} ${dateRangeLabel.timeLabel}`}
                </Text>
              )
            } else {
              return (
                <Text data-testid='countLabel'>
                  {new Number(number).toLocaleString()}
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
