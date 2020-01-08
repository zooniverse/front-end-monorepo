import { SpacedText } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Box, Button, Drop } from 'grommet'
import { array, bool, oneOf, oneOfType, shape, string } from 'prop-types'
import React, { Component, createRef } from 'react'
import styled, { withTheme } from 'styled-components'

import en from './locales/en'
import TooltipText from './components/TooltipText'
import Triangle from './components/Triangle'

counterpart.registerTranslations('en', en)

const StyledSpacedText = styled(SpacedText)`
  text-shadow: 0 2px 2px rgba(0,0,0,0.22);
`

function Label () {
  return (
    <SpacedText color='white'>
      {counterpart('Banner.whyAmISeeingThis')}
    </SpacedText>
  )
}

class Banner extends Component {
  state = {
    tooltipOpen: false
  }

  ref = createRef()

  close = () => this.setState({ tooltipOpen: false })

  open = () => this.setState({ tooltipOpen: true })

  toggle = () => this.setState(state => ({ tooltipOpen: !state.tooltipOpen }))

  componentDidUpdate () {
    if (!this.props.show && this.state.tooltipOpen) {
      this.close()
    }
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

    return show && (
      <Box
        align='center'
        animation='fadeIn'
        background={{ color: background }}
        className={className}
        direction='row'
        key={bannerText}
        justify='between'
        pad={{ vertical: 'xsmall', horizontal: 'small' }}
        show={show}
      >

        <StyledSpacedText color='white' weight='bold'>
          {bannerText}
        </StyledSpacedText>

        <Button
          aria-label={counterpart('Banner.whyAmISeeingThis')}
          disabled={!show}
          label={<Label />}
          onClick={this.toggle}
          plain
          ref={this.ref}
        />

        {this.ref.current && this.state.tooltipOpen && (
          <Drop
            align={{ right: 'right', top: 'bottom' }}
            onEsc={this.close}
            plain
            target={this.ref.current}
          >
            <Box direction='column' margin='xsmall'>
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
      </Box>
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
