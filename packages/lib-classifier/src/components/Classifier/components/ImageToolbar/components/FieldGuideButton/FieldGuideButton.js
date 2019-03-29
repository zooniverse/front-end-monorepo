import { withFocusProps, withHoverProps } from '@klarna/higher-order-components'
import { SpacedText } from '@zooniverse/react-components'
import zooTheme from '@zooniverse/grommet-theme'
import counterpart from 'counterpart'
import { Button, Box } from 'grommet'
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'

import en from './locales/en'
import HelpIcon from './HelpIcon'

counterpart.registerTranslations('en', en)

const StyledButton = styled.button`
  height: auto;
  flex-direction: column;
  display: flex;
  align-items: center;
  padding: 10px;
  background: ${zooTheme.global.colors.brand}
  border: 0;
  padding: 15px 10px;
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

function storeMapper(stores) {
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
    console.info('Open field guide')
    setModalVisibility(true)
  }

  render () {
    const {
      fieldGuide,
    } = this.props
    const disabled = !fieldGuide || fieldGuide.items.length === 0

    console.log(disabled, fieldGuide)
    // const eventHandlers = {
    //   onBlur,
    //   onFocus,
    //   onMouseOver,
    //   onMouseOut
    // }

    // const hoveredOrFocused = hovered || focused

    return (
      <Button
        label={<ButtonLabel />}
        disabled={disabled}
        onClick={this.onClick.bind(this)}
        primary
      />
    )
  }
}

FieldGuideButton.propTypes = {
  eventHandlers: PropTypes.object,
  hoverOrFocus: PropTypes.bool
}

export default FieldGuideButton
