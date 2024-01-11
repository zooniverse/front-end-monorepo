import { DataChart, Text } from 'grommet'
import { arrayOf, number, shape, string } from 'prop-types'
import withResponsiveContext from '@zooniverse/react-components/helpers/withResponsiveContext'

import dateRanges from './helpers/dateRanges'
import getDateRangeLabel from './helpers/getDateRangeLabel'

function BarChart ({
  data = [],
  dateRange = dateRanges.Last7Days,
  screenSize = 'small',
  type = 'count'
}) {
  const dateRangeLabel = getDateRangeLabel(dateRange)
  const typeLabel = type === 'count' ? 'Classifications' : 'Time'
  const readableDateRange = dateRange
    .replace(/([A-Z])/g, ' $1')
    .replace(/([0-9]+)/g, ' $1')
    .trim()

  // set chart options based on screen size and data length
  const chartOptions = {
    color: 'brand',
    property: type,
    type: 'bar'
  }
  if (screenSize !== 'small' && data.length < 9) {
    chartOptions.thickness = 'xlarge'
  }
  if (screenSize === 'small') {
    if (data.length < 12) {
      chartOptions.thickness = 'small'
    } else if (data.length > 11 && data.length < 19) {
      chartOptions.thickness = 'xsmall'
    } else {
      chartOptions.thickness = 'hair'
    }
  }

  // set x axis granularity based on data length
  let xAxisGranularity = 'fine'
  if (data.length > 12) {
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
      data={data}
      detail
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
  dateRange: string,
  screenSize: string,
  type: string
}

export default withResponsiveContext(BarChart)
