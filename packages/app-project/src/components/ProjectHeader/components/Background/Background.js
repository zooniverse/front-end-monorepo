import PropTypes from 'prop-types'
import { string } from 'react'
import { Box } from 'grommet'
import styled from 'styled-components'

const StyledBox = styled(Box)`
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: -1;
`

const StyledImg = styled.img`
  filter: blur(4px);
  object-fit: cover;
  opacity: 0.5;
`

function Background ({ backgroundSrc }) {
  return (
    <StyledBox
      align='center'
      background={backgroundSrc ? 'black' : 'brand'}
      height='100%'
      justify='center'
    >
      {backgroundSrc && (
        <StyledImg aria-hidden='true' src={backgroundSrc} />
      )}
    </StyledBox>
  )
}

Background.propTypes = {
  backgroundSrc: string
}

export default Background
