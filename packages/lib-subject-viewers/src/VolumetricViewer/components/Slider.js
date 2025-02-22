import { Box } from 'grommet'
import { ForwardTen } from 'grommet-icons'
import { number, object, string } from 'prop-types'
import styled, { css, useTheme } from 'styled-components'
import { useEffect, useState } from 'react'

// RAW SVG FOR SLIDER | Needs to be URL encoded to view
const SVGSlider = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 32'>
  <rect width='100%' height='100%' rx='8' ry='8' style='fill: rgb(0,93,105);' />
  <path d='M16 10 l-7 6 l7 6;' style='stroke:rgb(173, 221, 224); stroke-width:2; fill: none;'/>
  <path d='M24 10 l7 6 l-7 6;' style='stroke:rgb(173, 221, 224); stroke-width:2; fill: none;'/>
</svg>`


const StyledRangeInput = styled.input`
  ${props =>
    props.theme.dark
      ? css`background: #FFF;`
      : css`background: #000;`
  }
  appearance: none;
  border-radius: 5px;
  height: 4px;
  transform: rotate(-90deg) translateX(-125px);
  width: 250px;

  &::-webkit-slider-thumb {
    appearance: none;
    background-image: url("data:image/svg+xml,${encodeURIComponent(SVGSlider)}");
    background-size: cover;
    cursor: pointer;
    height: 32px;
    width: 40px;
  }

  &::-moz-range-thumb {
    appearance: none;
    background-image: url("data:image/svg+xml,${encodeURIComponent(SVGSlider)}");
    background-size: cover;
    cursor: pointer;
    height: 32px;
    width: 40px;
  }
`

const StyledSlider = styled(Box)`
  align-items: center;
  gap: 10px;
  height: 60px;
  width: 60px;
  
  .plane-slider-forward {
    ${props =>
      props.theme.dark
        ? css`color: #FFF;`
        : css`color: #000;`
    }

    height: fit-content;
    width: fit-content;
    padding: 0;
    border: none;
    background: none;

    &:active {
      background-color: #ADDDE0;
      border-radius: 20px;
      color: white;
    }
    
    svg {
      fill: currentColor;
      height: 20px;
      width: 20px;
      padding: 10px;
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
      <button
        className='plane-slider-forward'
        color={iconColor}
        onPointerDown={inMouseDown}
        onPointerUp={inMouseUp}
        aria-label='Advance 10 Frames'
      >
        <ForwardTen height={20} width={20} />
      </button>
      <StyledRangeInput
        aria-label={`Plane ${dimension} Slider`}
        max={viewer.base - 1}
        min={0}
        onInput={inChange}
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
