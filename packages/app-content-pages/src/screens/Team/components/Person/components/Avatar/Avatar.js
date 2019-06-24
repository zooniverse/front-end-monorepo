import { ZooniverseLogo } from '@zooniverse/react-components'
import { Box, Image } from 'grommet'
import { string } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const StyledBox = styled(Box)`
  border-radius: 5px;
  overflow: hidden;
`

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
    <StyledBox className={className} flex={false} height='80px' width='80px'>
      {!avatarSrc ? Placeholder : (
        <StyledImage
          alt={`${name} photo`}
          fit='cover'
          src={avatarSrc}
        />
      )}
    </StyledBox>
  )
}

Avatar.propTypes = {
  avatarSrc: string,
  className: string,
  name: string
}

export default Avatar
