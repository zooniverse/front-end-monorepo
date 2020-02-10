import { SpacedText } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Button, Box } from 'grommet'
import React from 'react'
import PropTypes from 'prop-types'
import styled, { css, withTheme } from 'styled-components'
import { tint } from 'polished'
import { inject, observer } from 'mobx-react'

import en from './locales/en'
import HelpIcon from './HelpIcon'

counterpart.registerTranslations('en', en)

const StyledButton = styled(Button)`
  ${props => props.theme && css`
    background: ${props.theme.global.colors.brand};
    padding: 15px 10px;

    &:hover, &:focus {
      background: ${tint(0.5, props.theme.global.colors.brand)};
    }

    &:disabled {
      &:hover, &:focus {
        background: ${props.theme.global.colors.brand};
      }
    }
  `}
`

const StyledSpacedText = styled(SpacedText)`
  line-height: 1.2;
`

const StyledHelpIcon = styled(HelpIcon)`
  margin-top: 8px;
  display: block;
  fill: white;
  width: 25px;
`

export function ButtonLabel () {
  return (
    <Box as='span' align='center' direction='column'>
      <StyledSpacedText size='xsmall' color='white'>
        {counterpart('FieldGuideButton.buttonLabel.field')}
      </StyledSpacedText>
      <StyledSpacedText size='xsmall' color='white'>
        {counterpart('FieldGuideButton.buttonLabel.guide')}
      </StyledSpacedText>
      <StyledHelpIcon />
    </Box>
  )
}

function storeMapper (stores) {
  const { active: fieldGuide, setModalVisibility } = stores.classifierStore.fieldGuide
  return {
    fieldGuide,
    setModalVisibility
  }
}

@inject(storeMapper)
@observer
class FieldGuideButton extends React.Component {
  onClick () {
    const { setModalVisibility } = this.props
    setModalVisibility(true)
  }

  render () {
    const {
      fieldGuide,
      theme
    } = this.props
    const disabled = !fieldGuide || fieldGuide.items.length === 0

    return (
      <StyledButton
        label={<ButtonLabel />}
        disabled={disabled}
        onClick={this.onClick.bind(this)}
        plain
        theme={theme}
      />
    )
  }
}

FieldGuideButton.defaultProps = {
  fieldGuide: null,
  theme: {
    global: {
      colors: {}
    }
  }
}

FieldGuideButton.wrappedComponent.propTypes = {
  fieldGuide: PropTypes.object,
  theme: PropTypes.object,
  setModalVisibility: PropTypes.func.isRequired
}

export default withTheme(FieldGuideButton)
