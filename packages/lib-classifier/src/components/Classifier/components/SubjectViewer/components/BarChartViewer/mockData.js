import { letterFrequency } from '@vx/mock-data'
import zooTheme from '@zooniverse/grommet-theme'

const { colors } = zooTheme.global

const optionsMock = {
  options: {
    margin: {
      bottom: 40,
      left: 60,
      right: 0,
      top: 0
    },
    xAxisLabel: 'Letters',
    yAxisLabel: 'Frequency',
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
  options: {
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
  options: {
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
  variableStarPeriodMockData
}
