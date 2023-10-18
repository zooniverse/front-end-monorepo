import PropTypes from 'prop-types'
import { Box, Text } from 'grommet'
import styled from 'styled-components'
import { Markdownz } from '@zooniverse/react-components'
import { doesTheLabelHaveAnImage } from '../../helpers'

export const StyledTaskInputLabelWrapper = styled.span`
  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
`

export const StyledLabel = styled(Text)`
  padding-left: 15px;
  padding-right: 15px;

  img, svg {
    padding: 10px;
    vertical-align: middle;
  }
`

const StyledSpan = styled.span`
  display: block;
  margin: 1em 0;
`

const inlineComponents = {
  p: StyledSpan
}

export default function TaskInputLabel ({ label, labelIcon, labelStatus }) {
  const howShouldTheLabelBeAligned = ((label && doesTheLabelHaveAnImage(label)) || (label && labelIcon))
    ? 'start'
    : 'center'

  return (
    <Box
      as={StyledTaskInputLabelWrapper}
      direction='row'
      fill='horizontal'
      justify={howShouldTheLabelBeAligned}
    >
      {labelIcon &&
        labelIcon}
      <StyledLabel>
        <Markdownz components={inlineComponents}>{label}</Markdownz>
      </StyledLabel>
      {labelStatus &&
        labelStatus}
    </Box>
  )
}

TaskInputLabel.defaultProps = {
  label: '',
  labelIcon: null,
  labelStatus: null
}

TaskInputLabel.propTypes = {
  label: PropTypes.string,
  labelIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
  labelStatus: PropTypes.oneOfType([PropTypes.node, PropTypes.object])
}
