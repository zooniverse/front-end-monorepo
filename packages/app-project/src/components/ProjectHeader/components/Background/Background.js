import { string } from 'prop-types'
import { Box } from 'grommet'
import styled, { css } from 'styled-components'

const BackgroundBox = styled(Box)`
  position: absolute;
`

const BackgroundImage = styled.div`
  background-blend-mode: multiply;
  background-color: rgba(0,93,105,0.3);
  ${props => css`background-image: url("${props.src}");`}
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(5px) brightness(50%);
  height: 100%;
  transform: scale(1.15);
`

function Background ({ backgroundSrc }) {
  return (
    <BackgroundBox
      background='brand'
      height='100%'
      overflow='hidden'
      width='100%'
    >
      {backgroundSrc && <BackgroundImage src={backgroundSrc} />}
    </BackgroundBox>
  )
}

Background.propTypes = {
  backgroundSrc: string
}

export default Background
