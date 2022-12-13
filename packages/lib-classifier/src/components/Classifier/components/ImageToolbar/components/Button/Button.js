import { bool, func } from 'prop-types'
import { Button as GrommetButton } from 'grommet'
import styled, { css } from 'styled-components'
import { observer } from 'mobx-react'
import { useStores } from '@hooks'

function storeMapper(store) {
  const {
    viewerWidth
  } = store.subjectViewer

  return {
    viewerWidth
  }
}

const StyledButton = styled(GrommetButton)`
  display: flex;
  ${props => props.active
      ? css`background-color: ${props.theme.global.colors.brand};`
      : css`background-color: ${props.theme.dark
            ? props.theme.global.colors['dark-3']
            : 'inherit'};`}
  border-radius: 50%;
  padding: ${props => (props.smallViewer ? '8px' : '10px')};
  &:not(:last-child) {
    margin-bottom: ${props => (props.smallViewer ? '8px' : '10px')};
  }

  &:hover,
  &:focus {
    ${props => props.theme.dark
        ? css`background-color: ${props.theme.global.colors['neutral-1']};`
        : css`background-color: ${props.theme.global.colors['accent-1']};`}

    > svg {
      fill: white;

      > circle {
        fill: ${props => (props.theme.dark ? 'white' : 'black')};
        stroke: ${props => (props.theme.dark ? 'black' : 'white')};
      }

      > path {
        fill: ${props => (props.theme.dark ? 'black' : 'white')};
      }
    }
  }

  > svg {
    ${props => props.active
        ? css`fill: white;`
        : css`fill: ${props.theme.dark ? 'white' : 'black'};`}
    // Same width and height as FieldGuideButton
    height: ${props => props.smallViewer ? '0.9rem' : '1.2rem'};
    width: ${props => props.smallViewer ? '0.9rem' : '1.2rem'};
    stroke: transparent;
  }
`

function Button({
  active = false,
  a11yTitle,
  disabled,
  icon,
  onBlur = () => true,
  onClick = () => true,
  onFocus = () => true,
  onMouseOver = () => true,
  onMouseOut = () => true
}) {
  const { viewerWidth } = useStores(storeMapper)

  const eventHandlers = disabled
    ? {}
    : {
        onBlur,
        onClick,
        onFocus,
        onMouseOver,
        onMouseOut
      }

  return (
    <StyledButton
      active={active}
      a11yTitle={a11yTitle}
      disabled={disabled}
      icon={icon}
      smallViewer={viewerWidth === 'small'}
      title={a11yTitle}
      {...eventHandlers}
    />
  )
}

Button.propTypes = {
  active: bool,
  onBlur: func,
  onClick: func,
  onFocus: func,
  onMouseOver: func,
  onMouseOut: func
}

export default observer(Button)
