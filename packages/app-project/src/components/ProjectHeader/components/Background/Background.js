import { Box } from 'grommet'
import { observer, MobXProviderContext } from 'mobx-react'
import { useContext } from 'react'
import styled, { css } from 'styled-components'

const BackgroundBox = styled(Box)`
  position: absolute;
`

const BackgroundImage = styled.div`
  background-blend-mode: multiply;
  background-color: rgba(0,93,105,0.3);
  ${props => css`background-image: url("${props['data-src']}");`}
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(5px) brightness(50%);
  height: 100%;
  transform: scale(1.15);
`

function useProjectBackground() {
  const { store } = useContext(MobXProviderContext)
  return store.project.background.src
}

function Background() {
  const backgroundSrc = useProjectBackground()
  return (
    <BackgroundBox
      aria-hidden='true'
      background='brand'
      height='100%'
      overflow='hidden'
      width='100%'
    >
      {backgroundSrc && <BackgroundImage data-src={backgroundSrc} />}
    </BackgroundBox>
  )
}

export default observer(Background)
