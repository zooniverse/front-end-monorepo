import PropTypes from 'prop-types'
import React from 'react'

function TextInput ({ title, help, onChange, name, type = 'text', required = false, value }) {
  return (
    <fieldset>
      <label>
        {title}
        <input
          name={name}
          onChange={onChange}
          required={required}
          type={type}
          value={value}
        />
      </label>
      <small className='form-help'>
        {help}
      </small>
    </fieldset>
  )
}

TextInput.propTypes = {
  title: PropTypes.string,
  help: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string
}

export default TextInput
