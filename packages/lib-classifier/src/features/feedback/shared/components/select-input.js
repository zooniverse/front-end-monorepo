import PropTypes from 'prop-types'
import React from 'react'
import Select from 'react-select'

function SelectInput ({ help, onChange, multi = false, name, options, placeholder = '', title, value }) {
  return (
    <fieldset>
      <label>
        {title}
        <Select
          multi={multi}
          name={name}
          onChange={onChange}
          options={options}
          placeholder={placeholder}
          value={value}
        />
      </label>
      <small className='form-help'>
        {help}
      </small>
    </fieldset>
  )
}

SelectInput.propTypes = {
  help: PropTypes.string,
  onChange: PropTypes.func,
  multi: PropTypes.bool,
  name: PropTypes.string,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.string
}

export default SelectInput
