import { Box } from 'grommet'
import { ForwardTen } from 'grommet-icons'
import { number, object, string } from 'prop-types'
import styled, { css } from 'styled-components'

const COLORS = {
  active: '#265B68',
  black: '#000',
  hover: '#ADDDE0',
  white: '#FFF'
}

const svgSlider = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 32'>
  <rect width='100%' height='100%' rx='8' ry='8' style='fill: rgb(0,93,105);' />
  <path d='M16 10 l-7 6 l7 6;' style='stroke:rgb(173, 221, 224); stroke-width:2; fill: none;'/>
  <path d='M24 10 l7 6 l-7 6;' style='stroke:rgb(173, 221, 224); stroke-width:2; fill: none;'/>
</svg>`

const svgSliderStyles = `
  appearance: none;
  background-image: url("data:image/svg+xml;base64,${btoa(svgSlider)}");
  background-size: cover;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  height: 32px;
  width: 40px;
`

const StyledSlider = styled(Box)`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 60px;
  width: 60px;

  input[type="range"] {
    ${props =>
      props.theme.dark
        ? css`background: ${COLORS.white};`
        : css`background: ${COLORS.black};`
    }
    -webkit-appearance: none;
    border-radius: 5px;
    height: 4px;
    transform: rotate(90deg) translateX(125px);
    width: 250px;

    &::-moz-range-thumb {
      ${svgSliderStyles}
    }
    &::-webkit-slider-thumb {
      ${svgSliderStyles}
    }
  }
  
  .plane-slider-forward {
    ${props =>
      props.theme.dark
        ? css`color: ${COLORS.white};`
        : css`color: ${COLORS.black};`
    }
    background: none;
    border: none;
    border-radius: 20px;
    height: fit-content;
    padding: 0;
    width: fit-content;
    
    &:active {
      background-color: ${COLORS.active};
    }

    svg {
      height: 20px;
      width: 20px;
      padding: 10px;

      &:hover, &:active {
        stroke: ${COLORS.white};

      }
    }
  }

  @media (hover: hover) {
    .plane-slider-forward:hover {
      background-color: ${COLORS.hover};
      stroke: ${COLORS.white};
    }

    .plane-slider-forward:active {
      background-color: ${COLORS.active};
      stroke: ${COLORS.white};
    }
  }
`

export const Slider = ({ dimension, viewer }) => {
  const currentFrame = viewer.base - 1 - viewer.getPlaneFrameIndex({ dimension });

  function inChange (e) {
    const nextFrame = viewer.base - 1 - +e.target.value;
    viewer.setPlaneFrameActive({ dimension, frame: nextFrame })
  }

  function advanceFrame() {
    viewer.setPlaneFrameActive({
      dimension,
      frame: (viewer.getPlaneFrameIndex({ dimension }) - 10 + viewer.base) % viewer.base
    })
  }

  return (
    <StyledSlider>
      <button
        className='plane-slider-forward no-select'
        onClick={advanceFrame}
        aria-label='Advance 10 Frames'
      >
        <ForwardTen />
      </button>

      <input
        aria-label={`Plane ${dimension} Slider`}
        max={viewer.base - 1}
        min='0'
        onChange={inChange}
        type='range'
        value={currentFrame}
      />
    </StyledSlider>
  )
}

Slider.propTypes = {
  dimension: number,
  frame: string,
  viewer: object
}
