import React from 'react'
import { string } from 'prop-types'
import { Blank } from 'grommet-icons'
import { Box } from 'grommet'
import { SpacedText } from '@zooniverse/react-components'

export default function TooltipLabel (props) {
  const {
    fill = 'light-5',
    label
  } = props
  return (
    <Box align='center' direction='row' pad='none'>
      <Blank color={fill}>
        <circle cx='12' cy='12' r='6' />
      </Blank>
      <SpacedText weight='bold'>{label}</SpacedText>
    </Box>
  )
}

TooltipLabel.propTypes = {
  fill: string,
  label: string.isRequired
}