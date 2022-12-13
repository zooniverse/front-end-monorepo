import { SpacedText } from '@zooniverse/react-components'
import { Button, Box } from 'grommet'
import PropTypes from 'prop-types'
import styled, { css, withTheme } from 'styled-components'
import { tint } from 'polished'
import { useTranslation } from '@translations/i18n'
import { observer } from 'mobx-react'
import { useStores } from '@hooks'

import HelpIcon from './HelpIcon'

function storeMapper(store) {
  const { viewerWidth } = store.subjectViewer

  return {
    viewerWidth
  }
}

export const StyledButton = styled(Button)`
  ${props =>
    props.theme &&
    css`
      background: ${props.theme.global.colors.brand};
      padding: ${props => (props.smallViewer ? '5px' : '10px')};

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

const StyledHelpIcon = styled(HelpIcon)`
  display: block;
  fill: white;
  // Same width etc as ImageToolbar > Button
  padding: ${props => (props.smallViewer ? '8px 0' : '8px 0 0 0')};
  width: ${props => (props.smallViewer ? '0.9rem' : '1.2rem')};
`

export function ButtonLabel({ smallViewer }) {
  const { t } = useTranslation('components')

  return (
    <Box as='span' align='center' direction='column'>
      {smallViewer ? null : (
        <StyledSpacedText size='xsmall' color='white' textAlign='center'>
          {t('FieldGuide.FieldGuideButton.buttonLabel')}
        </StyledSpacedText>
      )}
      <StyledHelpIcon smallViewer={smallViewer} />
    </Box>
  )
}

function FieldGuideButton({ 
  fieldGuide = null,
  onClick = () => true,
  theme
}) {
  const disabled = !fieldGuide || fieldGuide.items.length === 0
  const { t } = useTranslation('components')
  const { viewerWidth } = useStores(storeMapper)
  const smallViewer = viewerWidth === 'small'

  return (
    <StyledButton
      a11yTitle={
        smallViewer ? t('FieldGuide.FieldGuideButton.buttonLabel') : ''
      }
      label={<ButtonLabel smallViewer={smallViewer} />}
      disabled={disabled}
      onClick={onClick}
      plain
      smallViewer={smallViewer}
      theme={theme}
    />
  )
}

FieldGuideButton.propTypes = {
  fieldGuide: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  theme: PropTypes.object
}

export default withTheme(observer(FieldGuideButton))
export { FieldGuideButton }
