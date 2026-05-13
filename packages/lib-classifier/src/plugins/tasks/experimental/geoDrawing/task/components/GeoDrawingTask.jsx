import { Markdownz } from '@zooniverse/react-components'
import { Box, Text } from 'grommet'
import { Location } from 'grommet-icons'
import { observer } from 'mobx-react'
import { transform } from 'ol/proj'
import { arrayOf, bool, func, number, shape, string } from 'prop-types'
import { useState, useEffect, useMemo } from 'react'
import styled, { css } from 'styled-components'

import UNIT_CONVERSIONS from '@helpers/unitConversions'

import FeatureCard from './components/FeatureCard'
import RadiusSlider from './components/RadiusSlider'

const StyledText = styled(Text)`
  margin: 0;
  padding: 0;
  width: 100%;

  > *:first-child {
    margin-top: 0;
  }
`

const ToolLabel = styled.label`
  display: block;
  margin: 8px 0;
`

const ToolCard = styled(Box)`
  border: 2px solid ${props => props.theme.global.colors['light-4']};
  border-radius: 4px;
  box-shadow: 1px 1px 2px 0 rgba(0,0,0,0.5);
  background: ${props => props.theme.dark ? 'transparent' : props.theme.global.colors['light-1']};

  ${props => props.checked && css`
    border-color: ${props.theme.global.colors.brand};
    background: ${props.theme.dark ? props.theme.global.colors['neutral-1'] : props.theme.global.colors['accent-1']};
  `}
`

const HiddenInput = styled.input`
  position: absolute;
  opacity: 0.01;
`

const ToolHeader = styled(Box)`
  align-items: center;
  display: flex;
  gap: 8px;
  flex-direction: row;
`

const ToolIcon = styled(Location)`
  flex-shrink: 0;
`

function GeoDrawingTask({
  disabled = false,
  task
}) {
  const unit = task.unit || 'meters'
  const { setActiveTool } = task
  const [, setGeometryUpdate] = useState({})

  // Calculate dynamic max radius based on map extent
  // Memoized to avoid recalculation when other task properties change, like task.activeOlFeature
  const maxRadius = useMemo(function calculateMaxRadius() {
    if (!task.mapExtentMeters) return 100000 // fallback before map initializes
    const { widthMeters, heightMeters } = task.mapExtentMeters
    const minDimension = Math.min(widthMeters, heightMeters)
    return Math.round(minDimension / 2) // half of the lesser dimension
  }, [task.mapExtentMeters])

  useEffect(function subscribeToFeatureChanges() {
    if (!task.activeOlFeature) return undefined

    const feature = task.activeOlFeature

    function handleFeatureChange() {
      setGeometryUpdate({})
    }

    feature.on('change', handleFeatureChange)
    return function unsubscribeFromFeatureChanges() {
      feature.un('change', handleFeatureChange)
    }
  }, [task.activeOlFeature])

  function onChange(index, event) {
    if (event.target.checked) {
      setActiveTool(index)
    }
  }

  const activeCoords = task.activeOlFeature
    ? transform(
        task.activeOlFeature?.getGeometry?.()?.getCoordinates?.() ?? [],
        'EPSG:3857',
        'EPSG:4326'
      )
    : []
  const featureLon = activeCoords[0] ? (Math.round(activeCoords[0] * 100) / 100).toFixed(2) : 'N/A'
  const featureLat = activeCoords[1] ? (Math.round(activeCoords[1] * 100) / 100).toFixed(2) : 'N/A'
  const featureRadius = task.activeOlFeature?.get?.('uncertainty_radius') ?? task.activeFeature?.properties?.uncertainty_radius ?? null

  return (
    <Box>
      <StyledText as='legend' size='small'>
        <Markdownz>{task.instruction}</Markdownz>
      </StyledText>
      
      {task.activeFeature && task.activeOlFeature && (
        <FeatureCard
          lat={featureLat}
          lon={featureLon}
          radius={featureRadius}
          unit={unit}
        />
      )}

      {task.tools.map((tool, index) => {
        const checked = task.activeToolIndex === index
        const currentRadius = task.activeOlFeature?.get?.('uncertainty_radius') ?? task.activeFeature?.properties?.uncertainty_radius
        const showUncertaintySlider = task.activeFeature && task.activeOlFeature && tool.uncertainty_circle && currentRadius !== null
        
        return (
          <ToolLabel key={`${task.taskKey}_${index}`}>
            <HiddenInput
              aria-label={task.strings.get(`tools.${index}.label`)}
              checked={checked}
              disabled={disabled}
              name='geo-drawing-tool'
              onChange={(event) => onChange(index, event)}
              required={task.required}
              type='radio'
            />
            <ToolCard pad='small' checked={checked}>
              <ToolHeader>
                <ToolIcon color={tool.color} />
                <Text size='small'>
                  {task.strings.get(`tools.${index}.label`)}
                </Text>
              </ToolHeader>
              {showUncertaintySlider && (
                <RadiusSlider
                  disabled={!checked || disabled}
                  maxRadius={maxRadius}
                  onChange={function handleRadiusChange(value) {
                    task.setActiveFeatureUncertaintyRadius?.(value)
                  }}
                  unitLabel={UNIT_CONVERSIONS[unit]?.label ?? 'm'}
                  value={currentRadius ?? 0}
                />
              )}
            </ToolCard>
          </ToolLabel>
        )
      })}
    </Box>
  )
}

GeoDrawingTask.propTypes = {
  disabled: bool,
  task: shape({
    activeToolIndex: number,
    help: string,
    instruction: string,
    required: bool,
    setActiveTool: func,
    taskKey: string,
    tools: arrayOf(shape({
      color: string,
      label: string,
      uncertainty_circle: bool
    }))
  }).isRequired
}

export default observer(GeoDrawingTask)
