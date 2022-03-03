import asyncStates from '@zooniverse/async-states'
import { Markdownz, SpacedText } from '@zooniverse/react-components'
import { Box, Paragraph, Text } from 'grommet'
import { arrayOf, bool, shape, string } from 'prop-types'
import { useTranslation } from 'next-i18next'

import Loader from '../Loader'
import WorkflowSelectButtons from './components/WorkflowSelectButtons'

const markdownzComponents = {
  p: nodeProps => <Paragraph {...nodeProps} margin='none' />
}

function WorkflowSelector ({
  assignedWorkflowID = '',
  uppLoaded = false,
  userReadyState,
  workflowAssignmentEnabled = false,
  workflowDescription = '',
  workflows
}) {
  const { t } = useTranslation('components')
  const workflowDescriptionToRender = workflowDescription || t('WorkflowSelector.message')

  return (
    <Box>
      <SpacedText weight='bold' margin={{ bottom: 'xsmall' }}>
        {t('WorkflowSelector.getStarted')}
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
          {t('WorkflowSelector.error')}
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
                {t('WorkflowSelector.noWorkflows')}
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
  /** assigned workflow for projects that use workflow assignment. */
  assignedWorkflowID: string,
  /** Have the user project preferences loaded? */
  uppLoaded: bool,
  /** User loading state */
  userReadyState: string,
  /** True if this project assigns workflows to volunteers. */
  workflowAssignmentEnabled: bool,
  /** Localised workflow description for the project. */
  workflowDescription: string,
  /** Summaries of active workflows with workflow name, completeness etc. */
  workflows: arrayOf(shape({
    id: string.isRequired
  }).isRequired).isRequired
}

export default WorkflowSelector
