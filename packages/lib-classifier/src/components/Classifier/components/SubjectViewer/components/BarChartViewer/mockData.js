import { letterFrequency } from '@vx/mock-data'
import zooTheme from '@zooniverse/grommet-theme'

const { colors } = zooTheme.global

const optionsMock = {
  options: {
    axes: {
      x: {
        label: 'Letters',
        margin: 60,
      },
      y: {
        label: 'Frequency',
        margin: 40
      }
    }
  }
}

const dataInZooFormat = letterFrequency.map((datum) => {
  return { label: datum.letter, value: datum.frequency }
})

const dataWithVariableBarColor = letterFrequency.map((datum) => {
  return { color: colors['accent-3'], label: datum.letter, value: datum.frequency }
})

const mockData = Object.assign({}, { data: dataInZooFormat }, optionsMock)
const mockDataWithColor = Object.assign({}, { data: dataWithVariableBarColor }, optionsMock)

export default mockData
export { mockDataWithColor }