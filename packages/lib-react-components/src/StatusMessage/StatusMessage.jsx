import { string } from 'prop-types'
import { Box } from 'grommet'
import { useTranslation } from '../translations/i18n'
import styled, { css } from 'styled-components'

const StatusMessageContainer = styled(Box)`
  border: 1px solid red;
  ${props => (props.theme.dark)
    ? css`
      color: ${props.theme.global.colors['neutral-6']};
      background: ${props.theme.global.colors['dark-4']};
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

  &.state-success, &.state-error, &.state-alert {}

`

function StatusMessage ({
  text = '',
  type = '',

  height = undefined,
  width = undefined,
  margin = '',
  pad = '',

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
  const _pad = isHidden ? undefined : pad
  const cssState = isHidden ? 'nothing' : _type

  console.log('+++ type: ', _type, text?.length, type)

  return (
    <StatusMessageContainer
      aria-atomic={true}
      className={`statusMessage state-${cssState}`}
      role='status'
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
