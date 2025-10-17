import { IconActionButton } from '@zooniverse/react-components'
import { Box, Text, TextInput } from 'grommet'
import { Search } from 'grommet-icons'
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

function SearchBar({ projectSlug }) {
  const [searchTerm, setSearchTerm] = useState('')

  const { t } = useTranslation('screens')
  
  function handleInputChange(event) {
    setSearchTerm(event.target.value)
  }

  function handleKeyUp(event) {
    if (event.key === 'Enter' && searchTerm.length > 0) {
      const searchUrl = `/projects/${projectSlug}/talk/search?query=${encodeURIComponent(searchTerm)}`
      window.open(searchUrl, '_blank')
    }
  }

  const disabled = searchTerm.length === 0

  return (
    <Box
      align='center'
      alignSelf='end'
      background={{
        dark: 'dark-3',
        light: 'neutral-6'
      }}
      border={{ color: 'light-5', side: 'all', size: '0.5px' }}
      direction='row-reverse'
      height={{ min: '40px' }}
      round='32px'
      width='600px'
    >
      <StyledTextInput
        a11yTitle={t('Talk.searchPlaceholder')}
        onChange={handleInputChange}
        onKeyUp={handleKeyUp}
        placeholder={<StyledPlaceholderText>{t('Talk.searchPlaceholder')}</StyledPlaceholderText>}
        value={searchTerm}
      />
      <IconActionButton
        a11yTitle={t('Talk.searchPlaceholder')}
        disabled={disabled}
        href={disabled ? undefined : `/projects/${projectSlug}/talk/search?query=${encodeURIComponent(searchTerm)}`}
        height='38px'
        icon={<Search color={{ dark: 'neutral-6', light: 'dark-3' }} />}
        plain
        target={disabled ? undefined : '_blank'}
        width='38px'
      />
    </Box>
  )
}

export default SearchBar
