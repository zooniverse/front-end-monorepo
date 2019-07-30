import counterpart from 'counterpart'
import { Button } from 'grommet'
import { string } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const StyledButton = styled(Button)`
  text-align: center;
`

function JoinInButton (props) {
  const { href } = props
  const label = counterpart('ZooniverseTalk.button')
  return (
    <StyledButton href={href} label={label} />
  )
}

JoinInButton.propTypes = {
  href: string.isRequired
}

export default JoinInButton
