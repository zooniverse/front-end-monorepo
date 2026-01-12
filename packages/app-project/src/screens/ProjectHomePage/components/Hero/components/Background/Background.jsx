import { string } from 'prop-types'
import styled from 'styled-components'
import { observer, MobXProviderContext } from 'mobx-react'
import { useContext } from 'react'
import { Box } from 'grommet'

const StyledBox = styled(Box)`
  width: 100%;
  height: 100%;
  background-image: url("${props => props.$imageSrc}");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 0 50%;

  // Grommet small breakpoint
  @media (width < 769px) {
    background-position: 50% 50%;
    min-height: 230px;
  }
`


function useStores() {
  const { store } = useContext(MobXProviderContext)
  const { src } = store.project?.background
  return {
    backgroundSrc: src
  }
}

function Background() {
  const { backgroundSrc } = useStores()

  return <StyledBox $imageSrc={backgroundSrc} />
}

Background.propTypes = {
  backgroundSrc: string
}

export default observer(Background)
