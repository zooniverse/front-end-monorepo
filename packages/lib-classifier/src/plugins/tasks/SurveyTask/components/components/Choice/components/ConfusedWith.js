import { Box } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import { SpacedHeading } from '@zooniverse/react-components'

import counterpart from 'counterpart'
import en from '../locales/en'

counterpart.registerTranslations('en', en)

export default function ConfusedWith (props) {
  return (
    <Box>
      <SpacedHeading>{counterpart('Choice.confused')}</SpacedHeading>
    </Box>
  )
}

ConfusedWith.defaultProps = {}

ConfusedWith.propTypes = {}
