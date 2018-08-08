import styled from 'styled-components'
import { Tab } from 'grommet'

import { borderColor } from './colors'

const StyledTab = styled(Tab)`
  background-color: ${props => props.active ? 'white' : '#EFF2F5'}
  border-bottom: 1px solid ${props => props.active ? 'white' : borderColor}
  border-left: 1px solid ${borderColor}
  border-top: 1px solid ${borderColor}
  color: ${props => props.active ? 'black' : '#5C5C5C'}
  flex: 1
  padding: 1rem
  width: 0

  &:last-of-type {
    border-right: 1px solid ${borderColor}
  }

  > div {
    border: 0
    font-weight: bold
    letter-spacing: 1px
    padding: 0
    margin: 0
    text-align: center
    text-transform: uppercase
  }
`

export default StyledTab
