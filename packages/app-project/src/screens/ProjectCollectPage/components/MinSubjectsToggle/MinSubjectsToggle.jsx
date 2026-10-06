import { CheckBox, Text, ThemeContext } from 'grommet'
import { bool, func } from 'prop-types'
import { useTranslation } from 'next-i18next/pages'
import styled from 'styled-components'

const StyledCheckBox = styled(CheckBox)`
  & + span {
    background-color: white;
    border-color: ${({ theme }) => theme.global.colors['dark-5']};
  }

  & + span > span {
    background-color: ${({ theme }) => theme.global.colors['dark-5']};
  }

  &:checked + span {
    background-color: ${({ theme }) => theme.global.colors['neutral-1']};
    border-color: ${({ theme }) => theme.global.colors['neutral-1']};
  }

  &:checked + span > span {
    background-color: white;
    border: 2px solid ${({ theme }) => theme.global.colors['neutral-1']};
  }
`

function MinSubjectsToggle({ checked = true, onChange }) {
  const { t } = useTranslation('screens')

  function handleChange(event) {
    onChange(event.target.checked)
  }

  return (
    <ThemeContext.Extend
      value={{
        checkBox: {
          color: 'white',
          gap: '10px',
          size: '16px',
          toggle: {
            color: 'white'
          }
        }
      }}
    >
      <StyledCheckBox
        checked={checked}
        label={
          <Text size='0.875rem'>
            {t('Collect.hideSingleSubject')}
          </Text>
        }
        onChange={handleChange}
        reverse
        toggle
      />
    </ThemeContext.Extend>
  )
}

MinSubjectsToggle.propTypes = {
  checked: bool,
  onChange: func.isRequired
}

export default MinSubjectsToggle