import { Box, Grid, Image, ResponsiveContext } from 'grommet'
import { useContext } from 'react'

const LogoImage = ({ src = '', alt = '' }) => {
  const size = useContext(ResponsiveContext)
  const maxHeight = size === 'small' ? '50px' : '100px'

  return (
    <Box height={maxHeight} align='center' justify='center'>
      <Image fit='contain' height='100%' width='100%' src={src} alt={alt} />
    </Box>
  )
}

export function Supporters() {
  const size = useContext(ResponsiveContext)
  const gap = size !== 'small' ? { column: '40px', row: '30px' } : '15px'

  return (
    <Box
      gap={size !== 'small' ? '40px' : '15px'}
      margin={{ top: 'small', bottom: 'xlarge' }}
    >
      <Grid columns={['1fr 1fr 1fr']} rows='auto' gap={gap}>
        <LogoImage
          src='https://static.zooniverse.org/fem-assets/collaborate/sloan-foundation.jpg'
          alt='Alfred P. Sloan Foundation'
        />
        <LogoImage
          src='https://static.zooniverse.org/fem-assets/collaborate/ukri.jpg'
          alt='Arts and Humanities Research Council'
        />
        <LogoImage
          src='https://static.zooniverse.org/fem-assets/collaborate/nasa.png'
          alt='National Aeronautics and Space Administration (NASA)'
        />
        <LogoImage src='https://static.zooniverse.org/fem-assets/collaborate/google.png' alt='Google' />
        <LogoImage
          src='https://static.zooniverse.org/fem-assets/collaborate/imls.jpeg'
          alt='Institute of Museum and Library Services'
        />
        <LogoImage
          src='https://static.zooniverse.org/fem-assets/collaborate/acls.png'
          alt='American Council of Learned Societies'
        />
        <LogoImage
          src='https://static.zooniverse.org/fem-assets/collaborate/nih.png'
          alt='National Institutes of Health'
        />
        <LogoImage
          src='https://static.zooniverse.org/fem-assets/collaborate/nsf.jpg'
          alt='National Science Foundation'
        />
        <LogoImage
          src='https://static.zooniverse.org/fem-assets/collaborate/neh.jpeg'
          alt='National Endowment for the Humanities'
        />
      </Grid>
      <Box direction='row' justify='center' gap='40px'>
        <Box width='28%'>
          <LogoImage
            src='https://static.zooniverse.org/fem-assets/collaborate/noaa.png'
            alt='National Oceanic and Atmospheric Administration (NOAA)'
          />
        </Box>
        <Box width='28%'>
          <LogoImage
            src='https://static.zooniverse.org/fem-assets/collaborate/simons.jpg'
            alt='Simons Foundation'
          />
        </Box>
      </Box>
    </Box>
  )
}

export function SelectedCollaborators() {
  const size = useContext(ResponsiveContext)

  return (
    <Grid
      columns={['1fr 1fr 1fr']}
      rows='auto'
      gap={size !== 'small' ? { column: '40px', row: '30px' } : '15px'}
      margin={{ top: 'small', bottom: 'large' }}
    >
      <LogoImage src='https://static.zooniverse.org/fem-assets/collaborate/dupage.jpg' alt='College of Dupage' />
      <LogoImage
        src='https://static.zooniverse.org/fem-assets/collaborate/uts.jpg'
        alt='University of Technology Sydney'
      />
      <LogoImage
        src='https://static.zooniverse.org/fem-assets/collaborate/nwu.jpg'
        alt='Northwestern University'
      />
      <LogoImage
        src='https://static.zooniverse.org/fem-assets/collaborate/usfws.png'
        alt='United States Fish and Wildlife Service'
      />
      <LogoImage src='https://static.zooniverse.org/fem-assets/collaborate/brlib.png' alt='British Library' />
      <LogoImage
        src='https://static.zooniverse.org/fem-assets/collaborate/gorongosa.png'
        alt='Parque Nacional Da Gorongosa'
      />
      <LogoImage
        src='https://static.zooniverse.org/fem-assets/collaborate/saskatchawan.jpeg'
        alt='University of Saskatchawan'
      />
      <LogoImage
        src='https://static.zooniverse.org/fem-assets/collaborate/nmk.jpg'
        alt='National Museums of Kenya'
      />
      <LogoImage
        src='https://static.zooniverse.org/fem-assets/collaborate/lpo.jpg'
        alt='Agir pour la Biodiversité'
      />
      <LogoImage
        src='https://static.zooniverse.org/fem-assets/collaborate/upenn.jpg'
        alt='Penn Libraries University of Pennsylvania'
      />
      <LogoImage
        src='https://static.zooniverse.org/fem-assets/collaborate/tsinghua.jpg'
        alt='Tsinghua University'
      />
      <LogoImage
        src='https://static.zooniverse.org/fem-assets/collaborate/nhm.jpeg'
        alt='National History Museum'
      />
      <LogoImage src='https://static.zooniverse.org/fem-assets/collaborate/lpzoo.jpg' alt='Lincoln Park Zoo' />
      <LogoImage
        src='https://static.zooniverse.org/fem-assets/collaborate/lancaster.jpg'
        alt='Lancaster University'
      />
      <LogoImage
        src='https://static.zooniverse.org/fem-assets/collaborate/mio.jpg'
        alt='Mediterranean Institute of Oceanography'
      />
      <LogoImage
        src='https://static.zooniverse.org/fem-assets/collaborate/coram.jpg'
        alt='Coram Story Foundling Hospital'
      />
      <LogoImage
        src='https://static.zooniverse.org/fem-assets/collaborate/maxplanck.jpg'
        alt='Max Planck Society'
      />
      <LogoImage
        src='https://static.zooniverse.org/fem-assets/collaborate/crick.png'
        alt='The Francis Crick Institute'
      />
    </Grid>
  )
}
