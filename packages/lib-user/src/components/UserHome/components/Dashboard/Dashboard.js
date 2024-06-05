import { Box, Image } from 'grommet'
import styled from 'styled-components'
import { shape, string } from 'prop-types'

const Relative = styled(Box)`
  position: relative;
`

const StyledAvatar = styled(Image)`
  width: 128px;
  height: 128px;
  object-fit: cover;
  border-radius: 50%;
  border: solid white 5px;
  position: absolute;
  top: 206px;
`

export default function Dashboard({ authUser, profileBannerSrc = '' }) {
  return (
    <Relative
      fill
      align='center'
      height={{ min: '270px', max: '270px' }}
      background={{ image: `url(${profileBannerSrc})`, color: 'neutral-1' }}
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
