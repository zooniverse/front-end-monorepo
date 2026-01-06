import { string } from 'prop-types'
import styled from 'styled-components'
import { observer, MobXProviderContext } from 'mobx-react'
import { useContext } from 'react'
import { Image } from 'grommet'

const Img = styled(Image)`
  object-position: 0 50%;
  object-fit: cover;
  width: 100%;
  height: 100%;

  // Grommet small breakpoint
  @media (width < 769px) {
    height: 230px;
    min-height: inherit;
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

  return <Img alt='' src={backgroundSrc} />
}

Background.propTypes = {
  backgroundSrc: string
}

export default observer(Background)
