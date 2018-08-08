import styled from 'styled-components'
import { Tabs } from 'grommet'

const StyledTabs = styled(Tabs)`
  border-bottom: 0
  margin: 0

  ~ div[role="tabpanel"] {
    border-bottom: 1px solid #E2E5E9
    border-left: 1px solid #E2E5E9
    border-right: 1px solid #E2E5E9
    padding: 1rem
  }
`
export default StyledTabs
