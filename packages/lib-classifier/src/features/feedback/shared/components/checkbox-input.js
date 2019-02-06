import PropTypes from 'prop-types'
import React from 'react'

function CheckboxInput ({ title, help, onChange, checked, name }) {
  return (
    <fieldset>
      <label>
        <input
          type='checkbox'
          name={name}
          onChange={onChange}
          checked={checked}
        />
        {title}
      </label>
      <small className='form-help'>
        {help}
      </small>
    </fieldset>
  )
}

CheckboxInput.propTypes = {
  title: PropTypes.string,
  help: PropTypes.string,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  name: PropTypes.string
}

export default CheckboxInput
