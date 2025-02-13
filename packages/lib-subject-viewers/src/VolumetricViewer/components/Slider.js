import { Box } from 'grommet'
import { ForwardTen } from 'grommet-icons'
import { number, object, string } from 'prop-types'
import styled, { css, useTheme } from 'styled-components'
import { useEffect, useState } from 'react'

/* RAW SVG FOR SLIDER | Needs to be URL encoded to view
const SVGSlider = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 32'>
  <rect width='100%' height='100%' rx='8' ry='8' style='fill: rgb(0,93,105);' />
  <path d='M16 10 l-7 6 l7 6;' style='stroke:rgb(173, 221, 224); stroke-width:2; fill: none;'/>
  <path d='M24 10 l7 6 l-7 6;' style='stroke:rgb(173, 221, 224); stroke-width:2; fill: none;'/>
</svg>`
*/

const StyledSlider = styled(Box)`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 60px;
  width: 60px;

  input[type="range"] {
    ${props =>
      props.theme.dark
        ? css`background: #FFF;`
        : css`background: #000;`
    }
    -webkit-appearance: none;
    border-radius: 5px;
    height: 4px;
    transform: rotate(-90deg) translateX(-125px);
    width: 250px;
  }
  
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 32'%3E%3Crect width='100%25' height='100%25' rx='8' ry='8' style='fill: rgb(0,93,105);' /%3E%3Cpath d='M16 10 l-7 6 l7 6;' style='stroke:rgb(173, 221, 224); stroke-width:2; fill: none;'/%3E%3Cpath d='M24 10 l7 6 l-7 6;' style='stroke:rgb(173, 221, 224); stroke-width:2; fill: none;'/%3E%3C/svg%3E");
    background-size: cover;
    cursor: pointer;
    height: 32px;
    width: 40px;
  }
  
  .plane-slider-forward {
    ${props =>
      props.theme.dark
        ? css`color: #FFF;`
        : css`color: #000;`
    }

    height: 20px;
    margin-bottom: 10px;
    padding: 10px;
    width: 20px;

    &:active {
      background-color: #ADDDE0;
      border-radius: 20px;
      color: white;
    }
  }
`

export const Slider = ({ dimension, viewer }) => {
  const [active, setActive] = useState(false)

  useEffect(() => {
    // if the advance-10 button is held, allow us to automatically advance the frame
    const interval = setInterval(() => {
      if (active) advanceFrame();
    }, 500);

    return () => clearInterval(interval);
  }, [active]);

  const theme = useTheme()
  const iconColor = (theme.dark)
    ? (active) ? '#FFFFFF' : '#FFFFFF'
    : (active) ? '#FFFFFF' : '#000000'

  function inChange (e) {
    viewer.setPlaneFrameActive({ dimension, frame: +e.target.value })
  }

  function inMouseDown () {
    setActive(true)
  }

  function inMouseUp () {
    setActive(false)
    advanceFrame();
  }

  function advanceFrame() {
    viewer.setPlaneFrameActive({
      dimension,
      frame: (viewer.getPlaneFrameIndex({ dimension }) + 10) % viewer.base
    })
  }

  return (
    <StyledSlider>
      <ForwardTen
        className='plane-slider-forward'
        color={iconColor}
        onMouseDown={inMouseDown}
        onMouseUp={inMouseUp}
      />
      <input
        aria-label={`Plane ${dimension} Slider`}
        max={viewer.base - 1}
        min='0'
        onChange={inChange}
        orient='vertical'
        type='range'
        value={viewer.getPlaneFrameIndex({ dimension })}
      />
    </StyledSlider>
  )
}

Slider.propTypes = {
  dimension: number,
  frame: string,
  viewer: object
}
