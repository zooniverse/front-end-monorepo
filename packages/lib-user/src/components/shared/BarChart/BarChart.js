import { DataChart, Text } from 'grommet'
import { arrayOf, number, shape, string } from 'prop-types'

import getDateRangeLabel from './helpers/getDateRangeLabel'

function BarChart ({
  data = [],
  dateRange = 'Last7Days',
  type = 'count'
}) {
  const dateRangeLabel = getDateRangeLabel(dateRange)
  
  const chartOptions = {
    color: 'brand',
    property: type,
    type: 'bar'
  }
  if (data.length < 10) {
    chartOptions.thickness = 'xlarge'
  }

  return (
    <DataChart
      axis={{
        x: { granularity: 'fine', property: 'period' },
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
          label: type === 'count' ? 'Classifications' : 'Time',
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
  type: string
}

export default BarChart
