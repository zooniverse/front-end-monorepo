import { Markdownz } from '@zooniverse/react-components'
import { Box, RangeInput, Text } from 'grommet'
import { Location } from 'grommet-icons'
import { observer } from 'mobx-react'
import { arrayOf, bool, func, number, shape, string } from 'prop-types'
import { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { transform } from 'ol/proj'

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

const RangeContainer = styled(Box)`
  border-top: 1px solid ${props => props.theme.global.colors['light-3']};
  margin-top: 8px;
  padding-top: 8px;
`

function GeoDrawingTask({
  disabled = false,
  task
}) {
  const { setActiveTool } = task
  const [, setGeometryUpdate] = useState({})

  useEffect(() => {
    if (!task.activeOlFeature) return undefined

    const feature = task.activeOlFeature

    function handleFeatureChange() {
      setGeometryUpdate({})
    }

    feature.on('change', handleFeatureChange)
    return () => {
      feature.un('change', handleFeatureChange)
    }
  }, [task.activeOlFeature])

  function onChange(index, event) {
    if (event.target.checked) {
      setActiveTool(index)
    }
  }

  return (
    <Box>
      <StyledText as='legend' size='small'>
        <Markdownz>{task.instruction}</Markdownz>
      </StyledText>
      
      {task.activeFeature && task.activeOlFeature && (
        <ToolCard pad='small'>
          <Text size='small' weight='bold'>
            Selected feature:
          </Text>
          <Box pad={{ top: 'xsmall' }} gap='xsmall'>
            {(() => {
              const coords = transform(
                task.activeOlFeature?.getGeometry?.()?.getCoordinates?.() ?? [],
                'EPSG:3857',
                'EPSG:4326'
              )
              const lon = coords[0] ? (Math.round(coords[0] * 100) / 100).toFixed(2) : 'N/A'
              const lat = coords[1] ? (Math.round(coords[1] * 100) / 100).toFixed(2) : 'N/A'
              return (
                <>
                  <Text size='xsmall'>
                    Latitude: {lat}°
                  </Text>
                  <Text size='xsmall'>
                    Longitude: {lon}°
                  </Text>
                </>
              )
            })()}
            <Text size='xsmall'>
              Uncertainty radius: {task.activeOlFeature?.get?.('uncertainty_radius') ?? task.activeFeature?.properties?.uncertainty_radius ?? 0}m
            </Text>
          </Box>
        </ToolCard>
      )}

      {task.tools.map((tool, index) => {
        const checked = task.activeToolIndex === index
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
              {tool.uncertainty_circle && (
                <RangeContainer>
                  <Text size='small'>
                    Adjust the uncertainty circle radius:
                  </Text>
                  <RangeInput
                    disabled={disabled || !checked || !task.activeFeature || !task.activeOlFeature}
                    value={task.activeFeature?.properties?.uncertainty_radius ?? task.activeOlFeature?.get?.('uncertainty_radius') ?? 0}
                    min={0}
                    max={100000}
                    step={1}
                    onChange={(event) => task.setActiveFeatureUncertaintyRadius?.(Math.round(Number(event.target.value)))}
                  />
                </RangeContainer>
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
