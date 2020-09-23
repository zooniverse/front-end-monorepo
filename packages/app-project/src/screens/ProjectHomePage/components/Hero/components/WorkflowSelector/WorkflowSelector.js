import asyncStates from '@zooniverse/async-states'
import { Markdownz, SpacedText } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Box, Paragraph, Text } from 'grommet'
import { arrayOf, shape, string } from 'prop-types'
import React from 'react'
import { withTheme } from 'styled-components'
import { Bars } from 'svg-loaders-react'

import WorkflowSelectButton from './components/WorkflowSelectButton'
import en from './locales/en'

counterpart.registerTranslations('en', en)

const markdownzComponents = {
  p: nodeProps => <Paragraph {...nodeProps} margin='none' />
}

function WorkflowSelector (props) {
  const { loadingState, workflows } = props
  const loaderColor = props.theme.global.colors.brand
  const workflowDescription = props.workflowDescription || counterpart('WorkflowSelector.message')

  return (
    <Box>
      <SpacedText weight='bold' margin={{ bottom: 'xsmall' }}>
        {counterpart('WorkflowSelector.getStarted')}
      </SpacedText>
      <Markdownz components={markdownzComponents}>
        {workflowDescription}
      </Markdownz>

      {(loadingState === asyncStates.error) && (
        <Box
          align='center'
          justify='center'
          margin={{ top: 'small' }}
        >
          {counterpart('WorkflowSelector.error')}
        </Box>
      )}

      {(loadingState === asyncStates.success) && (
        <Box
          alignSelf='start'
          fill='horizontal'
          gap='xsmall'
          margin={{ top: 'small' }}
          width={{ max: 'medium' }}
        >

          {(workflows.length > 0) && workflows.map(workflow =>
            <WorkflowSelectButton key={workflow.id} workflow={workflow} />
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

      {(![asyncStates.success, asyncStates.error].includes(loadingState)) && (
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
  loadingState: string,
  workflowDescription: string,
  workflows: arrayOf(shape({
      id: string.isRequired
    }).isRequired).isRequired
}

export default withTheme(WorkflowSelector)
