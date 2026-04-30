import { Box } from 'grommet'
import { useTheme } from 'styled-components'

function InstituteLogos() {
  const theme = useTheme()

  const adlerSrc = theme.dark ? 'https://static.zooniverse.org/fem-assets/adler-dark.png': 'https://static.zooniverse.org/fem-assets/adler.png'
  const minnSrc = theme.dark ? 'https://static.zooniverse.org/fem-assets/minnesota-dark.png' : 'https://static.zooniverse.org/fem-assets/minnesota.png'

  return (
    <Box
      direction='row'
      height='45px'
      gap='20px'
      margin={{ horizontal: '20px' }}
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

export default InstituteLogos
