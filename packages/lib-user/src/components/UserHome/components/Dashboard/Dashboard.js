import { Box, Image, ResponsiveContext } from 'grommet'
import styled from 'styled-components'
import { shape, string } from 'prop-types'
import { useContext } from 'react'

const Relative = styled(Box)`
  position: relative;
`

const StyledAvatar = styled(Image)`
  width: 128px;
  height: 128px;
  object-fit: cover;
  border-radius: 50%;
  border: solid white 6px;
  position: absolute;
  top: 203px;

  // For Grommet breakpoint small
  @media (width < 769px) {
    width: 80px;
    height: 80px;
    top: 137px;
  }
`

export default function Dashboard({ authUser, profileBannerSrc = '' }) {
  const size = useContext(ResponsiveContext)

  return (
    <Relative
      fill
      align='center'
      height={
        size !== 'small'
          ? { min: '270px', max: '270px' }
          : { min: '180px', max: '180px' }
      }
      background={{ image: `url(${profileBannerSrc})`, color: 'neutral-1' }}
      round={size !== 'small' ? { size: '16px', corner: 'top' } : false}
    >
      <StyledAvatar
        alt='User avatar'
        src={
          authUser.avatar_src
            ? authUser.avatar_src
            : 'https://www.zooniverse.org/assets/simple-avatar.png'
        }
      />
    </Relative>
  )
}

Dashboard.propTypes = {
  authUser: shape({
    id: string
  }),
  profileBannerSrc: string
}
