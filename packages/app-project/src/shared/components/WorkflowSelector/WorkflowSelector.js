import asyncStates from '@zooniverse/async-states'
import { Markdownz, SpacedText } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Box, Paragraph, Text } from 'grommet'
import { useRouter } from 'next/router'
import { arrayOf, shape, string } from 'prop-types'
import React, { useState } from 'react'
import { withTheme } from 'styled-components'
import { Bars } from 'svg-loaders-react'

import { SubjectSetPicker, WorkflowSelectButton } from './components'
import en from './locales/en'

counterpart.registerTranslations('en', en)

const markdownzComponents = {
  p: nodeProps => <Paragraph {...nodeProps} margin='none' />
}

function WorkflowSelector (props) {
  const { userReadyState, workflows } = props
  const router = useRouter()
  const { owner, project } = router?.query || {}
  const loaderColor = props.theme.global.colors.brand
  const workflowDescription = props.workflowDescription || counterpart('WorkflowSelector.message')
  const [ activeWorkflow, setActiveWorkflow ] = useState(props.activeWorkflow)

  function onSelect(event, workflow) {
    if (workflow.grouped) {
      event.preventDefault()
      setActiveWorkflow(workflow)
      return false
    }
    return true
  }

  return (
    <Box>
      <SpacedText weight='bold' margin={{ bottom: 'xsmall' }}>
        {counterpart('WorkflowSelector.getStarted')}
      </SpacedText>
      <Markdownz components={markdownzComponents}>
        {workflowDescription}
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

      {(userReadyState === asyncStates.success) && (
        <Box
          alignSelf='start'
          fill='horizontal'
          gap='xsmall'
          margin={{ top: 'small' }}
          width={{ max: 'medium' }}
        >
          {activeWorkflow &&
            <SubjectSetPicker
              active={!!activeWorkflow}
              closeFn={() => setActiveWorkflow(null)}
              owner={owner}
              project={project}
              title={activeWorkflow.displayName || 'Choose a subject set'}
              workflow={activeWorkflow}
            />
          }
          {(workflows.length > 0) && workflows.map(workflow =>
            <WorkflowSelectButton key={workflow.id} onSelect={onSelect} workflow={workflow} />
          )}

          {(workflows.length === 0) && (
            <Box background='accent-4' pad='xsmall' width={{ max: 'medium' }}>
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
  activeWorkflow: shape({
    id: string.isRequired
  }),
  userReadyState: string,
  workflowDescription: string,
  workflows: arrayOf(shape({
      id: string.isRequired
    }).isRequired).isRequired
}

export default withTheme(WorkflowSelector)
export { WorkflowSelector }
