import styled from 'styled-components'
import { Tabs } from 'grommet'

import { borderColor } from './colors'

const StyledTabs = styled(Tabs)`
  border-bottom: 0
  margin: 0

  ~ div[role="tabpanel"] {
    border: 1px solid ${borderColor}
    border-top: 0
    padding: 1rem
  }
`
export default StyledTabs
