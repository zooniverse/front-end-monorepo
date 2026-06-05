import { Box, Button } from 'grommet'
import { arrayOf, func, number, shape, string } from 'prop-types'
import styled from 'styled-components'

import { useTranslation } from '@translations/i18n'

const TabList = styled(Box).attrs({
  direction: 'column',
  gap: 'xxsmall',
  role: 'tablist'
})`
  background: ${props => (props.theme.dark ? props.theme.global.colors['dark-3'] : '#fff')};
  border: 1px solid ${props => props.theme.global.colors['light-5']};
  border-radius: 4px;
  padding: 2px;
`

const TabButton = styled(Button).attrs({ role: 'tab' })`
  background: ${props => (props.active ? props.theme.global.colors['accent-1'] : 'transparent')};
  border: none;
  border-radius: 3px;
  font-size: 12px;
  padding: 4px 8px;

  &:focus,
  &:focus-visible {
    outline: 2px solid ${props => props.theme.global.colors['accent-1']};
    outline-offset: -2px;
  }
`

function LayerControl ({ layers = [], activeIndex = 0, onChange }) {
  const { t } = useTranslation('components')

  if (!Array.isArray(layers) || layers.length <= 1) {
    return null
  }

  function cycle (delta) {
    const next = (activeIndex + delta + layers.length) % layers.length
    onChange?.(next)
  }

  function handleKeyDown (event) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault()
      cycle(1)
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault()
      cycle(-1)
    }
  }

  return (
    <TabList
      a11yTitle={t('SubjectViewer.GeoMapViewer.LayerControl.label')}
      aria-orientation='vertical'
      onKeyDown={handleKeyDown}
    >
      {layers.map((layer, idx) => {
        const isActive = idx === activeIndex
        return (
          <TabButton
            key={`${idx}-${layer?.label || layer?.type}`}
            label={layer?.label || `${t('SubjectViewer.GeoMapViewer.LayerControl.fallbackLabel')} ${idx + 1}`}
            active={isActive}
            aria-selected={isActive ? 'true' : 'false'}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange?.(idx)}
          />
        )
      })}
    </TabList>
  )
}

LayerControl.propTypes = {
  layers: arrayOf(shape({
    label: string,
    type: string
  })),
  activeIndex: number,
  onChange: func
}

export default LayerControl
