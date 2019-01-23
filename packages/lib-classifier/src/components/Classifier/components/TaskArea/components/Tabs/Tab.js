import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Box, Tab } from 'grommet'
import { SpacedText } from '@zooniverse/react-components'
import getTabColor from './getTabColor'

const StyledTab = styled(Tab)`
  background: ${props => props.active
    ? getTabColor('activeBackground')
    : getTabColor('dimmedBackground')
  };
  border-bottom: 1px solid ${props => props.active
    ? getTabColor('activeBackground')
    : getTabColor('border')
  };
  flex: 1;
  padding: 1rem;
  width: 0;

  &:last-of-type {
    border-left: 1px solid ${getTabColor('border')};
  }

  > div {
    /* border: 0;
    font-weight: bold;
    letter-spacing: 1px;
    padding: 0;
    margin: 0;
    text-align: center;
    text-transform: uppercase; */

    > span {
      color: ${props => props.active
        ? getTabColor('activeText')
        : getTabColor('dimmedText')
      };
    }
  }
`

export default function TaskTab(props) {
  const { onClick, title } = props
  return <StyledTab onClick={onClick} plain title={<SpacedText>{title}</SpacedText>} {...props} />
}

TaskTab.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string
}

TaskTab.defaultProps = {
  onClick: () => {},
  title: ''
}