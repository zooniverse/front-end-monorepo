import { Box } from 'grommet'
import { arrayOf, bool, func, shape, string } from 'prop-types'
import styled from 'styled-components'

import { useTranslation } from '@translations/i18n'

const Group = styled(Box).attrs({
  direction: 'column',
  gap: 'xxsmall'
})`
  background: ${props => (props.theme.dark ? props.theme.global.colors['dark-3'] : '#fff')};
  border: 1px solid ${props => props.theme.global.colors['light-5']};
  border-radius: 4px;
  font-size: 12px;
  padding: 6px 8px;
  min-width: 140px;
`

const Row = styled.label`
  align-items: center;
  cursor: pointer;
  display: flex;
  gap: 6px;

  input[type='checkbox'] {
    accent-color: ${props => props.theme.global.colors['accent-1']};
  }
`

function OverlayLayerControl ({ overlays = [], visibility = [], onToggle }) {
  const { t } = useTranslation('components')

  if (!Array.isArray(overlays) || overlays.length === 0) {
    return null
  }

  return (
    <Group
      role='group'
      aria-label={t('SubjectViewer.GeoMapViewer.OverlayLayerControl.label')}
    >
      {overlays.map((overlay, idx) => {
        const checked = visibility[idx] !== false
        const label = overlay?.label
          || `${t('SubjectViewer.GeoMapViewer.OverlayLayerControl.fallbackLabel')} ${idx + 1}`
        return (
          <Row key={`${idx}-${overlay?.label || overlay?.type}`} htmlFor={`overlay-${idx}`}>
            <input
              id={`overlay-${idx}`}
              type='checkbox'
              checked={checked}
              onChange={(event) => onToggle?.(idx, event.target.checked)}
            />
            <span>{label}</span>
          </Row>
        )
      })}
    </Group>
  )
}

OverlayLayerControl.propTypes = {
  overlays: arrayOf(shape({
    label: string,
    type: string
  })),
  visibility: arrayOf(bool),
  onToggle: func
}

export default OverlayLayerControl
