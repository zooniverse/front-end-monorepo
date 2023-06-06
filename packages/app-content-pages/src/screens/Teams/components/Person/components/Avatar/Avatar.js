import { ZooniverseLogo } from '@zooniverse/react-components'
import { Box, Image } from 'grommet'
import { string } from 'prop-types'
import styled from 'styled-components'

const StyledImage = styled(Image)`
  filter: grayscale(100%);
`

const Placeholder = ({ name }) => (
  <Box
    align='center'
    justify='center'
    background='brand'
    height='100%'
    width='100%'
  >
    <ZooniverseLogo size='50%' id={`Team Avatar - ${name}`} />
  </Box>
)

function Avatar ({ avatarSrc = '', className = '', name = '' }) {
  return (
    <Box
      flex={false}
      height='80px'
      overflow='hidden'
      round='xxsmall'
      width='80px'
    >
      {!avatarSrc ? <Placeholder name={name} /> : (
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
