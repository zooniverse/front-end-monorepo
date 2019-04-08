import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'
import { doesTheLabelHaveAnImage } from '../../helpers'
import zooTheme from '@zooniverse/grommet-theme'
import { Markdownz, pxToRem } from '@zooniverse/react-components'

export const StyledTaskInputLabelWrapper = styled(Box)`
  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }

  p {
    flex-grow: 1;
    font-size: ${pxToRem(14)};
    margin: 0;
    text-align: ${(props) => props.textAlign};
  }

  img, svg {
    padding: 0 ${pxToRem(5)};
    vertical-align: middle;
  }

  img:only-child, svg:only-child {
    background-color: ${zooTheme.global.colors.brand};
    margin-right: 1ch;
    max-width: ${pxToRem(60)};
  }
`

export default function TaskInputLabel ({ label, labelIcon, labelStatus }) {
  const howShouldTheLabelBeAligned = ((label && doesTheLabelHaveAnImage(label)) || (label && labelIcon))
    ? 'left'
    : 'center'

  return (
    <StyledTaskInputLabelWrapper align='center' direction='row' fill='horizontal' textAlign={howShouldTheLabelBeAligned}>
      {labelIcon &&
        labelIcon}
      <Markdownz>
        {label}
      </Markdownz>
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
