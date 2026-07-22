import { string } from 'prop-types'
import { Box } from 'grommet'
import { useTranslation } from '../translations/i18n'
import styled, { css } from 'styled-components'

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
      fill: ${props => props.theme.global.colors['highlighterTool']['green']};
    }
  }

  &.state-error {
    border-left: 6px solid ${props => props.theme.global.colors['neutral-4']};

    > svg {
      stroke: ${props => props.theme.global.colors['neutral-4']};
    }
  }

  &.state-warning {
    border-left: 6px solid ${props => props.theme.global.colors['drawingTools']['orange']};

    > svg {
      stroke: ${props => props.theme.global.colors['drawingTools']['orange']};
    }
  }

`

// TODO: move StatusIcon to its own sub-component
function StatusIcon ({
  type
}) {
  switch (type) {
    case 'success':
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C9.05058 16 10.0909 15.7931 11.0615 15.391C12.0321 14.989 12.914 14.3997 13.6569 13.6569C14.3997 12.914 14.989 12.0321 15.391 11.0615C15.7931 10.0909 16 9.05058 16 8C16 6.94943 15.7931 5.90914 15.391 4.93853C14.989 3.96793 14.3997 3.08601 13.6569 2.34315C12.914 1.60028 12.0321 1.011 11.0615 0.608964C10.0909 0.206926 9.05058 -1.56548e-08 8 0C5.87827 3.16163e-08 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16ZM7.79378 11.2356L12.2382 5.90222L10.8729 4.76444L7.05067 9.35022L5.07289 7.37156L3.816 8.62844L6.48267 11.2951L7.17067 11.9831L7.79378 11.2356Z" />
        </svg>
      )
    case 'error':
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <g clip-path="url(#clip0_1518_8602)">
            <path d="M8 9.4V3.8M8 12.2V10.8M8 1C4.1339 1 1 4.1339 1 8C1 11.8661 4.1339 15 8 15C11.8661 15 15 11.8661 15 8C15 4.1339 11.8661 1 8 1Z" stroke-width="1.5"/>
          </g>
          <defs>
            <clipPath id="clip0_1518_8602">
              <rect width="16" height="16" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      )
    case 'warning':
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <g clip-path="url(#clip0_1518_8610)">
            <path d="M8 5.81018V10.1902M8 10.9202V12.3802M8 1.43018L15.3 14.5702H0.700001L8 1.43018Z" stroke-width="1.5" stroke-linejoin="round"/>
          </g>
          <defs>
            <clipPath id="clip0_1518_8610">
              <rect width="16" height="16" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      )

  }

  return null
}

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
  text: string,  // TODO: also accept object
  type: string,
  // TODO: add other params
}

export default StatusMessage
