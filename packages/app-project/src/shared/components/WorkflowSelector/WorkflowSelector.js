import asyncStates from '@zooniverse/async-states'
import { Markdownz, SpacedText } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Box, Paragraph, Text } from 'grommet'
import { arrayOf, bool, func, shape, string } from 'prop-types'
import { withTheme } from 'styled-components'
import { Bars } from 'svg-loaders-react'
import WorkflowSelectButtons from './components/WorkflowSelectButtons'
import en from './locales/en'

counterpart.registerTranslations('en', en)

const markdownzComponents = {
  p: nodeProps => <Paragraph {...nodeProps} margin='none' />
}

function WorkflowSelector (props) {
  const {
    assignedWorkflowID = '',
    onSelect,
    uppLoaded = false,
    userReadyState,
    workflowAssignmentEnabled = false,
    workflowDescription = '',
    workflows
  } = props
  const loaderColor = props.theme.global.colors.brand
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
            onSelect={onSelect}
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
        <Box align='center' justify='center' margin={{ top: 'small' }}>
          <Box height='xxsmall' width='xxsmall'>
            <Bars
              fill={loaderColor}
              height='80%'
              viewBox='0 0 135 140'
              width='100%'
            />
          </Box>
        </Box>
      )}
    </Box>
  )
}

WorkflowSelector.propTypes = {
  onSelect: func.isRequired,
  userReadyState: string,
  workflowAssignmentEnabled: bool,
  workflowDescription: string,
  workflows: arrayOf(shape({
      id: string.isRequired
    }).isRequired).isRequired
}

export default withTheme(WorkflowSelector)
export { WorkflowSelector }
