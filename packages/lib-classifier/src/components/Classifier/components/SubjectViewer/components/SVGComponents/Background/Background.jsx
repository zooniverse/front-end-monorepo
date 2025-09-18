import PropTypes from 'prop-types'

function Background ({
  borderColor = '',
  className = 'chartBackground',
  fill = '',
  height = '100%',
  underlayParameters = [],
  width = '100%',
  ...rest
}) {
  return (
    <>
      <rect
        className={className}
        fill={fill}
        focusable
        height={height}
        stroke={borderColor || ''}
        strokeWidth={(borderColor) ? 1 : 0}
        tabIndex={0}
        width={width}
        {...rest}
      />
      {underlayParameters.length > 0 &&
        underlayParameters.map((parameters) => {
          const { fill, left, width } = parameters
          return (
            <rect
              className={`${className}-underlay`}
              key={Math.random()}
              fill={fill}
              height={height}
              pointerEvents='none'
              transform={`translate(${left}, ${(borderColor ? 1 : 0)})`}
              width={width}
              {...rest}
            />
          )
        })}
    </>

  )
}

Background.propTypes = {
  borderColor: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  underlayParameters: PropTypes.arrayOf(PropTypes.object),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default Background
