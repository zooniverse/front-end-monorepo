import { Box } from 'grommet'
import React from 'react'
import styled from 'styled-components'

import NavLink from './components/NavLink'

const HeadingBox = styled(Box)`
  color: white;
  font-size: 32px;
`

function AboutHeader (props) {
  const { className } = props
  return (
    <Box align='center' as='header' background='brand' className={className}>
      <HeadingBox margin={{ bottom: 'large', top: 'xlarge' }} width='xlarge'>
        About
      </HeadingBox>
      <Box
        as='nav'
        direction='row'
        gap='small'
        margin={{ bottom: 'xsmall' }}
        width='xlarge'
      >
        <NavLink label='About' href='/about' />
        <NavLink label='Publications' href='/about/publications' />
        <NavLink label='Our Team' href='/about/team' />
        <NavLink label='Acknowledgements' href='/about/acknowledgements' />
        <NavLink label='Resources' href='/about/resources' />
        <NavLink label='Contact Us' href='/about/contact' />
        <NavLink label='FAQ' href='/about/faq' />
      </Box>
    </Box>
  )
}

export default AboutHeader
