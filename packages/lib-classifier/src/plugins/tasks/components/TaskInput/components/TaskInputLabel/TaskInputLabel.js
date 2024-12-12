import PropTypes from 'prop-types'
import { Box, Text } from 'grommet'
import styled from 'styled-components'
import { Markdownz } from '@zooniverse/react-components'

function doesTheLabelHaveAnImage(label) {
  const imageRegex = /(?:!\[(.*?)\]\((.*?)\))/g
  return label && imageRegex.test(label)
}

const StyledText = styled(Text)`
  display: flex;
  align-content: center;
  align-items: center;
  padding: 5px 0 5px 15px;
  gap: 15px; // in case there's multiple elements in the Markdown
`

export default function TaskInputLabel({
  label = '',
  labelIcon = null,
  labelStatus = null
}) {
  const howShouldTheLabelBeAligned = ((label && doesTheLabelHaveAnImage(label)) || (label && labelIcon))
    ? 'start'
    : 'center'

  return (
    <Box
      direction='row'
      fill='horizontal'
      justify={howShouldTheLabelBeAligned}
      pad={{ right: '15px' }}
    >
      {labelIcon && labelIcon}
      <StyledText>
        <Markdownz inline>{label}</Markdownz>
      </StyledText>
      {labelStatus && labelStatus}
    </Box>
  )
}

TaskInputLabel.propTypes = {
  label: PropTypes.string,
  labelIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
  labelStatus: PropTypes.oneOfType([PropTypes.node, PropTypes.object])
}
