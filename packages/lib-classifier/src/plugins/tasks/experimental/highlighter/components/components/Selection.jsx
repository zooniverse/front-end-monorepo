import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useTranslation } from '@translations/i18n'

const StyledMark = styled.mark`
  background-color: ${props => props.color};
  border-radius: 8px;
  color: black;
  margin-right: .2em;
  padding: .1em .3em;
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
  label,
  text
}) {
  const { t } = useTranslation('plugins')

  function onKeyDown (event) {
    if (event.key === 'Delete'
      || event.key === 'Backspace') {
        handleDelete()
    }
  }

  return (
    <StyledMark
      aria-label={`${label}: ${text}`}
      data-selection={text}
      color={color}
      onKeyDown={onKeyDown}
      tabIndex='0'
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
    </StyledMark>
  )
}

Selection.propTypes = {
  color: PropTypes.string.isRequired,
  handleDelete: PropTypes.func,
  label: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default Selection
