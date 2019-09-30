import asyncStates from '@zooniverse/async-states'
import { SpacedText } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Box, Text } from 'grommet'
import { arrayOf, shape, string } from 'prop-types'
import React from 'react'
import { withTheme } from 'styled-components'
import { Bars } from 'svg-loaders-react'

import WorkflowSelectButton from './components/WorkflowSelectButton'
import en from './locales/en'

counterpart.registerTranslations('en', en)

function WorkflowSelector (props) {
  const { workflows } = props
  const loaderColor = props.theme.global.colors.brand

  return (
    <Box>
      <SpacedText weight='bold' margin={{ bottom: 'xsmall' }}>
        {counterpart('WorkflowSelector.classify')}
      </SpacedText>
      <Text>
        {counterpart('WorkflowSelector.message')}
      </Text>

      {(workflows.loading === asyncStates.error) && (
        <Box
          align='center'
          justify='center'
          margin={{ top: 'small' }}
        >
          {counterpart('WorkflowSelector.error')}
        </Box>
      )}

      {(workflows.loading === asyncStates.success) && (
        <Box
          alignSelf='center'
          fill='horizontal'
          gap='xsmall'
          margin={{ top: 'small' }}
          width={{ max: 'medium' }}
        >

          {(workflows.data.length > 0) && workflows.data.map(workflow =>
            <WorkflowSelectButton key={workflow.id} workflow={workflow} />
          )}

          {(workflows.data.length === 0) && (
            <Box background='accent-4' pad='xsmall' width={{ max: 'medium' }}>
              <Text size='small' textAlign='center'>
                {counterpart('WorkflowSelector.noWorkflows')}
              </Text>
            </Box>
          )}

        </Box>
      )}

      {(![asyncStates.success, asyncStates.error].includes(workflows.loading)) && (
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
  workflows: shape({
    data: arrayOf(shape({
      id: string.isRequired
    }).isRequired).isRequired
  }).isRequired
}

export default withTheme(WorkflowSelector)
