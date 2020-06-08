import React from 'react'
import { number, shape, string } from 'prop-types'
import { Blank } from 'grommet-icons'
import { Box } from 'grommet'
import { SpacedText } from '@zooniverse/react-components'

export default function Tooltip (props) {
  const {
    fill,
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

Tooltip.defaultProps = {

}

Tooltip.propTypes = {

}