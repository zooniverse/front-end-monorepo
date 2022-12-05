import PropTypes from 'prop-types'

function Background (props) {
  const {
    borderColor,
    fill,
    height,
    underlayParameters,
    width,
    ...rest
  } = props
  return (
    <>
      <rect
        fill={fill}
        height={height}
        stroke={borderColor || ''}
        strokeWidth={(borderColor) ? 1 : 0}
        width={width}
        {...rest}
      />
      {underlayParameters.length > 0 &&
        underlayParameters.map((parameters) => {
          const { fill, left, width } = parameters
          return (
            <rect
              key={Math.random()}
              fill={fill}
              height={height}
              transform={`translate(${left}, ${(borderColor ? 1 : 0)})`}
              width={width}
              {...rest}
            />
          )
        })}
    </>

  )
}

Background.defaultProps = {
  borderColor: '',
  fill: '',
  height: '100%',
  underlayParameters: [],
  width: '100%'
}

Background.propTypes = {
  borderColor: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  underlayParameters: PropTypes.arrayOf(PropTypes.object),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default Background
