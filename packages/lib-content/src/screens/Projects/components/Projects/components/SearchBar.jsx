import { Search } from 'grommet-icons'
import { Box, Text, TextInput } from 'grommet'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import useDebounce from '../hooks/useDebounce'

import { useTranslation } from '@translations/i18n'

const StyledBox = styled(Box)`
  position: relative;
  box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.25) inset;
`

const StyledTextInput = styled(TextInput)`
  border: none;
  font-size: 1rem;
`

const StyledWarning = styled(Text)`
  position: absolute;
  bottom: 100%;
  left: 10px;
  font-size: 0.875rem;
`

function SearchBar({ setSearch, value = '' }) {
  const { t } = useTranslation()

  const [showWarning, setShowWarning] = useState(true)
  const debouncedWarning = useDebounce(showWarning, 800)

  useEffect(() => {
    if (value.length > 0 && value.length < 4) {
      setShowWarning(true)
    } else {
      setShowWarning(false)
    }
  }, [value])

  return (
    <StyledBox
      align='center'
      border={{ color: 'light-5', side: 'all', size: '0.5px' }}
      direction='row'
      height={{ min: '40px' }}
      round='32px'
      width='100%'
      pad={{ left: '10px' }}
    >
      <Search size='1rem' color={{ light: 'black', dark: 'light-1' }} />
      <StyledTextInput
        placeholder={
          <Text color='light-5'>{t('Projects.search.placeholder')}</Text>
        }
        onChange={e => setSearch(e.target.value)}
        value={value}
      />
      {debouncedWarning ? (
        <StyledWarning
          color={{ light: 'neutral-1', dark: 'light-1' }}
          role='status'
        >
          {t('Projects.search.warning')}
        </StyledWarning>
      ) : null}
    </StyledBox>
  )
}

export default SearchBar
