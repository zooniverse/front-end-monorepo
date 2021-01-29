import { Box, Text } from 'grommet'
import { Filter } from 'grommet-icons'
import PropTypes from 'prop-types'
import React from 'react'

export default function CharacteristicsFilter () {
  return (
    <Box
      align='center'
      direction='row'
    >
      <Filter />
      <Text>Filter</Text>
    </Box>
  )
}
