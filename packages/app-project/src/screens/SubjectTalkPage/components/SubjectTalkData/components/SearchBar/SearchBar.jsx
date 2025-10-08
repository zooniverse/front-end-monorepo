import { Box, Button, Text, TextInput } from 'grommet'
import { FormSearch } from 'grommet-icons'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import styled from 'styled-components'

const StyledTextInput = styled(TextInput)`
  border: none;
  font-size: 1rem;
`

const StyledPlaceholderText = styled(Text)`
  color: ${props => props.theme.global.colors['light-5']};
`

const StyledButton = styled(Button)`
  align-content: center;
  height: 100%;
  padding: 0 12px;
`

function SearchBar({ projectSlug }) {
  const [searchTerm, setSearchTerm] = useState('')

  const { t } = useTranslation('screens')
  
  function handleInputChange(event) {
    setSearchTerm(event.target.value)
  }

  const disabled = searchTerm.length === 0

  return (
    <Box
      align='center'
      background={{
        dark: 'dark-3',
        light: 'neutral-6'
      }}
      border={{ color: 'light-5', side: 'all', size: '0.5px' }}
      direction='row'
      height={{ min: '40px' }}
      round='8px'
      width='600px'
    >
      <StyledTextInput
        onChange={handleInputChange}
        placeholder={<StyledPlaceholderText>{t('Talk.searchPlaceholder')}</StyledPlaceholderText>}
        value={searchTerm}
      />
      <StyledButton
        a11yTitle={t('Talk.searchPlaceholder')}
        disabled={disabled}
        href={disabled ? undefined : `https://www.zooniverse.org/projects/${projectSlug}/talk/search?query=${encodeURIComponent(searchTerm)}`}
        icon={<FormSearch color={{ dark: 'neutral-6', light: 'dark-3' }} />}
        plain
        target={disabled ? undefined : '_blank'}
      />
    </Box>
  )
}

export default SearchBar
