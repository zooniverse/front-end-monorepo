import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import Tippy from '@tippyjs/react'
import Label from './components/Label'
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

const StyledTippy = styled(Tippy)`
  background-color: black !important;
  border-radius: 0 !important;

  .tippy-content {
    padding: 0;
  }

  &[data-placement^=bottom] > .tippy-arrow::before {
    border-bottom-color: black !important;
  }

  &[data-placement^='top'] > .tippy-arrow::before {
    border-top-color: black !important;
  }
`

function Tooltip (props) {
  const { 
    arrow = true,
    animation = 'scale',
    children,
    label,
    placement = 'top',
    trigger = 'mouseenter focus',
    ...rest
   } = props

  return (
    <StyledTippy
      arrow={arrow}
      animation={animation}
      content={<Label label={label} />}
      placement={placement}
      trigger={trigger}
      {...rest}
    >
      {children}
    </StyledTippy>
  )
}

Tooltip.propTypes = {
  arrow: PropTypes.bool,
  animation: PropTypes.string,
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  placement: PropTypes.string,
  trigger: PropTypes.string
}

export default Tooltip
