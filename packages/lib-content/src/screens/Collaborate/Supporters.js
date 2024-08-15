import { Box, Grid, Image } from 'grommet'

function Supporters() {
  return (
    <Grid columns={['1fr 1fr 1fr']} rows='auto' gap='20px'>
      <Box
        height='100px'
        align='center'
        justify='center'
      >
        <Image
          src='/assets/collaborate/sloan-foundation.jpg'
          alt='Alfred P. Sloan Foundation'
          fit='contain'
          height='100%'
          width='100%'
        />
      </Box>
      <Box
        height='100px'
        align='center'
        justify='center'
      >
        <Image
          src='/assets/collaborate/ukri.jpg'
          alt='Arts and Humanities Research Council'
          fit='contain'
          height='100%'
          width='100%'
        />
      </Box>
      <Box
        height='100px'
        align='center'
        justify='center'
      >
        <Image
          src='/assets/collaborate/nasa.png'
          alt='National Aeronautics and Space Administration (NASA)'
          fit='contain'
          height='100%'
          width='100%'
        />
      </Box>
      <Box
        height='100px'
        align='center'
        justify='center'
      >
        <Image
          src='/assets/collaborate/google.png'
          alt='Google'
          fit='contain'
          height='100%'
          width='100%'
        />
      </Box>
      <Box
        height='100px'
        align='center'
        justify='center'
      >
        <Image
          src='/assets/collaborate/imls.jpeg'
          alt='Institute of Museum and Library Services'
          fit='contain'
          height='100%'
          width='100%'
        />
      </Box>
      <Box
        height='100px'
        align='center'
        justify='center'
      >
        <Image
          src='/assets/collaborate/acls.png'
          alt='American Council of Learned Societies'
          fit='contain'
          height='100%'
          width='100%'
        />
      </Box>
      <Box
        height='100px'
        align='center'
        justify='center'
      >
        <Image
          src='/assets/collaborate/nih.png'
          alt='National Institutes of Health'
          fit='contain'
          height='100%'
          width='100%'
        />
      </Box>
    </Grid>
  )
}

export default Supporters
