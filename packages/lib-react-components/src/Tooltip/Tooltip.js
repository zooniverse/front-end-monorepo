import PropTypes from 'prop-types'
import React from 'react'
import Tippy from '@tippyjs/react/headless/dist/tippy-react-headless.esm.js'
import Label from './components/Label/index.js'

function Tooltip (props) {
  const { 
    arrow = true,
    animation = { type: 'fadeIn', duration: 500 },
    children,
    label,
    placement = 'top',
    trigger = 'mouseenter focus',
    ...rest
   } = props

  return (
    <Tippy
      placement={placement}
      render={attrs => <Label arrow={arrow} animation={animation} label={label} {...attrs} />}
      trigger={trigger}
      {...rest}
    >
      {children}
    </Tippy>
  )
}

Tooltip.propTypes = {
  arrow: PropTypes.bool,
  animation: PropTypes.oneOfType([ PropTypes.array, PropTypes.object, PropTypes.string ]),
  children: PropTypes.node.isRequired,
  label: PropTypes.oneOfType([ PropTypes.string, PropTypes.node ]).isRequired,
  placement: PropTypes.string,
  trigger: PropTypes.string
}

export default Tooltip
