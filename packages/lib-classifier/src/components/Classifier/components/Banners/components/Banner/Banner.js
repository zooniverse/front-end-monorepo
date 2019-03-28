import { SpacedText } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Box, Button, Drop } from 'grommet'
import { transparentize } from 'polished'
import { array, bool, oneOf, oneOfType, shape, string } from 'prop-types'
import React, { Component, createRef } from 'react'
import posed from 'react-pose'
import styled, { withTheme } from 'styled-components'

import en from './locales/en'
import TooltipText from './components/TooltipText'
import Triangle from './components/Triangle'

counterpart.registerTranslations('en', en)

const StyledButton = styled(Button)`
  cursor: help;
`

const StyledSpacedText = styled(SpacedText)`
  text-shadow: 0 2px 2px rgba(0,0,0,0.22);
`

const PosedBox = posed(Box)({
  show: {
    y: '0%'
  },
  hide: {
    transition: 'tween',
    y: '-100%'
  }
})

function Label () {
  return (
    <SpacedText color='accent-2'>
      {counterpart('Banner.whyAmISeeingThis')}
    </SpacedText>
  )
}

class Banner extends Component {
  state = {
    tooltipOpen: false,
    userCanHover: false
  }

  ref = createRef()

  close = () => this.setState({ tooltipOpen: false })

  open = () => this.setState({ tooltipOpen: true })

  tapClose = () => {
    if (!this.state.userCanHover) {
      this.close()
    }
  }

  toggle = () => {
    if (!this.state.userCanHover) {
      this.setState(state => ({ tooltipOpen: !state.tooltipOpen }))
    }
  }

  componentDidMount () {
    function onFirstHover () {
      this.setState({ userCanHover: true })
    }
    window.addEventListener('mouseover', onFirstHover.bind(this), {
      once: true
    })
  }

  render () {
    const {
      background,
      bannerText,
      className,
      theme: { mode },
      show,
      tooltipText
    } = this.props

    return (
      <PosedBox
        align='center'
        background={transparentize(0.5, background)}
        className={className}
        direction='row'
        justify='between'
        pad='small'
        pose={show ? 'show' : 'hide'}
      >

        <StyledSpacedText color='white' weight='bold'>
          {bannerText}
        </StyledSpacedText>

        <StyledButton
          label={<Label />}
          onBlur={this.close}
          onClick={this.toggle}
          onFocus={this.open}
          onMouseOut={this.close}
          onMouseOver={this.open}
          plain
          ref={this.ref}
        />

        {this.ref.current && this.state.tooltipOpen && (
          <Drop
            align={{ right: 'right', top: 'bottom' }}
            plain
            target={this.ref.current}
          >
            <Box direction='column' margin='xsmall' onClick={this.tapClose}>
              <Triangle />
              <Box
                background={mode === 'light' ? 'white' : 'dark-2'}
                pad='small'
              >
                <TooltipText text={tooltipText} />
              </Box>
            </Box>
          </Drop>
        )}
      </PosedBox>
    )
  }
}

Banner.propTypes = {
  background: string.isRequired,
  bannerText: string.isRequired,
  show: bool,
  theme: shape({
    mode: oneOf(['dark', 'light'])
  }),
  tooltipText: oneOfType([
    array,
    string
  ]).isRequired
}

Banner.defaultProps = {
  show: false
}

export default withTheme(Banner)
export {
  Banner
}
