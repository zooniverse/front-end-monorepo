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
  const { href } = props
  const label = counterpart('ZooniverseTalk.button')
  return (
    <Link href={href} passHref>
      <StyledButton label={label} />
    </Link>
  )
}

JoinInButton.propTypes = {
  href: string.isRequired
}

export default JoinInButton
