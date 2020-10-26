import { letterFrequency } from '@vx/mock-data'
import { scaleBand, scaleLinear } from '@vx/scale'

const margin = {
  bottom: 40,
  left: 40,
  right: 0,
  top: 0
}
const parentHeight = 768
const parentWidth = 1024

const xMax = parentWidth - margin.left - margin.right
const yMax = parentHeight - margin.bottom - margin.top

const optionsMock = {
  chartOptions: {
    margin: {
      bottom: 40,
      left: 60,
      right: 0,
      top: 0
    },
    xAxisLabel: 'Letters',
    yAxisLabel: 'Frequency'
  }
}

const dataInZooFormat = letterFrequency.map((datum) => {
  return { label: datum.letter, value: datum.frequency }
})

const dataWithVariableBarColor = letterFrequency.map((datum) => {
  return { color: '#1cc6b7', label: datum.letter, value: datum.frequency }
})

const mockData = Object.assign({}, { data: dataInZooFormat }, optionsMock)
const mockDataWithColor = Object.assign({}, { data: dataWithVariableBarColor }, optionsMock)

const xScale = scaleBand({
  domain: dataInZooFormat.map(datum => datum.label),
  range: [0, xMax],
  round: true,
  padding: 0.25
})

const yScale = scaleLinear({
  domain: [0, Math.max(...dataInZooFormat.map(datum => datum.value))],
  range: [yMax, 0],
  round: true
})

const variableStarPeriodMockData = {
  data: [
    {
      color: 'neutral-3',
      label: 'filter-1',
      value: 0.4661477096
    },
    {
      color: 'status-critical',
      label: 'filter-2',
      value: 1.025524961
    }
  ],
  chartOptions: {
    margin: {
      bottom: 40,
      left: 25,
      right: 0,
      top: 0
    },
    xAxisLabel: 'Period',
    yAxisLabel: ''
  }
}

const variableStarAmplitudeMockData = {
  data: [
    {
      color: 'neutral-3',
      label: 'filter-1',
      value: 1.045
    },
    {
      color: 'status-critical',
      label: 'filter-2',
      value: 1.9989011347
    }
  ],
  chartOptions: {
    margin: {
      bottom: 40,
      left: 25,
      right: 0,
      top: 0
    },
    xAxisLabel: 'Amplitude',
    yAxisLabel: ''
  }
}

export default mockData
export {
  mockDataWithColor,
  variableStarAmplitudeMockData,
  variableStarPeriodMockData,
  xScale,
  xMax,
  yScale,
  yMax
}
