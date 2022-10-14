import { Button, Box, Grid } from 'grommet'
import { Next, Previous } from 'grommet-icons'
import { tint } from 'polished'
import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import styled, { css, withTheme } from 'styled-components'
import { useTranslation } from 'react-i18next'

import locationValidator from '../../../helpers/locationValidator'

const StyledLabel = styled.label`
  ${props => css`
    :focus {
      outline: 2px solid ${tint(0.5, props.theme.global.colors.brand)};
    }

    :hover {
      outline: 2px solid ${tint(0.5, props.theme.global.colors.brand)};
    }
  `}
`

export const StyledFrameList = styled.ul`
  align-items: center;
  height: 100%;
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0 10px;
`

const FlipbookControls = ({
  frame = 0,
  locations = [],
  onFrameChange = () => true,
  t = () => true,
  theme
}) => {
  const activeLabel = useRef()
  const frameList = useRef()

  // Sometimes we get a flash of the placeholder image when changing frames
  // How can the UX be improved?
  const handleFrameChange = frameIndex => {
    onFrameChange(frameIndex)
  }

  const handlePrevious = () => {
    if (frame > 0) {
      handleFrameChange(frame - 1)
    }
  }

  const handleNext = () => {
    if (frame < locations.length) {
      handleFrameChange(frame + 1)
    }
  }

  return (
    <Box background={{ dark: 'dark-3', light: 'neutral-6' }}>
      <Grid columns={['120px', 'flex']} pad='10px'>
        {/** Play/Pause & Speed go here */}
        <Box />

        {/** Image Thumbnails */}
        <Box direction='row' justify='between'>
          <Button
          // Add a translated label
            disabled={frame === 0}
            label={<Previous />}
            onClick={() => handlePrevious()}
            style={{
              border: 'none',
              padding: 0,
              display: 'flex',
              alignItems: 'center'
            }}
          />
          <StyledFrameList ref={frameList}>
            {locations?.length && locations.map((location, index) => {
              const mimeType = Object.keys(location)[0]
              const url = location[mimeType]
              const activeFrame = frame === index

              return (
                <Box
                  key={`${url}-${index}`}
                  ref={activeFrame ? activeLabel : null}
                  height='44px'
                  width='44px'
                  margin='0 5px'
                  style={{
                    position: 'relative'
                  }}
                >
                  <input
                    id={`frame ${index}`}
                    checked={activeFrame}
                    name='frame'
                    onChange={() => handleFrameChange(index)}
                    type='radio'
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      margin: 0,
                      height: '100%',
                      width: '100%',
                      opacity: '1%'
                    }}
                  />
                  <StyledLabel
                  // Do we need a translated label here?
                    for={`frame ${index}`}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      height: '40px',
                      width: '40px',
                      backgroundImage: `url(${url})`,
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      border: activeFrame
                        ? `solid 2px ${theme.global.colors['neutral-2']}`
                        : 'solid 2px transparent'
                    }}
                  />
                </Box>
              )
            })}
          </StyledFrameList>
          <Button
            disabled={frame === locations.length - 1}
            label={<Next />}
            // Add a translated label
            onClick={() => handleNext()}
            style={{
              border: 'none',
              padding: 0,
              display: 'flex',
              alignItems: 'center'
            }}
          />
        </Box>
      </Grid>
    </Box>
  )
}

FlipbookControls.propTypes = {
  frame: PropTypes.number.isRequired,
  locations: PropTypes.arrayOf(locationValidator).isRequired,
  onFrameChange: PropTypes.func.isRequired,
  theme: PropTypes.object
}

export default withTheme(FlipbookControls)
export { FlipbookControls }
