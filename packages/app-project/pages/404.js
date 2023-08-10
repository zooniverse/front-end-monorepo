import { ZooHeader, ZooFooter } from '@zooniverse/react-components'
import { Box, Image } from 'grommet'
import styled from 'styled-components'

const ContainerBox = styled(Box)`
  position: relative;
  color: white;
  z-index: 1;
`

const Overlay = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  opacity: 0.5;
  z-index: 2;
`

export default function Error404({ project404Fragment = '', staticAssetsPrefix = '' }) {
  const randomImage = Math.round(Math.random() * 8) + 1 // 1-9
  const backgroundURL = `${staticAssetsPrefix}/projects/assets/background${randomImage}.png`
  
  return (
    <>
      <ZooHeader />
      <ContainerBox
        width="100%"
        height="50vh"
        alignContent="center"
        background="#1e1e1e"
        justify="center"
      >
        <Overlay
          background={`url("${backgroundURL}")`}
          width="100%"
          height="50vh"
          justify="center"
        />
        <Box
          height="44px"
          alignContent="center"
          justify="center"
        >
          <Image
            id="404-logo"
            fit="contain"
            height="44px"
            alt="404"
            src={`${staticAssetsPrefix}/projects/assets/logoWhite404.png`}
          />
        </Box>
        {project404Fragment}
      </ContainerBox>
      <ZooFooter />
    </>
  )
}
