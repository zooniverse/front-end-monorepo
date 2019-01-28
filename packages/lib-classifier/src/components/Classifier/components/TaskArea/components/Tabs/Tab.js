import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Tab } from 'grommet'
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
  color: ${props => props.active
    ? getTabColor('activeText')
    : getTabColor('dimmedText')
  };
  flex: 1;
  height: 100%;
  max-height: 55px;
  padding: 1rem;
  text-align: center;

  &:last-of-type {
    border-left: 1px solid ${getTabColor('border')};
  }
`

export default function TaskTab(props) {
  const { title } = props
  return <StyledTab plain title={title} {...props} />
}

TaskTab.propTypes = {
  title: PropTypes.string.isRequired
}