import React from 'react'
import PropTypes from 'prop-types'
import { Box, Image } from 'grommet'
import styled, { css } from 'styled-components'

const AvatarImage = styled(Image)`
  ${props => css`
    width: ${props.size};
    height: ${props.size};
  `}
`

// TEMPORARY
// TODO: find a permanent home for this PNG
const DEFAULT_AVATAR = 'https://static.zooniverse.org/www.zooniverse.org/assets/simple-avatar.png'

function UserAvatar ({
  src,
  displayName = '',
  size = '3em',
}) {
  const imgSrc = (src && src.length > 0) ? src : DEFAULT_AVATAR
  
  // Note: state isn't working as expected, maybe need to setSrc() as soon as it detects src !== previousSrc ??
  // const [_src, setSrc] = React.useState(newSrc)
  
  function onError () {
    // setSrc(DEFAULT_AVATAR)
  }
  
  return (
    /*<AvatarImage
      alignSelf='center'
      src={imgSrc}
      
      size={size}
      onError={onError}
    />*/
    <Box
      alignSelf='center'
      width={size}
      height={size}
    >
      <Image
        alt={`Avatar for ${displayName}`}
        src={imgSrc}
        fallback={DEFAULT_AVATAR}
      />
    </Box>
  )
}

UserAvatar.propTypes = {
  src: PropTypes.string,
  displayName: PropTypes.string,
  size: PropTypes.string,  // Any CSS string
}

export default UserAvatar
