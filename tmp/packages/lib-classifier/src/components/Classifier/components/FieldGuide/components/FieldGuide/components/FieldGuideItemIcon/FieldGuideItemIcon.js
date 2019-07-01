import zooTheme from '@zooniverse/grommet-theme'
import React from 'react'
import { Media } from '@zooniverse/react-components'
import PropTypes from 'prop-types'

export default function FieldGuideItemIcon (props) {
  const { alt, className, height, icon, viewBox, width } = props
  if (icon && Object.keys(icon).length > 0) {
    return (
      <Media
        alt={alt}
        className={className}
        fit='contain'
        height={height}
        src={icon.src}
        width={width}
        {...props}
      />
    )
  }

  return (
    <svg className={className} viewBox={viewBox} {...props}>
      <rect fill={zooTheme.global.colors['accent-2']} height={height} width={width} />
    </svg>
  )
}

FieldGuideItemIcon.defaultProps = {
  alt: '',
  className: '',
  height: '100%',
  icon: {},
  viewBox: '0 0 100 100',
  width: '100%'
}

FieldGuideItemIcon.propTypes = {
  alt: PropTypes.string,
  className: PropTypes.string,
  height: PropTypes.string,
  icon: PropTypes.object,
  viewBox: PropTypes.string,
  width: PropTypes.string
}
