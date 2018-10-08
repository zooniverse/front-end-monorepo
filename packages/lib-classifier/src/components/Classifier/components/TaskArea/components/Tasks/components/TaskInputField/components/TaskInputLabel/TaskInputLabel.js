import { Markdown } from 'grommet';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { doesTheLabelHaveAnImage } from '../../helpers';
import zooTheme from '@zooniverse/grommet-theme'
import { pxToRem } from '../../../../../../../helpers';

function howShouldTheLabelBeAligned(label, labelIcon) {
  if ((label && doesTheLabelHaveAnImage(label)) || (label && labelIcon)) {
    return 'left';
  }

  return 'center';
}

export const StyledTaskInputLabelWrapper = styled.div`
  align-items: baseline;
  display: flex;
  position: relative;
  width: 100%;
`;

export const StyledTaskInputLabel = styled(Markdown)`
  align-items: baseline;
  flex-grow: 1;
  flex-wrap: wrap;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }

  p {
    margin: 0;
  }

  img, svg {
    padding: ${pxToRem(5)};
    vertical-align: middle;
  }

  img:only-child, svg:only-child {
    background-color: ${zooTheme.global.colors.teal};
    margin-right: 1ch;
    max-width: ${pxToRem(60)};
  }

  .markdown {
    text-align: ${props => howShouldTheLabelBeAligned(props.label, props.labelIcon)};
  }
`;

export default function TaskInputLabel({ label, labelIcon, labelStatus }) {
  return (
    <StyledTaskInputLabelWrapper>
      {labelIcon &&
        labelIcon}
      <StyledTaskInputLabel label={label} labelIcon={labelIcon}>
        {label}
      </StyledTaskInputLabel>
      {labelStatus &&
        labelStatus}
    </StyledTaskInputLabelWrapper>
  );
}

TaskInputLabel.defaultProps = {
  label: '',
  labelIcon: null,
  labelStatus: null
};

TaskInputLabel.propTypes = {
  label: PropTypes.string,
  labelIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
  labelStatus: PropTypes.oneOfType([PropTypes.node, PropTypes.object])
};
