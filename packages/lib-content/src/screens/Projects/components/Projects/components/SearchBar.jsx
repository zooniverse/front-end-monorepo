import { Search } from 'grommet-icons'
import { Box, Text, TextInput } from 'grommet'
import styled from 'styled-components'

import { useTranslation } from '@translations/i18n'

const StyledBox = styled(Box)`
  box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.25) inset;
`

const StyledTextInput = styled(TextInput)`
  border: none;
  font-size: 1rem;
`

function SearchBar({ value = '' }) {
  const { t } = useTranslation()

  return (
    <StyledBox
      align='center'
      border={{ color: 'light-5', side: 'all', size: '0.5px' }}
      direction='row'
      height={{ min: '40px' }}
      round='32px'
      width='600px'
      pad={{ left: '10px' }}
    >
      <Search size='1rem' color='black' value={value} />
      <StyledTextInput
        placeholder={
          <Text color='light-5'>{t('Projects.search.placeholder')}</Text>
        }
      />
    </StyledBox>
  )
}

export default SearchBar
