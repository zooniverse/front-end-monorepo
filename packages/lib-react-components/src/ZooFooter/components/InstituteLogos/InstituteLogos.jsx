import { Box } from 'grommet'
import { string } from 'prop-types'

function InstituteLogos({ size }) {
  return (
    <Box
      direction='row'
      height={size === 'large' ? '50px' : size === 'medium'  ? '50px' : '35px'}
      gap={size === 'large' ? 'medium' : size === 'medium' ? 'small' : '10px'}
    >
      <img
        alt='The Adler Planetarium'
        src='https://static.zooniverse.org/fem-assets/adler.png'
      />
      <img
        alt='University of Minnesota'
        src='https://static.zooniverse.org/fem-assets/minnesota.png'
      />
      <img
        alt='University of Oxford'
        src='https://static.zooniverse.org/fem-assets/oxford.jpg'
      />
    </Box>
  )
}

InstituteLogos.propTypes = {
  size: string
}

export default InstituteLogos
