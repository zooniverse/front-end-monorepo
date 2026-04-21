import { Box } from 'grommet'
import styled from 'styled-components'

import RadiusSlider from './RadiusSlider'

const TaskAreaWrapper = styled(Box)`
  background: ${props => props.theme.global.colors['accent-1']};
  padding: 16px;
  width: 250px;
`

export default {
  title: 'Tasks / GeoDrawing / RadiusSlider',
  component: RadiusSlider
}

export function Default() {
  return (
    <TaskAreaWrapper>
      <RadiusSlider
        maxRadius={50000}
        onChange={function handleChange() {}}
        unitLabel='m'
        value={5000}
      />
    </TaskAreaWrapper>
  )
}
