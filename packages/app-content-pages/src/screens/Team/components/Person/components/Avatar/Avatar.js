import { ZooniverseLogo } from '@zooniverse/react-components'
import { Box, Image } from 'grommet'
import { string } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const StyledImage = styled(Image)`
  filter: grayscale(100%);
`

const Placeholder = (
  <Box
    align='center'
    justify='center'
    background='brand'
    height='100%'
    width='100%'
  >
    <ZooniverseLogo size='50%' />
  </Box>
)

function Avatar (props) {
  const { avatarSrc, className, name } = props

  return (
    <Box
      flex={false}
      height='80px'
      overflow='hidden'
      round='xxsmall'
      width='80px'
    >
      {!avatarSrc ? Placeholder : (
        <StyledImage
          alt={name}
          className={className}
          fit='cover'
          src={avatarSrc}
        />
      )}
    </Box>
  )
}

Avatar.propTypes = {
  avatarSrc: string,
  className: string,
  name: string
}

export default Avatar
