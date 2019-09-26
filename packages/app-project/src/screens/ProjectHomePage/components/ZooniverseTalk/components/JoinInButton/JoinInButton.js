import counterpart from 'counterpart'
import { Button } from 'grommet'
import Link from 'next/link'
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
    <Link {...linkProps} passHref>
      <StyledButton label={label} />
    </Link>
  )
}

JoinInButton.propTypes = {
  linkProps: object
}

export default JoinInButton
