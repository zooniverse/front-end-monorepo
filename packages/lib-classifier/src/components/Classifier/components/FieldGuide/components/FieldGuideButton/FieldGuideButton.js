import { SpacedText } from '@zooniverse/react-components'
import { Button, Box } from 'grommet'
import PropTypes from 'prop-types'
import styled, { css, withTheme } from 'styled-components'
import { tint } from 'polished'
import { useTranslation } from '@translations/i18n'

import HelpIcon from './HelpIcon'

export const StyledButton = styled(Button)`
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
`

export function ButtonLabel() {
  const { t } = useTranslation('components')

  return (
    <Box as='span' align='center' direction='column' gap='8px'>
      <StyledSpacedText size='xsmall' color='white' textAlign='center'>
        {t('FieldGuide.FieldGuideButton.buttonLabel')}
      </StyledSpacedText>
      {/** Same styling as ImageToolbar > Button */}
      <HelpIcon
        fill='white'
        width='min(50%, 1.2rem)'
      />
    </Box>
  )
}

function FieldGuideButton({ fieldGuide = null, onClick = () => true, theme }) {
  const disabled = !fieldGuide || fieldGuide.items.length === 0

  return (
    <StyledButton
      label={<ButtonLabel />}
      disabled={disabled}
      onClick={onClick}
      plain
      theme={theme}
    />
  )
}

FieldGuideButton.propTypes = {
  fieldGuide: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  theme: PropTypes.object
}

export default withTheme(FieldGuideButton)
export { FieldGuideButton }
