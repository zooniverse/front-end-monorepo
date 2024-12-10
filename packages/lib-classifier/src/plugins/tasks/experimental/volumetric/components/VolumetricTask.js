import { Box, Text } from "grommet"
import { Blank } from "grommet-icons"
import InputStatus from "../../../components/InputStatus"
import { Markdownz } from "@zooniverse/react-components"
import { observer } from "mobx-react"
import PropTypes from "prop-types"
import styled from "styled-components"
import TaskInput from "../../../components/TaskInput"

// Note: ANNOTATION_COUNT will be refactored in next PR to use MobX Annotations
const ANNOTATION_COUNT = 3
const SVG_ARROW = "48 50, 48 15, 40 15, 50 0, 60 15, 52 15, 52 50"

const StyledInstructionText = styled(Text)`
  margin: 0;
  padding: 0;
  width: 100%;

  > *:first-child {
    margin-top: 0;
  }
`

const StyledToolIcon = styled.div`
  background-color: #2d2d2d;
  display: flex;
  align-items: center;
  padding-left: 15px;

  &::after {
    content: " ";
    margin-right: 1ch;
    white-space: pre;
  }

  > svg {
    height: 1.5em;
    vertical-align: bottom;
    width: 1.5em;
  }
`

function VolumetricTask({ disabled = false, task }) {
  return (
    <Box>
      <StyledInstructionText as="legend" size="small">
        <Markdownz>{task.instruction}</Markdownz>
      </StyledInstructionText>

      {/*
       NOTE: Because there is only one active tool in a Volumetric project,
       we do checked=true & index=0 to hardcode this tool as active
      */}

      <TaskInput
        checked={true}
        disabled={disabled}
        index={0}
        label={"3D Viewer"}
        labelIcon={
          <StyledToolIcon>
            <Blank viewBox="0 0 100 100">
              <polygon
                points={SVG_ARROW}
                fill="blue"
                transform="rotate(0 50 50)"
              />
              <polygon
                points={SVG_ARROW}
                fill="green"
                transform="rotate(135 50 50)"
              />
              <polygon
                points={SVG_ARROW}
                fill="red"
                transform="rotate(225 50 50)"
              />
            </Blank>
          </StyledToolIcon>
        }
        labelStatus={<InputStatus count={ANNOTATION_COUNT} />}
        name="volumetric-tool"
        type="radio"
      />
    </Box>
  )
}

VolumetricTask.propTypes = {
  task: PropTypes.shape({
    instruction: PropTypes.string,
  }),
}

export default observer(VolumetricTask)
