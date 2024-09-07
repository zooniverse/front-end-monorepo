"use client";

import { useState } from "react";
import { genId } from "./helper.js";

export const InputRange = ({
  valueMax = 100,
  valueMin = 0,
  valueCurrent = 50,
  onChange = () => {},
}) => {
  const [state, setState] = useState({
    _id: Math.random().toString(36).slice(2),
    valueMax,
    valueMin,
    valueCurrent,
  });

  const inChange = (ev) => {
    let value = parseInt(ev.target.value, 10);
    const newObj = {
      ...state,
      valueCurrent: value,
    };

    setState(newObj);
    onChange(newObj.valueCurrent);
  };

  return (
    <div className="range-slider-container">
      <div className="range-slider-control range-flex">
        <div className="">{state.valueMin}</div>
        <input
          className="flex-1 range-slider"
          type="range"
          name="valueCurrent"
          value={state.valueCurrent}
          min={state.valueMin}
          max={state.valueMax}
          onInput={inChange}
          onChange={inChange}
        />
        <div className="range-slider-max-value">{state.valueMax}</div>
      </div>
      <div className="range-input-control range-flex">
        <div className="range-flex">
          <label htmlFor={`range-input-value-${state._id}`}>
            Current Value:{" "}
          </label>
          <input
            type="number"
            name="valueCurrent"
            id={`range-input-value-${state._id}`}
            value={state.valueCurrent}
            min={state.valueMin}
            max={state.valueMax}
            onChange={inChange}
          />
        </div>
      </div>
    </div>
  );
};
