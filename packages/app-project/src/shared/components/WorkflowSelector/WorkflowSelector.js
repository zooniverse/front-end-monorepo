import asyncStates from '@zooniverse/async-states'
import { Markdownz, SpacedText } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Box, Paragraph, Text } from 'grommet'
import { arrayOf, bool, shape, string } from 'prop-types'
import Loader from '../Loader'
import WorkflowSelectButtons from './components/WorkflowSelectButtons'
import en from './locales/en'

counterpart.registerTranslations('en', en)

const markdownzComponents = {
  p: nodeProps => <Paragraph {...nodeProps} margin='none' />
}

function WorkflowSelector (props) {
  const {
    assignedWorkflowID = '',
    uppLoaded = false,
    userReadyState,
    workflowAssignmentEnabled = false,
    workflowDescription = '',
    workflows
  } = props
  const workflowDescriptionToRender = workflowDescription || counterpart('WorkflowSelector.message')

  return (
    <Box>
      <SpacedText weight='bold' margin={{ bottom: 'xsmall' }}>
        {counterpart('WorkflowSelector.getStarted')}
      </SpacedText>
      <Markdownz components={markdownzComponents}>
        {workflowDescriptionToRender}
      </Markdownz>

      {(userReadyState === asyncStates.error) && (
        <Box
          align='center'
          justify='center'
          margin={{ top: 'small' }}
        >
          {counterpart('WorkflowSelector.error')}
        </Box>
      )}

      {(userReadyState === asyncStates.success && uppLoaded) && (
        <Box
          alignSelf='start'
          fill='horizontal'
          gap='xsmall'
          margin={{ top: 'small' }}
          width={{ max: 'medium' }}
        >
          <WorkflowSelectButtons
            assignedWorkflowID={assignedWorkflowID}
            workflowAssignmentEnabled={workflowAssignmentEnabled}
            workflows={workflows}
          />

          {(workflows.length === 0) && (
            <Box background='accent-2' pad='xsmall' width={{ max: 'medium' }}>
              <Text size='small' textAlign='center'>
                {counterpart('WorkflowSelector.noWorkflows')}
              </Text>
            </Box>
          )}

        </Box>
      )}

      {(![asyncStates.success, asyncStates.error].includes(userReadyState)) && (
        <Loader margin={{ top: 'small' }} width='100%' />
      )}
    </Box>
  )
}

WorkflowSelector.propTypes = {
  userReadyState: string,
  workflowAssignmentEnabled: bool,
  workflowDescription: string,
  workflows: arrayOf(shape({
      id: string.isRequired
    }).isRequired).isRequired
}

export default WorkflowSelector
