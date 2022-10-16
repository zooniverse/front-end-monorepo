import { Button, Box, Grid } from 'grommet'
import { FormNext, FormPrevious } from 'grommet-icons'
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

export const StyledFrameList = styled.fieldset`
  height: 44px;
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
  border: none;
`

const StyledButton = styled(Button)`
  & > div {
    flex-direction: column;
  }
`

const backgrounds = { dark: 'dark-3', light: 'neutral-6' }

const FlipbookControls = ({
  currentFrame = 0,
  locations = [],
  onFrameChange = () => true,
  theme
}) => {
  const activeLabel = useRef()
  const frameList = useRef()

  const { t } = useTranslation('components')

  const handleFrameChange = frameIndex => {
    onFrameChange(frameIndex)
  }

  const handlePrevious = () => {
    if (currentFrame > 0) {
      handleFrameChange(currentFrame - 1)
    }
  }

  const handleNext = () => {
    if (currentFrame < locations.length) {
      handleFrameChange(currentFrame + 1)
    }
  }

  return (
    <Box background={backgrounds}>
      <Grid columns={['120px', 'flex']} pad='10px'>
        {/** Play/Pause & Speed go here */}
        <Box />

        {/** Image Thumbnails */}
        <Box direction='row' justify='between'>
          <StyledButton
            disabled={currentFrame === 0}
            icon={<FormPrevious />}
            label={t(
              'SubjectViewer.MultiFrameViewer.FrameCarousel.previousFrameLabel'
            )}
            onClick={() => handlePrevious()}
            style={{
              border: 'none',
              padding: 0
            }}
          />
          <StyledFrameList ref={frameList}>
            {locations?.length &&
              locations.map((location, index) => {
                const mimeType = Object.keys(location)[0]
                const url = location[mimeType]
                const activeFrame = currentFrame === index

                return (
                  <Box
                    key={`${url}-${index}`}
                    ref={activeFrame ? activeLabel : null}
                    height='40px'
                    width='40px'
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
                      aria-label={t(
                        'SubjectViewer.MultiFrameViewer.FrameCarousel.thumbnailAltText'
                      )}
                      htmlFor={`frame ${index}`}
                      style={{
                        position: 'absolute',
                        top: activeFrame ? 0 : '2px',
                        left: activeFrame ? 0 : '2px',
                        height: '40px',
                        width: '40px',
                        backgroundImage: `url(${url})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        border: activeFrame
                          ? `solid 2px ${theme.global.colors['neutral-2']}`
                          : 'none'
                      }}
                    />
                  </Box>
                )
              })}
          </StyledFrameList>
          <StyledButton
            disabled={currentFrame === locations.length - 1}
            icon={<FormNext />}
            label={t(
              'SubjectViewer.MultiFrameViewer.FrameCarousel.nextFrameLabel'
            )}
            onClick={() => handleNext()}
            style={{
              border: 'none',
              padding: 0
            }}
          />
        </Box>
      </Grid>
    </Box>
  )
}

FlipbookControls.propTypes = {
  currentFrame: PropTypes.number.isRequired,
  locations: PropTypes.arrayOf(locationValidator).isRequired,
  onFrameChange: PropTypes.func.isRequired,
  theme: PropTypes.object
}

export default withTheme(FlipbookControls)
export { FlipbookControls }
