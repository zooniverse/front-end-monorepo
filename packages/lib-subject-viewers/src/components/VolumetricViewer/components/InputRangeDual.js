'use client'

import { func, number } from 'prop-types'
import { useState } from 'react'

export const InputRangeDual = ({
  valueMax = 100,
  valueMin = 0,
  valueMaxCurrent = 75,
  valueMinCurrent = 25,
  onChange = () => {}
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
      var(--grey) 0%,
      var(--grey) ${(fromPosition / rangeDistance) * 100}%,
      var(--primary-accent) ${(fromPosition / rangeDistance) * 100}%,
      var(--primary-accent) ${(toPosition / rangeDistance) * 100}%, 
      var(--grey) ${(toPosition / rangeDistance) * 100}%, 
      var(--grey) 100%)`
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
    <div className='range-slider-container'>
      <div className='range-slider-control range-flex'>
        <div className='range-slider-min-value'>{state.valueMin}</div>
        <div className='range-slider'>
          <input
            className='range-slider-dual range-slider-lower-value'
            type='range'
            name='valueMinCurrent'
            value={state.valueMinCurrent}
            min={state.valueMin}
            max={state.valueMax}
            onInput={inChange}
            onChange={inChange}
          />
          <input
            className='range-slider-dual'
            id='toSlider'
            type='range'
            name='valueMaxCurrent'
            value={state.valueMaxCurrent}
            min={state.valueMin}
            max={state.valueMax}
            onInput={inChange}
            onChange={inChange}
            style={{ background: fillSlider() }}
          />
        </div>
        <div className='range-slider-max-value'>{state.valueMax}</div>
      </div>
      <div className='range-input-control range-flex'>
        <div className='range-flex'>
          <label htmlFor='range-input-lower-value'>Min</label>
          <input
            type='number'
            name='valueMinCurrent'
            id='range-input-lower-value'
            value={state.valueMinCurrent}
            min={state.valueMin}
            max={state.valueMax}
            onChange={inChange}
          />
        </div>
        <div className='spacer' />
        <div className='range-flex'>
          <div htmlFor='range-input-upper-value'>Max</div>
          <input
            type='number'
            name='valueMaxCurrent'
            id='range-input-upper-value'
            value={state.valueMaxCurrent}
            min={state.valueMin}
            max={state.valueMax}
            onChange={inChange}
          />
        </div>
      </div>
    </div>
  )
}

InputRangeDual.propTypes = {
  valueMax: number,
  valueMin: number,
  valueMaxCurrent: number,
  valueMinCurrent: number,
  onChange: func
}
