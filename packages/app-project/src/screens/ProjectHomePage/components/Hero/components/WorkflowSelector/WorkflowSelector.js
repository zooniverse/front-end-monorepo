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
          There was an error fetching the workflows :(
        </Box>
      )}

      {(workflows.loading === asyncStates.success) && (
        <Box margin={{ top: 'small' }}>
          {workflows.data.map(workflow =>
            <WorkflowSelectButton key={workflow.id} workflow={workflow} />
          )}
        </Box>
      )}

      {(!asyncStates.values.includes(workflows.loading)) && (
        <Box align='center' justify='center' margin={{ top: 'small' }}>
          <Box height='xxsmall' width='xxsmall'>
            <Bars
              fill={loaderColor}
              height='100%'
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
      id: string
    }))
  })
}

export default withTheme(WorkflowSelector)
