import { Box, Button, Text } from 'grommet'
import { observer } from 'mobx-react'
import { getSnapshot } from 'mobx-state-tree'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { useTranslation } from '@translations/i18n'
import { Markdownz } from '@zooniverse/react-components'

import getOffset from './helpers/getOffset'
import selectableArea from './helpers/selectableArea'

const StyledText = styled(Text)`
  margin: 0;
  padding: 0;
  width: 100%;

  > *:first-child {
    margin-top: 0;
  }
`

const StyledLabelColor = styled.span`
  align-self: center;
  background-color: ${props => props.color};
  border-radius: 3px;
  height: 1.8em;
  margin: 0 .8em;
  width: 40px;
`

const StyledButton = styled(Button)`
  ${props => props.theme.dark ?
    css`
      background: ${props.theme.global.colors['dark-4']};
      border: 2px solid ${props.theme.global.colors['light-1']};
      color: white;
    ` :
    css`
      background: ${props.theme.global.colors['light-1']};
      border: none;
    `
  }
  border-radius: 4px;
  margin-bottom: .8em;
  margin-top: .8em;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);

  &:hover {
    ${props => props.theme.dark ?
      css`
        background: ${props.theme.global.colors['neutral-1']};
        border: 2px solid ${props.theme.global.colors['light-1']};
      ` :
      css`
        background: linear-gradient(180deg, ${props.theme.global.colors['light-2']} 0%, ${props.theme.global.colors['accent-1']} 100%);
        border: none;
      `
    } 
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
  }

  &:active {
    background: ${props => props.theme.global.colors['brand']};
    ${props => props.theme.dark ? 
      css`border: 2px solid ${props.theme.global.colors['light-1']};` :
      css`border: 1px solid ${props.theme.global.colors['light-5']};`
    }
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
    color: white;
  }

  &:focus:not(:focus-visible) {
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
  }
`

function StyledButtonLabel ({ color, count = 0, label }) {
  const { t } = useTranslation('plugins')
  const status = t('HighlighterTask.status', { count })

  return (
    <Box
      align='center'
      as='span'
      direction='row'
    >
      <StyledLabelColor color={color} />
      <Box
        fill='horizontal'
        direction='row'
        justify='between'
        margin={{ left: 'small' }}
      >
        <Text
          size='16px'
          textAlign='start'
        >
          {label}
        </Text>
        <Text
          color={{
            dark: (count ? 'inherit' : 'dark-5'),
            light: (count ? 'inherit' : 'light-4')
          }}
        >
          {status}
        </Text>
      </Box>
    </Box>
  )
}

export function HighlighterTask ({
  annotation,
  disabled = false,
  task
}) {
  const { t } = useTranslation('plugins')

  function createLabelAnnotation(selection, labelIndex) {
    // currently we only deal with one selection at a time
    const range = selection.getRangeAt(0)
    const offset = getOffset(selection)
    const start = offset + range.startOffset
    const end = offset + range.endOffset - 1
    const labelInformation = getSnapshot(task.highlighterLabels[labelIndex])
    const selectable = selectableArea(selection, range, offset, start, end)
    
    if (selectable) {
      const newValue = Array.from(annotation.value)
      newValue.push({
        labelInformation,
        start,
        end,
        text: range.toString()
      })
      annotation.update(newValue)
    }

    selection.collapseToEnd()
  }

  function handleClick (event, index) {
    const selection = document.getSelection()
    if (selection.rangeCount && selection.getRangeAt(0).toString().length) {
      createLabelAnnotation(selection, index)
    }
    return null
  }

  return (
    <Box
      direction='column'
    >
      <StyledText as='legend' size='small'>
        <Markdownz>
          {task.instruction}
        </Markdownz>
      </StyledText>
      {task.highlighterLabels ? 
        task.highlighterLabels.map((label, index) => {
          const count = annotation.value.filter(value => value.labelInformation.label === label.label).length
          
          return (
            <StyledButton
              key={`${task.taskKey}_${index}`}
              disabled={disabled}
              label={
                <StyledButtonLabel
                  color={label.color}
                  count={count}
                  label={task.strings.get(`highlighterLabels.${index}.label`)}
                />}
              name='highlighter-label'
              onClick={(event) => handleClick(event, index)}
              onTouchEnd={(event) => {
                event.preventDefault()
                handleClick(event, index)
              }}
            />
          )
        }) : <span>{t('HighlighterTask.noLabels')}</span>
      }
    </Box>
  )
}

HighlighterTask.propTypes = {
  annotation: PropTypes.shape({
    update: PropTypes.func,
    value: PropTypes.array,
  }).isRequired,
  disabled: PropTypes.bool,
  task: PropTypes.shape({
    help: PropTypes.string,
    instruction: PropTypes.string,
    required: PropTypes.bool,
    taskKey: PropTypes.string,
    type: PropTypes.string
  }).isRequired,
}

export default observer(HighlighterTask)
