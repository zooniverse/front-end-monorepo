import { bool, func, node, shape, string } from 'prop-types'
import styled from 'styled-components'

import MediaLink from '../MediaLink'

const StyledWrapper = styled.div`
  flex: none;
  height: ${props => props.$fill ? '100%' : 'auto'};
  position: relative;
  width: 100%;
`

// A sibling of the media, not a parent, so the media's block elements aren't nested inside a button.
const StyledSelectButton = styled.button`
  appearance: none;
  background: rgba(0, 0, 0, 0.3);
  border: none;
  border-radius: 8px 8px 0 0;
  cursor: pointer;
  inset: 0;
  margin: 0;
  padding: 0;
  position: absolute;
  transition: background-color 0.2s ease;
  z-index: 3;

  &:hover {
    background: rgba(0, 0, 0, 0.25);
  }

  &:focus-visible {
    box-shadow: inset 0 0 0 2px ${props => props.theme.global.colors['accent-1']};
    outline: none;
  }
`

const DEFAULT_SELECT_PROPS = {}

function MediaContainer({
  children,
  href,
  selectProps = DEFAULT_SELECT_PROPS,
  title
}) {
  const {
    onSelect,
    selectable,
    selected,
    selectLabel
  } = selectProps

  if (!selectable) {
    return (
      <MediaLink href={href} title={title}>
        {children}
      </MediaLink>
    )
  }

  return (
    <StyledWrapper $fill={!children}>
      {children}
      <StyledSelectButton
        aria-label={selectLabel}
        onClick={onSelect}
        type='button'
      />
    </StyledWrapper>
  )
}

MediaContainer.propTypes = {
  children: node,
  href: string.isRequired,
  selectProps: shape({
    onSelect: func,
    selectable: bool,
    selected: bool,
    selectLabel: string
  }),
  title: string.isRequired
}

export default MediaContainer
