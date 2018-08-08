import styled from 'styled-components'
import { Tab } from 'grommet'

const StyledTab = styled(Tab)`
  background-color: #EFF2F5
  border-bottom: 1px solid #E2E5E9
  border-left: 1px solid #E2E5E9
  border-top: 1px solid #E2E5E9
  color: #5C5C5C
  flex: 1
  padding: 1rem
  width: 0

  &:last-of-type {
    border-right: 1px solid #E2E5E9
  }

  &[aria-selected="true"] {
    background-color: white
    border-bottom-color: white
    color: #000
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
