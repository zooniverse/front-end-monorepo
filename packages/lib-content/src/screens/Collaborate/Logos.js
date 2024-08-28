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
          src='/assets/collaborate/sloan-foundation.jpg'
          alt='Alfred P. Sloan Foundation'
        />
        <LogoImage
          src='/assets/collaborate/ukri.jpg'
          alt='Arts and Humanities Research Council'
        />
        <LogoImage
          src='/assets/collaborate/nasa.png'
          alt='National Aeronautics and Space Administration (NASA)'
        />
        <LogoImage src='/assets/collaborate/google.png' alt='Google' />
        <LogoImage
          src='/assets/collaborate/imls.jpeg'
          alt='Institute of Museum and Library Services'
        />
        <LogoImage
          src='/assets/collaborate/acls.png'
          alt='American Council of Learned Societies'
        />
        <LogoImage
          src='/assets/collaborate/nih.png'
          alt='National Institutes of Health'
        />
        <LogoImage
          src='/assets/collaborate/nsf.jpg'
          alt='National Science Foundation'
        />
        <LogoImage
          src='/assets/collaborate/neh.jpeg'
          alt='National Endowment for the Humanities'
        />
      </Grid>
      <Box direction='row' justify='center' gap='40px'>
        <Box width='28%'>
          <LogoImage
            src='/assets/collaborate/noaa.png'
            alt='National Oceanic and Atmospheric Administration (NOAA)'
          />
        </Box>
        <Box width='28%'>
          <LogoImage
            src='/assets/collaborate/simons.jpg'
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
      <LogoImage src='/assets/collaborate/dupage.jpg' alt='College of Dupage' />
      <LogoImage
        src='/assets/collaborate/uts.jpg'
        alt='University of Technology Sydney'
      />
      <LogoImage
        src='/assets/collaborate/nwu.jpg'
        alt='Northwestern University'
      />
      <LogoImage
        src='/assets/collaborate/usfws.png'
        alt='United States Fish and Wildlife Service'
      />
      <LogoImage src='/assets/collaborate/brlib.png' alt='British Library' />
      <LogoImage
        src='/assets/collaborate/gorongosa.png'
        alt='Parque Nacional Da Gorongosa'
      />
      <LogoImage
        src='/assets/collaborate/saskatchawan.jpeg'
        alt='University of Saskatchawan'
      />
      <LogoImage
        src='/assets/collaborate/nmk.jpg'
        alt='National Museums of Kenya'
      />
      <LogoImage
        src='/assets/collaborate/lpo.jpg'
        alt='Agir pour la Biodiversité'
      />
      <LogoImage
        src='/assets/collaborate/upenn.jpg'
        alt='Penn Libraries University of Pennsylvania'
      />
      <LogoImage
        src='/assets/collaborate/tsinghua.jpg'
        alt='Tsinghua University'
      />
      <LogoImage
        src='/assets/collaborate/nhm.jpeg'
        alt='National History Museum'
      />
      <LogoImage src='/assets/collaborate/lpzoo.jpg' alt='Lincoln Park Zoo' />
      <LogoImage
        src='/assets/collaborate/lancaster.jpg'
        alt='Lancaster University'
      />
      <LogoImage
        src='/assets/collaborate/mio.jpg'
        alt='Mediterranean Institute of Oceanography'
      />
      <LogoImage
        src='/assets/collaborate/coram.jpg'
        alt='Coram Story Foundling Hospital'
      />
      <LogoImage
        src='/assets/collaborate/maxplanck.jpg'
        alt='Max Planck Society'
      />
      <LogoImage
        src='/assets/collaborate/crick.png'
        alt='The Francis Crick Institute'
      />
    </Grid>
  )
}
