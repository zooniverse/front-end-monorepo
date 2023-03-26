import PropTypes from 'prop-types'

export default function Selection ({ color, handleDelete, text }) {
  return (
    <span
      data-selection={text}
      style={{ backgroundColor: color }}
    >
      {text}
      {' '}
      <button
        aria-label='Delete'
        onClick={handleDelete}
        title='Delete'
      >
        &times;
      </button>
    </span>
  )
}

Selection.propTypes = {
  color: PropTypes.string,
  handleDelete: PropTypes.func,
  text: PropTypes.string
}
