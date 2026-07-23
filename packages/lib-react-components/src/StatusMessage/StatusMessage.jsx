import PropTypes from 'prop-types'
import { Box } from 'grommet'
import styled, { css } from 'styled-components'
import StatusIcon from './components/StatusIcon'

const StatusMessageContainer = styled(Box)`
  border-radius: 4px;
  gap: 0.75em;

  ${props => (props.theme.dark)
    ? css`
      color: ${props.theme.global.colors['neutral-6']};
      background: ${props.theme.global.colors['dark-6']};
    `
    : css`
      color: ${props.theme.global.colors['dark-4']};
      background: ${props.theme.global.colors['light-1']};
    `
  }

  &.state-nothing {
    width: 0;
    height: 0;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  &.state-success {
    border-left: 6px solid ${props => props.theme.global.colors['highlighterTool']['green']};

    > svg {
      flex: 0 0 auto;
      fill: ${props => props.theme.global.colors['highlighterTool']['green']};
    }
  }

  &.state-error {
    border-left: 6px solid ${props => props.theme.global.colors['neutral-4']};

    > svg {
      flex: 0 0 auto;
      stroke: ${props => props.theme.global.colors['neutral-4']};
    }
  }

  &.state-warning {
    border-left: 6px solid ${props => props.theme.global.colors['drawingTools']['orange']};

    > svg {
      flex: 0 0 auto;
      stroke: ${props => props.theme.global.colors['drawingTools']['orange']};
    }
  }

`

function StatusMessage ({
  text = '',
  type = '',

  width = undefined,
  height = undefined,
  margin = '',
  padding = { vertical: '10px', horizontal: 'medium' },

  ...rest
}) {

  // When text is empty, or type ISN'T success/error/warning, then this element
  // is hidden **via CSS tricks**.
  // Accessibility note: when this element is hidden, we do NOT use
  // display:none, or <div hidden>, or visibility:none, since that will bork the
  // screen reader. The element needs to always exist on the DOM.

  const isHidden = !text || !['success', 'error', 'warning'].includes(type)
  const _type = isHidden ? '' : type
  const _width = isHidden ? undefined : width
  const _height = isHidden ? undefined : height
  const _margin = isHidden ? undefined : margin
  const _pad = isHidden ? undefined : padding
  const cssState = isHidden ? 'nothing' : _type

  return (
    <StatusMessageContainer
      aria-atomic={true}
      className={`statusMessage state-${cssState}`}
      direction='row'
      role='status'
      align='center'
      justify='center'
      type={_type}

      height={_height}
      width={_width}
      margin={_margin}
      pad={_pad}

      {...rest}
    >
      {isHidden
        ? null
        : <>
          <StatusIcon type={_type} />
          {text}
        </>}
    </StatusMessageContainer>
  )
}

StatusMessage.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),  // Either pass in a string, or another React/HTML ocomponent
  type: PropTypes.oneOf(['success', 'error', 'warning', '']),

  // Grommet-style layout values
  width: PropTypes.string,
  height: PropTypes.string,
  margin: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  padding: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),

  // Also accepts other Box-compatible attributes.
}

export default StatusMessage
