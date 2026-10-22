import { Image } from 'grommet'
import { string } from 'prop-types'
import styled from 'styled-components'

const StyledAvatar = styled(Image)`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
`

function Avatar({
  src,
  alt
}) {
  return (
    <StyledAvatar
      src={src}
      alt={alt}
    />
  )
}

Avatar.propTypes = {
  src: string,
  alt: string
}

export default Avatar
