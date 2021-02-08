import counterpart from 'counterpart'
import { Button } from 'grommet'
import { object } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const StyledButton = styled(Button)`
  text-align: center;
`

function JoinInButton (props) {
  const { linkProps } = props
  const label = counterpart('ZooniverseTalk.button')
  return (
    // if you pass href to Button, you get a link instead of a button.
    <StyledButton {...linkProps} label={label} />
  )
}

JoinInButton.propTypes = {
  linkProps: object
}

export default JoinInButton
