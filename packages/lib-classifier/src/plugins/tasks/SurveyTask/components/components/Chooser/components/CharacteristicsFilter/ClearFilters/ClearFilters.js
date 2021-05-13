import { Box, Button } from 'grommet'
import { Clear } from 'grommet-icons'
import PropTypes from 'prop-types'
import React from 'react'
import { SpacedText } from '@zooniverse/react-components'

import counterpart from 'counterpart'
import en from '../locales/en'

counterpart.registerTranslations('en', en)

function Label () {
  return (
    <Box
      align='center'
      direction='row'
      gap='xxsmall'
    >
      <Clear
        size='small'
      />
      <SpacedText>
        {counterpart('CharacteristicsFilter.clearFilters')}
      </SpacedText>
    </Box>
  )
}

export default function ClearFilters (props) {
  const {
    handleFilter,
    showingChoices,
    totalChoices
  } = props

  return (
    <Box
      align='center'
      direction='row'
      fill='horizontal'
      gap='xxsmall'
      justify='center'
      pad={{ top: 'xsmall' }}
    >
      <SpacedText>
        {counterpart('CharacteristicsFilter.showing', { showing: showingChoices, total: totalChoices })}
      </SpacedText>
      <Button
        disabled={showingChoices === totalChoices}
        label={<Label />}
        onClick={() => handleFilter()}
        plain
      />
    </Box>
  )
}

ClearFilters.defaultProps = {
  handleFilter: () => {},
  showingChoices: 0,
  totalChoices: 0
}

ClearFilters.propTypes = {
  handleFilter: PropTypes.func,
  showingChoices: PropTypes.number,
  totalChoices: PropTypes.number
}
