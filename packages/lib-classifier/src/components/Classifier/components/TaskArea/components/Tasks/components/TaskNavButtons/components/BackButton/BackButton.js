import { func, object } from 'prop-types'
import styled, { css } from 'styled-components'
import { useTranslation } from '@translations/i18n'
import PrimaryButton from '@zooniverse/react-components/PrimaryButton'

const StyledButton = styled(PrimaryButton)`
  margin-right: 1ch;
  width: fit-content;
  padding: 10px 20px;

  ${props =>
    props.theme.dark
      ? css`
          border: white 1px solid;
          font-color: white;
          background: ${props.theme.global.colors['dark-1']};
        `
      : css`
          border: none;
          font-color: black;
          background: ${props.theme.global.colors['light-1']};
        `}

  &:focus:not(:disabled),
  &:hover:not(:disabled) {
    background: linear-gradient(180deg, #c0e5e7, #84ccd1);
  }
`

const DEFAULT_HANDLER = () => {}

function BackButton({ onClick = DEFAULT_HANDLER }) {
  const { t } = useTranslation('components')

  return (
    <StyledButton
      label={t('TaskArea.Tasks.BackButton.back')}
      onClick={onClick}
    />
  )
}

BackButton.propTypes = {
  onClick: func,
  theme: object
}

export default BackButton
