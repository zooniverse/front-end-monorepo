import PropTypes from 'prop-types'
import styled, { withTheme } from 'styled-components'
import { useTranslation } from '@translations/i18n'

const defaultTheme = {
  dark: false,
  global: {
    colors: {
      text: {}
    }
  }
}

const StyledSpan = styled.span`
  background-color: ${props => props.color};
  border-radius: 8px;
  color: ${props => props.theme.global.colors.text.light};
  padding: .1em .4em .2em;
`

const StyledDeleteButton = styled.button`
  border: none;
  background: transparent;
  font-size: 1.2em;
  padding: 0;

  &:hover {
    cursor: pointer;
  }
`

function DEFAULT_HANDLER() {
  return true
}

function Selection ({
  color,
  handleDelete = DEFAULT_HANDLER,
  text,
  theme = defaultTheme
}) {
  const { t } = useTranslation('plugins')

  function onKeyDown (event) {
    if (event.key === 'Delete'
      || event.key === 'Backspace') {
        handleDelete()
    }
  }

  return (
    <StyledSpan
      data-selection={text}
      color={color}
      onKeyDown={onKeyDown}
      tabIndex='0'
      theme={theme}
    >
      {text}
      {' '}
      <StyledDeleteButton
        aria-label={t('HighlighterTask.delete')}
        onClick={handleDelete}
        title={t('HighlighterTask.delete')}
      >
        &times;
      </StyledDeleteButton>
    </StyledSpan>
  )
}

Selection.propTypes = {
  color: PropTypes.string.isRequired,
  handleDelete: PropTypes.func,
  text: PropTypes.string.isRequired
}

export default withTheme(Selection)
