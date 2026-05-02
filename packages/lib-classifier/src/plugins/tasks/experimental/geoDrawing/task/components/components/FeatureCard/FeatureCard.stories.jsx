import { Box } from 'grommet'
import styled from 'styled-components'
import FeatureCard from './FeatureCard'

const TaskAreaWrapper = styled(Box)`
  background: white;
  padding: 16px;
  width: 250px;
`

export default {
  title: 'Tasks / GeoDrawing / FeatureCard',
  component: FeatureCard
}

export function Default() {
  return (
    <TaskAreaWrapper>
      <FeatureCard lat='51.51' lon='-0.12' radius={5000} unit='meters' />
    </TaskAreaWrapper>
  )
}

export function InFeet() {
  return (
    <TaskAreaWrapper>
      <FeatureCard lat='51.51' lon='-0.12' radius={5000} unit='feet' />
    </TaskAreaWrapper>
  )
}

export function InKilometers() {
  return (
    <TaskAreaWrapper>
      <FeatureCard lat='51.51' lon='-0.12' radius={5000} unit='kilometers' />
    </TaskAreaWrapper>
  )
}
