import { string } from 'prop-types'
import { Box } from 'grommet'
import { useTranslation } from '../translations/i18n'
import styled, { css } from 'styled-components'

const StatusMessageContainer = styled(Box)`
  border-radius: 4px;

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
  }

  &.state-error {
    border-left: 6px solid ${props => props.theme.global.colors['neutral-4']};
  }

  &.state-warning {
    border-left: 6px solid ${props => props.theme.global.colors['drawingTools']['orange']};
  }

`

function StatusMessage ({
  text = '',
  type = '',

  width = undefined,
  height = undefined,
  margin = '',
  padding = { vertical: 'xsmall', horizontal: 'medium' },

  ...rest
}) {
  const { t } = useTranslation()

  // When text is empty, or type ISN'T success/error/warning, then this element
  // is hidden **via CSS tricks**.
  // Accessibility note: when this element is hidden, we do NOT use
  // display:none, or <div hidden>, or visibility:none, since that will bork the
  // screen reader. The element needs to always exist on the DOM.

  const isHidden = !(text?.length) || !['success', 'error', 'warning'].includes(type)
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
      role='status'
      align='center'
      type={_type}

      height={_height}
      width={_width}
      margin={_margin}
      pad={_pad}

      {...rest}
    >
      {text}
    </StatusMessageContainer>
  )
}

StatusMessage.propTypes = {
  text: string,
  type: string,
}

export default StatusMessage
