import { string } from 'prop-types'
import styled from 'styled-components'

const Img = styled.img`
  height: 230px;
  min-height: inherit;
  object-fit: cover;
  width: 100%;

  // Grommet small breakpoint
  @media (width > 769px) {
    flex: 1 1 auto;
    object-position: 0 50%;
  }
`

function Background ({ backgroundSrc }) {
  return (
    <Img
      alt=''
      src={backgroundSrc}
    />
  )
}

Background.propTypes = {
  backgroundSrc: string.isRequired
}

export default Background
