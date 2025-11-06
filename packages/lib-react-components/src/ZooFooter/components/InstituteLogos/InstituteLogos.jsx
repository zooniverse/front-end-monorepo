import { Box } from 'grommet'
import { string } from 'prop-types'
import { useTheme } from 'styled-components'

function InstituteLogos({ size }) {
  const theme = useTheme()

  const adlerSrc = theme.dark ? 'https://static.zooniverse.org/fem-assets/adler-dark.png': 'https://static.zooniverse.org/fem-assets/adler.png'
  const minnSrc = theme.dark ? 'https://static.zooniverse.org/fem-assets/minnesota-dark.png' : 'https://static.zooniverse.org/fem-assets/minnesota.png'

  return (
    <Box
      direction='row'
      height={size === 'large' ? '50px' : size === 'medium'  ? '50px' : '35px'}
      gap={size === 'large' ? 'medium' : size === 'medium' ? 'small' : '10px'}
    >
      <img
        alt='The Adler Planetarium'
        src={adlerSrc}
      />
      <img
        alt='University of Minnesota'
        src={minnSrc}
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
