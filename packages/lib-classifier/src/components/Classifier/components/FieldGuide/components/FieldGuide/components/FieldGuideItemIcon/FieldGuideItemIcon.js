import zooTheme from '@zooniverse/grommet-theme'
import { Media } from '@zooniverse/react-components'
import PropTypes from 'prop-types'
import { Box } from 'grommet'

export default function FieldGuideItemIcon({
  alt = '',
  className = '',
  height = 100,
  icon = null,
  width = 100,
  ...props
}) {

  const placeholder = (
    <Box
      background={zooTheme.global.colors['accent-1']}
      className={className}
      height={`${height}px`}
      width={`${width}px`}
    />
  )

  if (icon && Object.keys(icon).length > 0) {
    return (
      <Media
        alt={alt}
        className={className}
        fit='contain'
        height={height}
        placeholder={placeholder}
        src={icon.src}
        width={width}
      />
    )
  } else {
    return placeholder
  }
}

FieldGuideItemIcon.defaultProps = {
  alt: '',
  className: '',
  height: 100,
  icon: {},
  width: 100
}

FieldGuideItemIcon.propTypes = {
  alt: PropTypes.string,
  className: PropTypes.string,
  height: PropTypes.number,
  icon: PropTypes.object,
  width: PropTypes.number
}
