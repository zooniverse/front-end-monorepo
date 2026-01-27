import { Markdownz } from '@zooniverse/react-components'
import { Box, RangeInput, Text } from 'grommet'
import { Location } from 'grommet-icons'
import { observer } from 'mobx-react'
import { arrayOf, bool, func, number, shape, string } from 'prop-types'
import styled, { css } from 'styled-components'

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
                    disabled={disabled || !checked}
                    min={0}
                    max={100}
                    step={1}
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
