import { SpacedText } from '@zooniverse/react-components'
import { Button, Box } from 'grommet'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { tint } from 'polished'
import { useTranslation } from '@translations/i18n'

import HelpIcon from './HelpIcon'

/* When the button is in the image toolbar, style the labels in a column
   When the button is placed below the task area, style the labels in a row
*/
const LabelBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  @container (min-width: 4.5rem) {
    flex-direction: row-reverse;
    justify-content: center;
  }
`

const StyledHelpIcon = styled(HelpIcon)`
  width: min(50%, 1.2rem);

  @container (min-width: 4.5rem) {
    width: 1.2rem;
  }
`

const StyledButton = styled(Button)`
  container-type: inline-size;
  width: 100%;

  ${props =>
    props.theme &&
    css`
      background: ${props.theme.global.colors.brand};
      padding: clamp(8px, 15%, 10px);

      &:hover,
      &:focus {
        background: ${tint(0.5, props.theme.global.colors.brand)};
      }

      &:disabled {
        &:hover,
        &:focus {
          background: ${props.theme.global.colors.brand};
        }
      }
    `}
`

const StyledSpacedText = styled(SpacedText)`
  line-height: 1.2;
  font-size: 0.75rem;

  @container (min-width: 4.5rem) {
    font-size: 0.875rem;
  }
`

export function ButtonLabel() {
  const { t } = useTranslation('components')

  return (
    <LabelBox as='span'>
      <StyledSpacedText color='white' textAlign='center'>
        {t('FieldGuide.FieldGuideButton.buttonLabel')}
      </StyledSpacedText>
      <StyledHelpIcon fill='white' />
    </LabelBox>
  )
}

const DEFAULT_HANDLER = () => {}

function FieldGuideButton({
  fieldGuide = null,
  onClick = DEFAULT_HANDLER
}) {
  const disabled = !fieldGuide || fieldGuide.items.length === 0

  return (
    <StyledButton
      label={<ButtonLabel />}
      disabled={disabled}
      onClick={onClick}
      plain
    />
  )
}

FieldGuideButton.propTypes = {
  fieldGuide: PropTypes.object,
  onClick: PropTypes.func.isRequired
}

export default FieldGuideButton
