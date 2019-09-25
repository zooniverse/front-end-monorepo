import counterpart from 'counterpart'
import { Button } from 'grommet'
import Link from 'next/link'
import { string } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const StyledButton = styled(Button)`
  text-align: center;
`

function JoinInButton (props) {
  const { as, href } = props
  const label = counterpart('ZooniverseTalk.button')
  return (
    <Link as={as} href={href} passHref>
      <StyledButton label={label} />
    </Link>
  )
}

JoinInButton.propTypes = {
  as: string.isRequired,
  href: string.isRequired
}

export default JoinInButton
