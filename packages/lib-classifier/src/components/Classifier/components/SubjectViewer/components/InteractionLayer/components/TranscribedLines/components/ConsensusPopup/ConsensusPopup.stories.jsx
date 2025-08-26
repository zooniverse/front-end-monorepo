import { Box } from 'grommet'
import setupMock from './helpers/setupMock'
import ConsensusPopup from './ConsensusPopup'

const completedLines = setupMock()

export default {
  title: 'Drawing Tools / TranscribedLines/ConsensusPopup',
  component: ConsensusPopup,
  parameters: {
    docs: {
      inlineStories: false
    }
  }
}

function ConsensusPopupStory(props) {
  const { index = 0 } = props

  return (
    <Box width='1000px'>
      <ConsensusPopup active line={completedLines[index]} />
    </Box>
  )
}

export function Default() {
  return <ConsensusPopupStory />
}
