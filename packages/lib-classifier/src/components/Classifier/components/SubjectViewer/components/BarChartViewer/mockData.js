import { letterFrequency } from '@vx/mock-data'
import zooTheme from '@zooniverse/grommet-theme'

const { colors } = zooTheme.global

const optionsMock = {
  options: {
    axis: {
      label: 'Letters'
    }
  }
}

const dataInZooFormat = letterFrequency.map((datum) => {
  return { label: datum.letter, value: datum.frequency }
})

const dataWithVariableBarColor = letterFrequency.map((datum) => {
  return { color: colors['accent-1'], label: datum.letter, value: datum.frequency }
})

const mockData = Object.assign({}, { data: dataInZooFormat }, optionsMock)
const mockDataWithColor = Object.assign({}, { data: dataWithVariableBarColor }, optionsMock)

export default mockData
export { mockDataWithColor }