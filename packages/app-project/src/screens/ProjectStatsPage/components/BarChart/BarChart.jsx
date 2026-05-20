/** BarChart component almost exactly like lib-user's but adapted to number of Talk comments */

import { DataChart, ResponsiveContext, Text } from 'grommet'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'
import { useContext } from 'react'

import getDateRangeLabel from './getDateRangeLabel'
import getCompleteData from './getCompleteData'
import { getInterval } from '../../helpers/getDateInterval'

const X_AXIS_FREQUENCY = {
  everyOther: 'everyOther',
  everyFourth: 'everyFourth'
}

const StyledDataChart = styled(DataChart)`
  .hidden-period-label {
    display: none;
  }
`

function BarChart({
  data = [], // response from ERAS query
  dateRange,
  type = 'count' // or 'comments'
}) {
  const { i18n, t } = useTranslation('screens')
  const size = useContext(ResponsiveContext)
  const locale = i18n.language === 'test' ? 'en' : i18n.language

  // labels for number of classifications or number of Talk comments
  const TYPE_LABEL = {
    count: t('ProjectStats.count'),
    comments: t('ProjectStats.comments')
  }
  const typeLabel = TYPE_LABEL[type]

  const { startDate, endDate } = dateRange || {}
  const differenceInDays = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
  const period = getInterval(differenceInDays)

  const dateInterval = {
    end_date: endDate,
    period,
    start_date: startDate
  }

  // getCompleteData returns an array of objects with a period and count property including any without stats with a count of 0
  const completeData = getCompleteData(data, dateInterval)

  const dateRangeLabel = getDateRangeLabel(dateInterval, locale)

  // with no data set gradient as 'brand'
  let gradient = 'brand'
  // with data set gradient range based on max value of datum.count
  if (data.length > 0) {
    const types = data.map(d => d.count)
    const max = Math.max(...types)
    gradient = [
      { value: 0, color: 'neutral-1' },
      { value: max, color: 'brand' }
    ]
  }

  // set chart options based on data length and type
  const chartOptions = {
    color: gradient,
    property: 'count',
    type: 'bar'
  }

  // Set the x-axis frequency
  let xAxisFrequency
  if (completeData.length > 12 && completeData.length < 25) {
    xAxisFrequency = X_AXIS_FREQUENCY.everyOther
  } else if (completeData.length > 24) {
    xAxisFrequency = X_AXIS_FREQUENCY.everyFourth
  }

  // Measure the screen size and adjust the x-axis frequency and bar thickness
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
      a11yTitle={t('ProjectStats.BarChart.a11y', {
        typeLabel,
        countLabel: dateRangeLabel.countLabel,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate
      })}
      className='styled-grommet-barchart'
      axis={{
        x: { granularity: 'fine', property: 'period' },
        y: { granularity: 'fine', property: 'count' }
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
          render: (period, datum, datumIndex) => {
            if (!period) return
            const date = new Date(period)

            if (xAxisFrequency === X_AXIS_FREQUENCY.everyOther && datum?.index % 2 !== 0) {
              return (
                <Text className='hidden-period-label' data-testid='periodLabel' textAlign='center'>
                  {date.toLocaleDateString(locale, dateRangeLabel.tLDS)}
                </Text>
              )
            } else if (xAxisFrequency === X_AXIS_FREQUENCY.everyFourth && datum?.index % 4 !== 0) {
              return (
                <Text className='hidden-period-label' data-testid='periodLabel' textAlign='center'>
                  {date.toLocaleDateString(locale, dateRangeLabel.tLDS)}
                </Text>
              )
            } else {
              return (
                <Text data-testid='periodLabel' textAlign='center'>
                  {date.toLocaleDateString(locale, dateRangeLabel.tLDS)}
                </Text>
              )
            }
          }
        },
        {
          property: 'count',
          label: typeLabel,
          render: number => {
            return <Text data-testid='countLabel'>{number.toLocaleString()}</Text>
          }
        }
      ]}
      size='fill'
    />
  )
}

export default BarChart
