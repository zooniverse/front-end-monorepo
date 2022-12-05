import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'

import SurveyTask from '@plugins/tasks/survey'
import { task } from '@plugins/tasks/survey/mock-data'

import Choice from './Choice'

const mockTask = SurveyTask.TaskModel.create(task)

export default {
  title: 'Tasks / Survey / Choice',
  component: Choice,
  args: {
    choiceId: 'KD',
    dark: false
  },
  argTypes: {
    choiceId: {
      type: 'select',
      options: mockTask.choicesOrder
    }
  }
}

const background = {
  dark: 'dark-1',
  light: 'light-1'
}

export const Default = ({
  choiceId,
  dark
}) => {
  const themeMode = dark ? 'dark' : 'light'
  
  return (
    <Grommet
      background={background}
      theme={zooTheme}
      themeMode={themeMode}
    >
      <Box
        align='end'
        fill='horizontal'
      >
        <Box
          background={{
            dark: 'dark-3',
            light: 'neutral-6'
          }}
          
          pad='1em'
          width='380px'
        >
          <Choice
            choiceId={choiceId}
            task={mockTask}
          />
        </Box>
      </Box>
    </Grommet>
  )
}
