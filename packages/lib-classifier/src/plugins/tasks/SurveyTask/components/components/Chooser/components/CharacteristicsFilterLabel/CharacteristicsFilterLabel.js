import { Box, Text } from 'grommet'
import { Filter } from 'grommet-icons'
import React from 'react'
import counterpart from 'counterpart'
import styled from 'styled-components'
import en from './locales/en'

counterpart.registerTranslations('en', en)

const StyledText = styled(Text)`
  text-transform: capitalize;
`

export default function CharacteristicsFilterLabel () {
  return (
    <Box
      align='center'
      direction='row'
    >
      <Filter />
      <StyledText>{counterpart('CharacteristicsFilterLabel.filter')}</StyledText>
    </Box>
  )
}
