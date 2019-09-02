import { Box, Text } from 'grommet'
import { node, string } from 'prop-types'
import React from 'react'

function Stat (props) {
  const { label, value, ...rest } = props
  return (
    <Box {...rest}>
      <Text
        children={value}
        color={{ light: 'dark-5', dark: 'light-1' }}
        tag='div'
        size='xxlarge'
      />
      <Text
        children={label}
        color={{ light: 'dark-5', dark: 'light-1' }}
        size='medium'
        tag='div'
        weight='bold'
      />
    </Box>
  )
}

Stat.propTypes = {
  label: string.isRequired,
  value: node.isRequired
}

export default Stat
