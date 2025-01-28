import { func, number } from 'prop-types'
import styled from 'styled-components'
import { useState } from 'react'

const DEFAULT_HANDLER = () => {}

const StyledContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  min-height: 16px;
  transform: translateY(-3px);

  .range-slider-container {
    flex-grow: 1;
    position: relative;

    .range-slider-dual {
      -webkit-appearance: none;
      appearance: none;
      background-color: #A6A7A9;
      border-radius: 4px;
      height: 4px;
      pointer-events: none;
      position: absolute;
      width: 100%;
    }

    .range-slider-dual::-webkit-slider-thumb {
      -webkit-appearance: none;
      background-color: #005D69;
      border-radius: 50%;
      cursor: pointer;
      height: 16px;
      pointer-events: all;
      width: 16px;
    }

    .range-slider-dual::-moz-range-thumb {
\			background-color: #005D69;
      border-radius: 50%;
      cursor: pointer;
      height: 16px;
      pointer-events: all;
      width: 16px;
    }

    .range-slider-lower-value {
      height: 0;
      transform: translateY(2px);
      z-index: 1;
    }
  }
`

export const InputRangeDual = ({
  onChange = DEFAULT_HANDLER,
  valueMax = 100,
  valueMaxCurrent = 75,
  valueMin = 0,
  valueMinCurrent = 25,
}) => {
  const [state, setState] = useState({
    valueMax,
    valueMin,
    valueMaxCurrent,
    valueMinCurrent
  })

  function fillSlider () {
    const rangeDistance = state.valueMax - state.valueMin
    const fromPosition = state.valueMinCurrent - state.valueMin
    const toPosition = state.valueMaxCurrent - state.valueMin

    return `linear-gradient(
      to right,
      #A6A7A9 0%,
      #A6A7A9 ${(fromPosition / rangeDistance) * 100}%,
      #FFFFFF ${(fromPosition / rangeDistance) * 100}%,
      #FFFFFF ${(toPosition / rangeDistance) * 100}%, 
      #A6A7A9 ${(toPosition / rangeDistance) * 100}%, 
      #A6A7A9 100%)`
  }

  const inChange = (ev) => {
    const name = ev.target.name
    let value = parseInt(ev.target.value, 10)

    if (name === 'valueMaxCurrent' && value < state.valueMinCurrent) {
      value = state.valueMinCurrent
    } else if (name === 'valueMinCurrent' && value > state.valueMaxCurrent) {
      value = state.valueMaxCurrent
    }

    const newObj = {
      ...state,
      [name]: value
    }

    setState(newObj)
    onChange(newObj.valueMinCurrent, newObj.valueMaxCurrent)
  }

  return (
    <StyledContainer>
      <div className='range-slider-container'>
        <input
          className='range-slider-dual range-slider-lower-value'
          max={state.valueMax}
          min={state.valueMin}
          name='valueMinCurrent'
          onChange={inChange}
          onInput={inChange}
          type='range'
          value={state.valueMinCurrent}
        />
        <input
          className='range-slider-dual range-slider-upper-value'
          max={state.valueMax}
          min={state.valueMin}
          name='valueMaxCurrent'
          onChange={inChange}
          onInput={inChange}
          style={{ background: fillSlider() }}
          type='range'
          value={state.valueMaxCurrent}
        />
      </div>
    </StyledContainer>
  )
}

InputRangeDual.propTypes = {
  valueMax: number,
  valueMin: number,
  valueMaxCurrent: number,
  valueMinCurrent: number,
  onChange: func
}
