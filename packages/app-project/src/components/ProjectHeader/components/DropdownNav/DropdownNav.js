import { SpacedText } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Anchor, Box, DropButton } from 'grommet'
import { FormDown } from 'grommet-icons'
import Link from 'next/link'
import { withRouter } from 'next/router'
import { arrayOf, shape, string } from 'prop-types'
import React from 'react'
import styled, { withTheme } from 'styled-components'

import addQueryParams from '../../../../helpers/addQueryParams'

const StyledAnchor = styled(Anchor)`
  padding: 10px 20px;
  text-shadow: 0 2px 2px rgba(0, 0, 0, 0.22);
  &:focus,
  &:hover {
    background: ${props => props.theme.global.colors['neutral-2']};
    text-decoration: none;
  }
`

// `tabindex="-1"` is for the button's open state.
const StyledDropButton = styled(DropButton)`
  padding: 10px 10px 10px 15px;
  border-radius: 2em;
  color: white;

  ${props => props.isOpen && `
    background: ${props.theme.global.colors['accent-2']};
  `}

  &:focus,
  &:hover {
    background: ${props => props.theme.global.colors['accent-2']};
    color: ${props => props.theme.global.colors['brand']};
  }
`

class DropdownNav extends React.Component {
  state = {
    isOpen: false
  }

  onClose = () => this.setState({ isOpen: false })

  onOpen = () => this.setState({ isOpen: true })

  renderItems () {
    const { router } = this.props
    return (
      <Box
        as='nav'
        background='brand'
        elevation='medium'
        margin={{ top: 'medium ' }}
      >
        <Box as='ul'>
          {this.props.navLinks.map(navLink => (
            <Box as='li' key={navLink.href}>
              <Link
                as={addQueryParams(navLink.as, router)}
                href={navLink.href}
                passHref
              >
                <StyledAnchor
                  label={
                    <SpacedText color='white' weight='bold'>
                      {navLink.text}
                    </SpacedText>
                  }
                  theme={this.props.theme}
                />
              </Link>
            </Box>
          ))}
        </Box>
      </Box>
    )
  }

  render () {
    return (
      <StyledDropButton
        alignSelf='center'
        className={this.props.className}
        dropContent={this.renderItems()}
        dropAlign={{ top: 'bottom' }}
        isOpen={this.state.isOpen}
        margin={{ top: 'xsmall' }}
        onClose={this.onClose}
        onOpen={this.onOpen}
      >
        <Box align='center' direction='row' gap='xsmall' justify='center'>
          <SpacedText weight='bold'>
            {counterpart('ProjectHeader.nav.exploreProject')}
          </SpacedText>
          <FormDown />
        </Box>
      </StyledDropButton>
    )
  }
}

DropdownNav.propTypes = {
  navLinks: arrayOf(
    shape({
      as: string,
      href: string,
      text: string
    })
  ),
  theme: shape({
    global: shape({
      colors: shape({
        'accent-2': string,
        brand: string
      })
    })
  })
}

@withTheme
@withRouter
class DecoratedDropdownNav extends DropdownNav { }

export {
  DecoratedDropdownNav as default,
  DropdownNav
}
