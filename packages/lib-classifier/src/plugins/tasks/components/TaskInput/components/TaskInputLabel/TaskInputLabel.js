import PropTypes from 'prop-types'
import { Box, Text } from 'grommet'
import styled from 'styled-components'
import { Markdownz } from '@zooniverse/react-components'
import { doesTheLabelHaveAnImage } from '../../helpers'

export const StyledTaskInputLabelWrapper = styled(Box)`
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

export default function TaskInputLabel ({ label, labelIcon, labelStatus }) {
  const howShouldTheLabelBeAligned = ((label && doesTheLabelHaveAnImage(label)) || (label && labelIcon))
    ? 'start'
    : 'center'

  return (
    <StyledTaskInputLabelWrapper
      direction='row'
      fill='horizontal'
      justify={howShouldTheLabelBeAligned}
    >
      {labelIcon &&
        labelIcon}
      <StyledLabel>
        <Markdownz>{label}</Markdownz>
      </StyledLabel>
      {labelStatus &&
        labelStatus}
    </StyledTaskInputLabelWrapper>
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
